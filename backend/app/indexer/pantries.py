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


def get_ingredients_by_keyword(cursor, keyword):
    sql = 'getIngredientsKeyWordSearch'

    try:
        cursor.callproc(sql, (keyword,))
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)


def post_ingredient(conn, cursor, ingredient):
    sql = 'createIngredientInfo'

    ingredient_name = ingredient['ingredient_name']
    category = ingredient['category']
    image = ingredient['image']
    protein = ingredient['protein']
    carbs = ingredient['carbs']
    fat = ingredient['fat']
    fiber = ingredient['fiber']
    calories = ingredient['calories']

    try:
        cursor.callproc(sql, (
            ingredient_name,
            category,
            image,
            protein,
            carbs,
            fat,
            fiber,
            calories
            ))
        conn.commit()
        return ingredient
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)

def post_ingredient_array(conn, cursor, ingredient):
    sql = 'createIngredientInfo'

    ingredient_name = ingredient[1]
    category = ingredient[2]
    image = ingredient[3]
    protein = ingredient[4]
    carbs = ingredient[5]
    fat = ingredient[6]
    fiber = ingredient[7]
    calories = ingredient[8]

    try:
        cursor.callproc(sql, (
            ingredient_name,
            category,
            image,
            protein,
            carbs,
            fat,
            fiber,
            calories
            ))
        conn.commit()
        return ingredient
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)
