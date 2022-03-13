# NOTE: Apple works, unsure about Android
import requests

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
