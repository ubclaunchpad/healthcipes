from fastapi import APIRouter
import logging
from indexer.tools import init_conn
from indexer.users import post_user, get_user

defaultUser = {
    "userID": "testID",
    "username": "Test",
    "email": "test@test.com",
}

router = APIRouter(
    prefix="/user",
    tags=["user"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def read_user(userID: str = ""):
    try:
        _, cursor = init_conn()
        res = get_user(cursor, userID)
        return res, 200

    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400


@router.post("/")
async def create_user(user: dict = defaultUser):
    try:
        conn, cursor = init_conn()
        res = post_user(conn, cursor, user)
        return res, 200

    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400