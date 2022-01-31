import logging
from app.indexer import users

def upsert_user_notification_token(conn, cursor, userID, token):
    sql = 'upsertUserNotificationToken'
    try:
        # assume user exists
        res = users.get_user(cursor, userID)
        if res is None:
            logging.error("User does not exist")
            raise Exception()

        cursor.callproc(sql, (userID, token))
        return cursor.fetchall()

    except Exception as e:
        logging.error(e)
        return False


