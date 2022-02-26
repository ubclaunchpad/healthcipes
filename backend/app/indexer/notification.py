import logging
from app.indexer import users

def upsert_user_notification_token(conn, cursor, userID, token):
    sql = 'upsertUserNotificationToken'
    try:
        cursor.callproc(sql, (userID, token))
        conn.commit()
        return cursor.fetchall()

    except Exception as e:
        logging.error(e)
        return False


def get_user_notification_token(cursor, userID):
    sql = 'getUserNotificationToken'
    try:
        cursor.callproc(sql, (userID, ))
        return cursor.fetchall()

    except Exception as e:
        logging.error(e)
        return False


def get_user_notification(cursor, userID):
    # TODO: implement sql proc below
    # procedure
    # currently only on recipe likes 
    # join userID to recipe tables
    # for those recipes join with all recipe like user actions
    # return in chronological order of actions where userId "owns" recipe 
    return

    # sql = 'getUserNotification'
    # try:
    #     cursor.callproc(sql, (userID, ))
    #     return cursor.fetchall()

    # except Exception as e:
    #     logging.error(e)
    #     return False
