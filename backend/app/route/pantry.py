from fastapi import APIRouter
import logging
from app.indexer.tools import init_conn
from app.indexer.pantries import post_pantry, get_pantry, get_pantry_by_user, get_ingredients, delete_pantry

defaultPantry = {
    "user_id": "abc",
    "ingredient_id": 1,
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

@router.get("/ingredient")
async def get_all_ingredients(keyword_search: str):
    # user_id takes presidence over pantry_id if both are sent
    try:
        if keyword_search: 
            _, cursor = init_conn()
            res = get_ingredients_by_keyword(cursor)
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
