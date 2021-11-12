from fastapi import APIRouter
import logging
from app.indexer.tools import init_conn
from app.indexer.pantries import post_pantry, get_pantry

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
async def read_pantry(pantry_id: str):
    try:
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
