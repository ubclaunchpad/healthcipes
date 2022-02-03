import logging
from app.indexer import users

def upsert_user_notification_token(conn, cursor, userID, token):
    sql = 'upsertUserNotificationToken'
    try:
        print('inside indexer')
        print(userID, token)
        # assume user exists
        print('user exists')
        print(userID, token)
        cursor.callproc(sql, (userID, token))
        print('after callproc')
        conn.commit()
        return cursor.fetchall()

    except Exception as e:
        logging.error(e)
        return False


def get_user_notification(cursor, userID):
    sql = 'getUserNotificationToken'
    try:
        cursor.callproc(sql, (userID, ))
        return cursor.fetchall()

    except Exception as e:
        logging.error(e)
        return False


