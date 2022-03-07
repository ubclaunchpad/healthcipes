from fastapi import APIRouter
import logging
import uuid
import requests
from app.indexer.tools import init_conn
from app.indexer.pantries import post_pantry, get_pantry, get_pantry_by_user, get_ingredients, delete_pantry, get_ingredients_by_keyword, post_ingredient, post_ingredient_array

defaultPantry = {
    "user_id": "abc",
    "ingredient_id": "abc",
}

defaultIngredient = {
    "ingredient_name": "abc",
    "category": "",
    "image": "",
    "protein": 0,
    "carbs": 0,
    "fat": 0,
    "fiber": 0,
    "calories": 0,
}

router = APIRouter(
    prefix="/pantry",
    tags=["pantry"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def get_pantry_by_id(pantry_id: str, user_id: str):
    # user_id takes presidence over pantry_id if both are sent
    try:
        if user_id:
            _, cursor = init_conn()
            res = get_pantry_by_user(cursor, user_id)
        else:
            _, cursor = init_conn()
            res = get_pantry(cursor, pantry_id)
        return {
            "data": res,
            "status_code": 200
        }

    except Exception as e:
        logging.error(e)
        return {
            "data": "Error with {}".format(e),
            "status_code": 400
        }

@router.post("/")
async def add_to_pantry(pantry: dict = defaultPantry):
    try:
        conn, cursor = init_conn()
        res = post_pantry(conn, cursor, pantry)
        return {
            "data": res,
            "status_code": 200
        }

    except Exception as e:
        logging.error(e)
        return {
            "data": "Error with {}".format(e),
            "status_code": 400
        }

@router.delete("/")
async def delete_from_pantry(pantry: dict = defaultPantry):
    try:
        conn, cursor = init_conn()
        res = delete_pantry(conn, cursor, pantry)
        return {
            "data": res,
            "status_code": 200
        }

    except Exception as e:
        logging.error(e)
        return {
            "data": "Error with {}".format(e),
            "status_code": 400
        }

@router.get("/ingredients")
def get_all_ingredients(keyword: str = None):
    try:
        if keyword: 
            conn, cursor = init_conn()
            res = get_ingredients_by_keyword(cursor, keyword)
            cursor.nextset()
            if len(res) == 0:
                # make API call to get ingredients
                url = "https://api.edamam.com/api/food-database/v2/parser?app_id=b34748ae&app_key=d85606705b61f0edc18c96502bddb0b6&ingr=" + keyword + "&nutrition-type=logging"

                response = requests.request("GET", url)

                res = []
                result = response.json()
                resultObject = result["parsed"]
                hintObject = result["hints"]
                if (len(resultObject) == 0):
                    for i in range(0, len(result["hints"])):
                        parsedResult = [
                            hintObject[i]["food"].get("foodId", uuid.uuid4()),
                            hintObject[i]["food"].get("label", ""),
                            "Other",
                            hintObject[i]["food"].get("image", ""),
                            hintObject[i]["food"]["nutrients"].get("PROCNT", 0),
                            hintObject[i]["food"]["nutrients"].get("CHOCDF", 0),
                            hintObject[i]["food"]["nutrients"].get("FAT", 0),
                            hintObject[i]["food"]["nutrients"].get("FIBTG", 0),
                            hintObject[i]["food"]["nutrients"].get("ENERC_KCAL", 0),
                        ]
                        _ = post_ingredient_array(conn, cursor, parsedResult)
                        cursor.nextset()
                        res.append(parsedResult)
                else:
                    parsedResult = [
                        resultObject[0]["food"].get("foodId", uuid.uuid4()),
                        resultObject[0]["food"].get("label", ""),
                        "Other",
                        resultObject[0]["food"].get("image", ""),
                        resultObject[0]["food"]["nutrients"].get("PROCNT", 0),
                        resultObject[0]["food"]["nutrients"].get("CHOCDF", 0),
                        resultObject[0]["food"]["nutrients"].get("FAT", 0),
                        resultObject[0]["food"]["nutrients"].get("FIBTG", 0),
                        resultObject[0]["food"]["nutrients"].get("ENERC_KCAL", 0),
                    ]
                    _ = post_ingredient_array(conn, cursor, parsedResult)
                    res.append(parsedResult)
        else:
            _, cursor = init_conn()
            res = get_ingredients(cursor)
        return {
            "data": res,
            "status_code": 200
        }

    except Exception as e:
        logging.error(e)
        return {
            "data": "Error with {}".format(e),
            "status_code": 400
        }

@router.post("/ingredients")
async def post_new_ingredients(ingredient: dict = defaultIngredient):
    try:
        conn, cursor = init_conn()
        res = post_ingredient(conn, cursor, ingredient)
        return {
            "data": res,
            "status_code": 200
        }

    except Exception as e:
        logging.error(e)
        return {
            "data": "Error with {}".format(e),
            "status_code": 400
        }
