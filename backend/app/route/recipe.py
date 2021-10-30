from fastapi import APIRouter
import logging
from app.indexer.tools import init_conn
from app.indexer.recipes import get_recipe_by_keyword, get_all_recipes, post_recipe, filter_recipes
from datetime import datetime
from functools import reduce

defaultRecipe = {
    # TODO: id is required due to the nature of the query, should just auto increment if given null id
    "recipe_id": 0,
    "name": "testRecipeId",
    # NOTE: need to create default user before default recipe can be made
    "user_id": "testID",
    "protein": 1,
    "carbs": 2,
    "calories": 3,
    "servings": 4,
    "vegetarian": True,
    "vegan": True,
    "cooking_time": 10
}

router = APIRouter(
    prefix="/recipe",
    tags=["recipe"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def read_recipe(keyword: str = ""):
    if keyword:
        return await recipe_by_keyword(keyword)
    else:
        return await read_all_recipes()


# TODO: merge filter route with the one above if possible sql statements with default values?
@router.get("/filter")
async def filter_recipe(vegetarian: bool = False, vegan: bool = False, pescatarian: bool = False, gluten_free: bool = False, dairy_free: bool = False, keto: bool = False, paleo: bool = False):
    filters = [vegetarian, vegan]
    # NOTE: currently only doing vegetarian and vegan 
    # unused_filters = [pescatarian,gluten_free, dairy_free, dairy_free, paleo]
    if reduce(lambda x, y: x or y, filters):
        return await read_all_recipes()
    else: 
        try:
            filters = filter(lambda x: x, filters)
            _, cursor = init_conn()
            res = filter_recipes(curosr, filters**) 
        except Exception as e:
            logging.error(e)
            return "Error with {}".format(e), 400


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


@router.post("/")
async def create_recipe(recipe: dict = defaultRecipe):
    try:
        conn, cursor = init_conn()
        res = post_recipe(conn, cursor, recipe)
        return res, 200
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400
