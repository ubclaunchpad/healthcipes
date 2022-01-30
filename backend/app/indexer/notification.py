import logging
from app.indexer import users

def post_notification(conn, cursor, userID, token):
    try:
        # assume user exists
        res = users.get_user(cursor, userID)
        if res is None:
            logging.error("User does not exist")
            raise Exception()

        # User exists

        # check if user has token

        # if not insert
        # else update
        
        # return row
        row = token 
        return row

    except Exception as e:
        logging.error(e)
        return False


