from fastapi import APIRouter
import logging
from app.indexer.tools import init_conn
from app.indexer.pantries import post_pantry

defaultPantry = {
    "user_id": "testID",
    "username": "Test",
}

router = APIRouter(
    prefix="/pantry",
    tags=["pantry"],
    responses={404: {"description": "Not found"}},
)


@router.post("/")
async def create_user(pantry: dict = defaultPantry):
    try:
        conn, cursor = init_conn()
        res = post_pantry(conn, cursor, pantry)
        return res, 200

    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400