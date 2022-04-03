# NOTE: Apple works, unsure about Android
import requests
from app.constants.user_activity import *
from app.indexer.recipes import get_recipe_by_id
from app.indexer.tools import init_conn
from app.indexer.notification import get_user_notification_token
import logging
import json

endpoint = "https://fcm.googleapis.com/fcm/send"
# TODO: move to env file
# NOTE: this is example key
auth_key = "AAAAg7rOhRA:APA91bFlbIfZgyMmXXTrYwzAS9AQW8pINiLVWrV45_uavGNjYyb0MEJ0cmK6KrQJPUYIEPF63-WLRczdBkUAp3gxsMUz1WYpTVQSjjm4p2gEt3ONrWVgzgLYTgG4Dse55ZQhGLCpKiX2"

def send_notification(token, title, body, priority="high"):
    print("Sending notification to: " + token)
    headers = {
        "Authorization": "key=" + auth_key,
        "Content-Type": "application/json",
    }

    body = {
        "notification": {
            "title": title,
            "body": body
        },
        "to": token,
        "priority": priority
    }
    requests.post(endpoint, data=json.dumps(body), headers=headers)

def send_user_activity_notification(user_activity_fk_obj):
    for key in user_activity_fk_obj:
        id = user_activity_fk_obj[key]
        if id:
            print('sending {}'.format(key))
            _send_notif(key, id)

    pass

def _send_notif(user_activity, id):
    if user_activity == RECIPE_LIKE:
        _send_recipe_like_notif(id)
    if user_activity == USER_FOLLOW:
        # no notification currently
        pass
    if user_activity == RECIPE_VIEW:
        # no notification currently
        pass
    pass

def _send_recipe_like_notif(recipe_id):
    try:
        conn, cursor = init_conn()
        recipe = get_recipe_by_id(conn, cursor, recipe_id)
        if recipe:
            creator_id = recipe['user_id']
            # NOTE: have to create new one of these for new query or it won't find it
            conn, cursor = init_conn()
            token = get_user_notification_token(cursor, str(creator_id))
            if token:
                # WARN: this is super annoying because nature of get_user_notification_token. Should fix but effects API route and FE is using 
                token = token[0][1]
                send_notification(token, "You've got a like for your recipe", "")
    except Exception as e:
        logging.error(e)
