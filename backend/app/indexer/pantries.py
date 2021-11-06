import logging

def post_pantry(conn, cursor, pantry):
    sql = 'postPantry'

    user_id = user['user_id']
    username = user['username']

    try:
        cursor.callproc(sql, (
            user_id,
            username
            ))
        conn.commit()
        return pantry
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)