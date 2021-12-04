from fastapi import APIRouter
from typing import List, Optional, Union
from pydantic import BaseModel
import logging
import requests
from app.indexer.tools import init_conn
from app.indexer.recipes import get_createdrecipe_by_userid, get_recipe_by_keyword, get_all_recipes, post_recipe, post_steps, post_ingredients, get_recipe_by_id, filter_recipes, get_featured_recipes
from app.scraper.scraper import scraper
from functools import reduce

defaultRecipe = {
    "recipe_id": "",
    "name": "testRecipeId",
    "recipe_description": "A delicious vegan tofu scramble to beat the Mondays",
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
    "cooking_time": 10
}

class RecipeStep(BaseModel):
    step_id: int
    description: str
    time: Optional[int] = None

class RecipeIngredient(BaseModel):
    ingredient_id: str
    ingredient_name: str
    category: str

class RecipeDetails(BaseModel):
    recipe_id: int
    name: str
    recipe_description: str
    user_id: str
    creator_username: str
    protein: int
    carbs: int
    fat: int
    fiber: int
    calories: int
    servings: int
    vegetarian: bool
    vegan: bool
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


async def read_all_recipes():
    try:
        _, cursor = init_conn()
        res = get_all_recipes(cursor)
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
async def read_recipe(keyword: str = ""):
    if keyword:
        return await recipe_by_keyword(keyword)
    else:
        return await read_all_recipes()

@router.get("/featured")
async def read_featured_recipe():
    return await read_featured_recipes()


# TODO: merge filter route with the one above if possible sql statements with default values?
@router.get("/filter")
async def filter_recipe(vegetarian: bool = False, vegan: bool = False, pescatarian: bool = False, gluten_free: bool = False, dairy_free: bool = False, keto: bool = False, paleo: bool = False):
    filters = {"vegetarian": vegetarian, "vegan": vegan}
    # NOTE: currently only doing vegetarian and vegan 
    # unused_filters = [pescatarian,gluten_free, dairy_free, dairy_free, paleo]
    if not reduce(lambda x, y: x or y, filters.values()):
        return await read_all_recipes()
    else: 
        try:
            _, cursor = init_conn()
            res = filter_recipes(cursor, **filters) 
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
        _ = post_steps(conn, cursor, steps[0].split("\n"), res[0])
        _ = post_ingredients(conn, cursor, ingredients[0], res[0])
        return res, 200
    except Exception as e:
        logging.error(e)
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

@router.get("/{user_id}", response_model=RecipeDetailsOut)
async def read_createdrecipe_by_userid(user_id: int):
    '''get recipe info, macros, steps, and ingredients'''
    try:
        conn, cursor = init_conn()
        res = get_createdrecipe_by_userid(conn, cursor, user_id)
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
