import logging

def get_user_activity(cursor, user_id):
    sql_proc = 'getUsersUserActivity'
    try:
        cursor.callproc(sql_proc, (user_id, ))
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)


def get_all_user_activity(cursor):
    sql_proc = 'getAllUserActivity'
    try:
        cursor.callproc(sql_proc) 
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)

