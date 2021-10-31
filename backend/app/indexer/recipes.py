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
        # returns tuples
        if vegetarian:
            vegetarian_result = list(_filter_vegetarian(cursor))
        if vegan:
            vegan_result = list(_filter_vegan(cursor))

        # assume id is first
        return _filter_duplicates(vegetarian_result + vegan_result, 0)

    except Exception as e:
        print("MYSQL ERROR:")
        logging.error(e)

def _filter_duplicates(lst, index):
    seen = set()
    ans = []
    for element in lst:
        value = element[index]
        if not value in seen:
            # if we haven't seen this unique identifier we add it to our answer
            # and add it to our set of seen identifiers to not add again
            seen.add(value)
            ans.append(element)
    return ans


def _abstract_recipe_filter(cursor, sql_proc):
    try:
        cursor.callproc(sql_proc, (1,))
        return cursor.fetchall()

    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)
        return []

def _filter_vegetarian(cursor):
    return _abstract_recipe_filter(cursor, 'filterRecipeVegetarian')
    
def _filter_vegan(cursor):
    return _abstract_recipe_filter(cursor, 'filterRecipeVegan')
    


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
