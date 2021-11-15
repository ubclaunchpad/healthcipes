import logging

def get_pantry(cursor, pantryId):
    sql = 'getPantry'

    try:
        cursor.callproc(sql, (
            pantryId
            ))
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)


def get_pantry_by_user(cursor, userId):
    sql = 'getPantryByUser'

    try:
        cursor.callproc(sql, (userId, ))
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)


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

def delete_pantry(conn, cursor, pantry):
    sql = 'deletePantry'

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

def get_ingredients(cursor):
    sql = 'getAllIngredients'

    try:
        cursor.callproc(sql)
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)
