import logging
from pprint import pprint

# TODO: should abstract into a function that just takes sql_proc as input
def get_recipe_by_keyword(cursor, keyword):
    sql_proc = 'getRecipeKeywordSearch'
    try:
        cursor.callproc(sql_proc, (keyword, ))
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)


def get_all_recipes(cursor):
    sql_proc = 'getAllRecipes'
    try:
        # cursor.execute("SHOW PROCEDURE STATUS WHERE Db = 'umami_db';")
        cursor.callproc(sql_proc)
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)


def post_recipe(conn, cursor, recipe):
    sql_proc = 'createRecipe'

    recipe_id = recipe['recipe_id']
    name = recipe['name']
    created_time = recipe['created_time']
    user_id = recipe['user_id']
    protein = recipe['protein']
    carbs = recipe['carbs']
    calories = recipe['calories']
    servings = recipe['servings']
    vegetarian = recipe['vegetarian']
    vegan = recipe['vegan']
    cooking_time = recipe['cooking_time']

    try:
        cursor.callproc(sql_proc, (
            recipe_id,
            name,
            created_time,
            user_id,
            protein,
            carbs,
            calories,
            servings,
            vegetarian,
            vegan,
            cooking_time,
        ))
        conn.commit()
        return recipe
    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)
