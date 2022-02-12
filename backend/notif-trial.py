import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("umami-2021-firebase-adminsdk-asfv5-6b89b065e5.json")
firebase_admin.initialize_app(cred)

import requests
import json

serverToken = 'AAAAg7rOhRA:APA91bE2Wk_Ly0trmeTXKSgL3Epo-bo2G8A4TyaWETuTnFBZGZGNsQAnOIGJBQl9CBcpknooEM0vPOKOzsn5qEHfnupluWt8qe3Cx9IccQN0FXCwqk6grRKRKg-wsqRGNWmFmlaC1o6z'
deviceToken = ''

headers = {
        'Content-Type': 'application/json',
        'Authorization': 'key=' + serverToken,
      }

body = {
          'notification': {'title': 'Sending push form python script',
                            'body': 'New Message'
                            },
          'to':
              deviceToken,
          'priority': 'high',
        #   'data': dataPayLoad,
        }
response = requests.post("https://fcm.googleapis.com/fcm/send",headers = headers, data=json.dumps(body))
print(response.status_code)

print(response.json())
