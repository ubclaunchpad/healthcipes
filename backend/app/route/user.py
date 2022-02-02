from fastapi import APIRouter
import logging
from app.indexer.tools import init_conn
from app.indexer.users import post_user, get_user, update_user
from app.indexer.notification import upsert_user_notification_token, get_user_notification

defaultUser = {
    "user_id": "testID",
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


@router.put("/")
async def put_user(user: dict = defaultUser):
    try:
        conn, cursor = init_conn()
        res = update_user(conn, cursor, user)
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


@router.post("/token")
async def create_token(token, user: dict = defaultUser):
    # upsert method
    try:
        _ , cursor = init_conn()
        res = upsert_user_notification_token(cursor, user, token)
        return res, 200

    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400


@router.get("/token")
async def get_token(user: dict = defaultUser):
    # upsert method
    try:
        _ , cursor = init_conn()
        res = get_user_notification(cursor, user)
        return res, 200

    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400
