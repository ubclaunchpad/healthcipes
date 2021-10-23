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
        cursor.execute("SHOW PROCEDURE STATUS WHERE Db = 'umami_db';")
        # cursor.callproc(sql_proc)
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)
