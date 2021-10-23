from fastapi import APIRouter
import logging
from app.indexer.tools import init_conn
from app.indexer.recipes import get_recipe_by_keyword, get_all_recipes
from datetime import datetime

defaultRecipe = {
    "name": "testID",
    "created_time": datetime.today().strftime('%Y-%m-%d'),
    "user_id": None,
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
async def read_recipe(keyword: str = "", filter: str = None):
    if keyword:
        return await recipe_by_keyword(keyword)
    else:
        return await read_all_recipes()

# Seems natural to merge the below with the / path and then conditional 
# statement on the keyword being empty or not?
async def recipe_by_keyword(keyword: str = ""):
    try:
        _, cursor = init_conn()
        res = get_recipe_by_keyword(cursor, keyword)
        return res, 200
    # captures all exceptions from helper methods currently
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400


async def read_all_recipes():
    try:
        _, cursor = init_conn()
        res = get_all_recipes(cursor)
        return res, 200
    # captures all exceptions from helper methods currently
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400


@router.post("/")
async def create_recipe(user: dict = defaultRecipe):
    try:
        conn, cursor = init_conn()
        return "TODO", 200

    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400
