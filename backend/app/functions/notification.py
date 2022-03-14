# NOTE: Apple works, unsure about Android
import requests
from app.constants.user_activity import *
from app.indexer.recipes import get_recipe_by_id
from app.indexer.tools import init_conn
from app.indexer.notification import get_user_notification_token
import logging

endpoint = "https://fcm.googleapis.com/fcm/send"
# TODO: move to env file
auth_key = "AAAAg7rOhRA:APA91bGnlpmOHIRIMQ97jeFYRaJzvz6SnAsdcziGuXF61sMMavsq0g3WOTqZVKcRYSS6u9fZV7FVo2j9VTB5lNIu0j3Nxi7l8zmSpBKes3Hd2PJJbq7Tl7TsHbdCvwcyjV2VvPfXYYXq"

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
    r = requests.post(endpoint, data=body, headers=headers)
    print(r)

def send_user_activity_notification(user_activity_fk_obj):
    for key in user_activity_fk_obj:
        id = user_activity_fk_obj[key]
        if id:
            _send_notif(key, id)

    pass

def _send_notif(user_activity, id):
    if user_activity == RECIPE_LIKE:
        try:
            conn, cursor = init_conn()
            recipe = get_recipe_by_id(conn, cursor, id)
            if recipe:
                creator_id = recipe['user_id']
                token = get_user_notification_token(cursor, creator_id)
                if token:
                    # FIX: this is super annoying because nature of get_user_notification_token. Should fix but effects API route and FE is using 
                    token = token[0][3]
                    print(token)
                    send_notification(token, "You've got a like for your recipe", "")
            else:
                return
        except Exception as e:
            logging.error(e)
            pass
    if user_activity == USER_FOLLOW:
        # no notification currently
        pass
    if user_activity == RECIPE_VIEW:
        # no notification currently
        pass
    pass
