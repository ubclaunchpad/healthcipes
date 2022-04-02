from datetime import datetime
from fastapi import APIRouter
from typing import List, Optional, Union, Dict
from pydantic import BaseModel
import logging
import requests
from app.indexer.tools import init_conn
from app.indexer.recipes import soft_delete_recipe_by_id, delete_recipe_by_id, get_createdrecipe_by_userid, get_recipe_by_keyword, get_all_recipes, post_recipe, post_steps, post_scrape_steps, post_ingredients, get_recipe_by_id, filter_recipes, get_featured_recipes, recipe_from_video_url
from app.functions.scraper import scraper
from app.functions.ingredient import parse_ingredients_from_text
from functools import reduce

defaultRecipe = {
    "recipe_id": "",
    "name": "testRecipeId",
    "recipe_description": "A delicious vegan tofu scramble to beat the Mondays",
    "header_image": "",
    # NOTE: need to create default user before default recipe can be made
    "user_id": "testID",
    "creator_username": "VeganDaddy",
    "protein": 1,
    "carbs": 2,
    "fat": 2,
    "fiber": 2,
    "calories": 3,
    "servings": 4,
    "vegetarian": True,
    "vegan": False,
    "pescatarian": False,
    "gluten_free": False,
    "dairy_free": False,
    "keto": False,
    "paleo": False,
    "cooking_time": 10
}

class RecipeStep(BaseModel):
    step_id: int
    description: str
    time: Optional[int] = None
    header_image: str

class RecipeIngredient(BaseModel):
    ingredient_id: str
    ingredient_name: str
    category: str
    step_id: int

class RecipeDetails(BaseModel):
    recipe_id: int
    name: str
    recipe_description: str
    created_time: Optional[datetime] = None
    user_id: str
    creator_username: str
    header_image: str
    protein: int
    carbs: int
    fat: int
    fiber: int
    calories: int
    servings: int
    vegetarian: bool
    vegan: bool
    pescatarian: bool
    gluten_free: bool
    dairy_free: bool
    keto: bool
    paleo: bool
    cooking_time: Optional[int] = None
    steps: List[RecipeStep]
    ingredients: List[RecipeIngredient]

class RecipeDetailsOut(BaseModel):
    data: Union[RecipeDetails, str]
    status_code: int

router = APIRouter(
    prefix="/recipe",
    tags=["recipe"],
    responses={404: {"description": "Not found"}},
)

# Seems natural to merge the below with the / path and then conditional 
# statement on the keyword being empty or not?
async def recipe_by_keyword(keyword: str = ""):
    try:
        _, cursor = init_conn()
        res = get_recipe_by_keyword(cursor, keyword)
        return res, 200
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400


async def read_all_recipes(startIndex, limit):
    try:
        _, cursor = init_conn()
        res = get_all_recipes(cursor, startIndex, limit)
        return res, 200
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400

#TODO
async def read_featured_recipes():
    try:
        _, cursor = init_conn()
        res = get_featured_recipes(cursor)
        return res, 200
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400

######### ENDPOINTS START #########

@router.get("/")
async def read_recipe(keyword: str = "", start: int = 0, limit: int = 5):
    if keyword:
        return await recipe_by_keyword(keyword)
    else:
        return await read_all_recipes(start, limit)

@router.get("/featured")
async def read_featured_recipe():
    return await read_featured_recipes()


@router.get("/user")
async def read_createdrecipe_by_userid(user_id: str=""):
    '''get recipe info, macros, steps, and ingredients'''
    try:
        _, cursor = init_conn()
        res = get_createdrecipe_by_userid(cursor, user_id)
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


# TODO: merge filter route with the one above if possible sql statements with default values?
@router.get("/filter")
async def filter_recipe(vegetarian: bool = False, vegan: bool = False, pescatarian: bool = False, gluten_free: bool = False, dairy_free: bool = False, keto: bool = False, paleo: bool = False):
    filters = {
        "vegetarian": vegetarian,
        "vegan": vegan,
        "pescatarian": pescatarian,
        "gluten_free": gluten_free,
        "dairy_free": dairy_free,
        "keto": keto,
        "paleo": paleo
    }
    # NOTE: currently only doing vegetarian and vegan 
    # unused_filters = [pescatarian,gluten_free, dairy_free, keto, paleo]
    if not reduce(lambda x, y: x or y, filters.values()):
        return await read_all_recipes()
    else: 
        try:
            _, cursor = init_conn()
            res = filter_recipes(cursor, filters) 
            return res, 200
        except Exception as e:
            logging.error(e)
            return "Error with {}".format(e), 400


@router.post("/")
def create_recipe(url: str = "", recipe: dict = defaultRecipe, steps: list = [], ingredients: list = []):
    try:
        conn, cursor = init_conn()
        if (url != ""):
            recipe, steps, ingredients = scraper(url)
        res = post_recipe(conn, cursor, recipe)
        if (len(steps) > 0):
            if (url != ""):
                _ = post_scrape_steps(conn, cursor, steps, res[0])
            else:
                _ = post_steps(conn, cursor, steps, res[0])
        if (len(ingredients) > 0):
            if (url != ""):
                _ = post_ingredients(conn, cursor, ingredients, res[0])
        return res, 200
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400

@router.post("/video")
def create_recipe_video(body: Dict):
    # body: {url: ''}
    try:
        conn, cursor = init_conn()
        if (body['url'] != ""):
            res = recipe_from_video_url(body['url'])
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
def parse_ingredients(text: str = ""):
    try:
        res = parse_ingredients_from_text(text)
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

@router.post("/scrape-url")
async def scrape_recipe_url(url: str = ""):
    if url == "":
        return "Error: no url given", 400

    try:
        recipe, steps, ingredients = scraper(url)

        response = {
            "recipe": recipe,
            "steps": steps,
            "ingredients": ingredients
        }

        return {
            "data": response,
            "status_code": 200
        }

    except Exception as e:
        return "Error with {}".format(e), 400

@router.get("/scrape")
async def auto_scrape_recipe():
    try:
        url = "https://www.themealdb.com/api/json/v1/1/random.php"
        payload={}
        headers = {}
        response = requests.request("GET", url, headers=headers, data=payload)
        # print(response.json()['meals'])
        recipeURL = response.json()['meals'][0]['strSource']
        print(recipeURL)
        if (recipeURL):
            res = create_recipe(url=recipeURL)
            return res, 200
        else:
            return "Recipe isn't compatible today :(", 400
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400


@router.get("/{recipe_id}", response_model=RecipeDetailsOut)
async def read_recipe_by_id(recipe_id: int):
    '''get recipe info, macros, steps, and ingredients'''
    try:
        conn, cursor = init_conn()
        res = get_recipe_by_id(conn, cursor, recipe_id)
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

@router.delete("/{recipe_id}")
async def remove_recipe_by_id(recipe_id: int):
    try:
        conn, cursor = init_conn()
        res = delete_recipe_by_id(conn, cursor, recipe_id)
        return res, 200
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400

@router.put("/")
def put_recipe(recipe: dict = defaultRecipe, steps: list = []):
    try:
        conn, cursor = init_conn()
        _ = soft_delete_recipe_by_id(conn, cursor, recipe['recipe_id'])
        res = post_recipe(conn, cursor, recipe)
        if (len(steps) > 0):
            _ = post_steps(conn, cursor, steps, res[0])
        return res, 200
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400

def _is_valid_recipe_body_video(recipe):
    if type(recipe) != "dict":
        return False

    if 'name' not in recipe:
        return False

    if 'recipe_description' not in recipe:
        return False

    if 'user_id' not in recipe:
        return False

    if 'creator_username' not in recipe:
        return False

    return True
