# import firebase_admin
# from firebase_admin import credentials

# cred = credentials.Certificate("umami-2021-firebase-adminsdk-asfv5-6b89b065e5.json")
# firebase_admin.initialize_app(cred)

import requests
import json

serverToken = 'AAAAg7rOhRA:APA91bGnlpmOHIRIMQ97jeFYRaJzvz6SnAsdcziGuXF61sMMavsq0g3WOTqZVKcRYSS6u9fZV7FVo2j9VTB5lNIu0j3Nxi7l8zmSpBKes3Hd2PJJbq7Tl7TsHbdCvwcyjV2VvPfXYYXq'
deviceToken = 'djjDCPhBTy69sl4l5-IHdQ:APA91bET76UbACbvoChaoRQgd3UHL340pQMvFQJKvh9RLir8HoUpK_X7gFp1vkyr0F1sC3xFC4xhVY8DsbSiqD27RIVk92aMhlSkciwZ3_H60eUEl7I_vb13JcDTDVWQFBJODYqRmG3q'

headers = {
        'Content-Type': 'application/json',
        'Authorization': 'key=' + serverToken,
      }

body = {
          "notification": {"title": "Sending push from python script",
                            "body": "New Message"
                            },
          "to":
              deviceToken,
          "priority": "high",
        #   "data": dataPayLoad,
        }
response = requests.post("https://fcm.googleapis.com/fcm/send",headers = headers, data=json.dumps(body))
print(response.status_code)
print(response.json())
