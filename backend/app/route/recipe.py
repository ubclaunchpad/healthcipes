from fastapi import APIRouter
import logging
from app.indexer.tools import init_conn
from app.indexer.recipes import post_recipe, get_recipe
from scraper.scraper import recipe

defaultRecipe = {
        "name": "N/A",
        "created_time": "N/A",
        "user_id": "N/A",
        "protein": "N/A",
        "carbs": "N/A",
        "calories": "N/A",
        "servings": "N/A",
        "vegetarian": "N/A",
        "vegan": "N/A",
        "cooking_time": "N/A",
}

router = APIRouter(
    prefix="/recipe",
    tags=["recipe"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def read_recipe(recipeID: str = ""):
    try:
        _, cursor = init_conn()
        res = get_recipe(cursor, recipeID)
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