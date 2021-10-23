from fastapi import APIRouter
import logging
from app.indexer.tools import init_conn
from app.indexer.recipes import get_recipe_by_keyword

defaultRecipe = {}

router = APIRouter(
    prefix="/recipe",
    tags=["recipe"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def read_recipe(userID: str = ""):
    try:
        _, cursor = init_conn()
        return "TODO", 200

    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400

# Seems natural to merge the below with the / path and then conditional 
# statement on the keyword being empty or not?
@router.get("/keyword")
async def read_recipe_keyword(keyword: str = ""):
    try:
        _, cursor = init_conn()
        res = get_recipe_by_keyword(cursor, keyword)
        return res, 200

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
