from fastapi import APIRouter
import logging
from indexer.tools import init_conn

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


@router.post("/")
async def create_recipe(user: dict = defaultRecipe):
    try:
        conn, cursor = init_conn()
        return "TODO", 200

    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400