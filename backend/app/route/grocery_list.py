from fastapi import APIRouter, Query
from typing import List
import logging
from app.indexer.tools import init_conn
from app.indexer import grocery_list

default_grocery_list = [0, 1, 2, 3]

router = APIRouter(
    prefix="/grocery_list",
    tags=["grocery_list"],
    responses={404: {"description": "Not found"}},
)

@router.post("/")
async def post_grocery_list(user_id: str, grocery_list_input: List[str] = Query(None)):
    try:
        conn, _ = init_conn()
        if user_id:
            res = grocery_list.create_grocery_list(
                conn,
                user_id,
                grocery_list_input,
            )
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

@router.get("/")
async def read_grocery_list(user_id: str):
    try:
        _, cursor = init_conn()
        if user_id:
            res = grocery_list.get_grocery_list_by_user(cursor, user_id)
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

@router.put("/")
async def update_grocery_list(grocery_list_item_id: int, user_id: str, obtained_status: bool):
    try:
        conn, cursor = init_conn()
        if user_id:
            res = grocery_list.update_grocery_list_item(
                conn,
                cursor,
                grocery_list_item_id,
                user_id,
                obtained_status
            )
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

@router.delete("/")
async def delete_grocery_list_item(grocery_list_item_id: int, user_id: str):
    try:
        conn, cursor = init_conn()
        if user_id:
            res = grocery_list.remove_grocery_list_item(
                conn,
                cursor,
                grocery_list_item_id,
                user_id
            )
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
