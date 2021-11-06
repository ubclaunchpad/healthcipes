import logging

def post_pantry(conn, cursor, pantry):
    sql = 'postPantry'

    user_id = pantry['user_id']
    ingredient_id = pantry['ingredient_id']

    try:
        cursor.callproc(sql, (
            user_id,
            ingredient_id
            ))
        conn.commit()
        return pantry
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)