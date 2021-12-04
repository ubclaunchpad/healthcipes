from fastapi import APIRouter
import logging
from app.indexer.tools import init_conn
from app.indexer import user_activity

default_user_activity = {
    "user_id": "testID",
    "activity_type": user_activity.RECIPE_VIEW,
    "recipe_view_id": 1,
}


router = APIRouter(
    prefix="/user_activity",
    tags=["user_activity"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def read_user_activity(userID: str = ""):
    try:
        _, cursor = init_conn()
        if userID == "":
            res = user_activity.get_all_user_activity(cursor)
        else:
            res = user_activity.get_user_activity(cursor, userID)
        return res, 200

    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400


@router.get("/recipe_like")
async def read_user_activity_recipe_like(userID: str = ""):
    try:
        _, cursor = init_conn()
        if userID:
            res = user_activity.get_user_activity_recipe_like(cursor, userID)
        else:
            raise Exception('userId not given')
        return res, 200

    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400


@router.get("/rank")
async def rank_recipes(activity_type: str = user_activity.RECIPE_VIEW):
    try:
        _, cursor = init_conn()
        res = user_activity.get_ranked_recipes(cursor, activity_type)
        return res, 200

    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400


@router.post("/")
async def add_user_activity(user_activity_obj: dict = default_user_activity):
    print("trying to post user activity with body: {}".format(user_activity_obj))
    try:
        conn, cursor = init_conn()
        res = user_activity.post_user_activity(conn, cursor, user_activity_obj)
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
