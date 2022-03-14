# NOTE: Apple works, unsure about Android
import requests
from app.indexer.user_activity import RECIPE_LIKE, USER_FOLLOW, RECIPE_VIEW
from app.indexer.recipes import get_recipe_by_id
from app.indexer.tools import init_conn

endpoint = "https://fcm.googleapis.com/fcm/send"
# TODO: move to env file
auth_key = "AAAAg7rOhRA:APA91bGnlpmOHIRIMQ97jeFYRaJzvz6SnAsdcziGuXF61sMMavsq0g3WOTqZVKcRYSS6u9fZV7FVo2j9VTB5lNIu0j3Nxi7l8zmSpBKes3Hd2PJJbq7Tl7TsHbdCvwcyjV2VvPfXYYXq"

def send_notification(token, title, body, priority="high"):
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
    requests.post(endpoint, data=body, headers=headers)


def send_user_activity_notification(user_activity_fk_obj):
    for key in user_activity_fk_obj:
        id = user_activity_fk_obj[key]
        if id:
            _send_notif(key, id)

    pass

def _send_notif(user_activity, id):
    if user_activity == RECIPE_LIKE:
        # find recipe via id 
        # send notification to creator of recipe
        try:
            conn, cursor = init_conn()
            res = get_recipe_by_id(conn, cursor, id)
            if res:
                creator_id = res[0]['user_id']

        except Exception as e:
            pass

        pass
    if user_activity == USER_FOLLOW:
        # no notification currently
        pass
    if user_activity == RECIPE_VIEW:
        # no notification currently
        pass
    pass
