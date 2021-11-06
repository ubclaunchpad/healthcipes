import logging

def get_user_activity(cursor, user_id):
    sql_proc = 'getUserActivity'
    try:
        cursor.callproc(sql_proc, (user_id, ))
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)
