from fastapi import APIRouter
import logging
from app.indexer.tools import init_conn
from app.indexer.user_activity import get_user_activity

router = APIRouter(
    prefix="/user_activity",
    tags=["user_activity"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def read_user_activity(userID: str = ""):
    try:
        _, cursor = init_conn()
        res = get_user_activity(cursor, userID)
        return res, 200

    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400
