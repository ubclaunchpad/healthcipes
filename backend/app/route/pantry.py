from fastapi import APIRouter
import logging
from app.indexer.tools import init_conn
from app.indexer.pantries import post_pantry

defaultPantry = {
    "user_id": "abc",
    "ingredient_id": 1,
}

router = APIRouter(
    prefix="/pantry",
    tags=["pantry"],
    responses={404: {"description": "Not found"}},
)


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