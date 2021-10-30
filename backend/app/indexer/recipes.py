import logging

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
        cursor.callproc(sql_proc)
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)

def filter_recipes(cursor, vegetarian: bool = False, vegan: bool = False):
    vegetarian_result = []
    vegan_result = []
    try:
        if vegetarian:
            vegetarian_result = _filter_vegetarian(cursor)
        if vegan:
            vegan_result = _filter_vegan(cursor)

        # TODO: check id
        return _filter_duplicates(vegetarian_result + vegan_result, 'id')

    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)

def _filter_duplicates(lst, key):
    seen = set()
    ans = []
    for element in lst:
        value = element[key]
        if not value in seen:
            seen.add(value)
            ans.append(element)
    return ans


def _filter_vegetarian(cursor):
    sql_proc = 'filterRecipeVegetarian'
    try:
        cursor.callproc(sql_proc, (True))
        return cursor.fetchall()

    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)
    
    
def _filter_vegan(cursor):
    sql_proc = 'filterRecipeVegan'
    try:
        cursor.callproc(sql_proc, (True))
        return cursor.fetchall()

    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)
    


def post_recipe(conn, cursor, recipe):
    sql_proc = 'createRecipe'

    recipe_id = recipe['recipe_id']
    name = recipe['name']
    user_id = recipe['user_id']
    protein = recipe['protein']
    carbs = recipe['carbs']
    calories = recipe['calories']
    servings = recipe['servings']
    vegetarian = recipe['vegetarian']
    vegan = recipe['vegan']
    cooking_time = recipe['cooking_time']

    try:
        hello = cursor.callproc(sql_proc, (
            recipe_id,
            name,
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
        return hello
    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)
