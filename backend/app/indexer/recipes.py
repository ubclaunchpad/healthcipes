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

def get_featured_recipes(cursor):
    sql_proc = 'getFeaturedRecipes'
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
    sql_proc = 'createRecipeAutoID'

    recipe_id = recipe['recipe_id']
    if (recipe_id):
        sql_proc = 'createRecipe'
    name = recipe['name']
    recipe_description = recipe['recipe_description']
    user_id = recipe['user_id']
    creator_username = recipe['creator_username']
    header_image = recipe.get('header_image', '')
    protein = recipe['protein']
    carbs = recipe['carbs']
    fat = recipe['fat']
    fiber = recipe['fiber']
    calories = recipe['calories']
    servings = recipe['servings']
    vegetarian = recipe['vegetarian']
    vegan = recipe['vegan']
    cooking_time = recipe['cooking_time']

    try:
        if (recipe_id):
            finalRecipe = cursor.callproc(sql_proc, (
                recipe_id,
                name,
                recipe_description,
                user_id,
                creator_username,
                header_image,
                protein,
                carbs,
                fat,
                fiber,
                calories,
                servings,
                vegetarian,
                vegan,
                cooking_time,
            ))
            conn.commit()
            return finalRecipe
        else:
            finalRecipe = cursor.callproc(sql_proc, (
                name,
                recipe_description,
                user_id,
                creator_username,
                header_image,
                protein,
                carbs,
                fat,
                fiber,
                calories,
                servings,
                vegetarian,
                vegan,
                cooking_time,
            ))
            conn.commit()
            cursor.nextset()
            cursor.execute("SELECT * FROM recipes_table ORDER BY created_time DESC LIMIT 1;")
            return cursor.fetchone()
    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)

def post_steps(conn, cursor, stepList, recipe):
    sql_proc = 'addSteps'

    try:
        for step in stepList:
            cursor.callproc(sql_proc, (
                recipe,
                step,
                0
            ))
            conn.commit()
            cursor.nextset()
        return stepList
    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)

def post_ingredients(conn, cursor, ingredientList, recipe):
    sql_proc = 'addIngredients'

    try:
        for ingredient in ingredientList:
            cursor.callproc(sql_proc, (
                "MagicID",
                recipe,
                ingredient,
                "Other"
            ))
            conn.commit()
            cursor.nextset()
        return ingredientList
    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)

def is_missing_macros(recipe_details):
    '''
    Returns False if we do not have any macro information
    from the recipe details. Otherwise returns True
    '''
    return not (
        recipe_details["protein"] or
        recipe_details["carbs"] or
        recipe_details["fat"] or
        recipe_details["fiber"] or
        recipe_details["calories"]
    )

def get_ingredient_macros(conn, cursor, ingredients):
    '''
    Returns the macro values for each ingredient
    '''
    sql = 'getIngredientInfo'
    ingredient_macros = []
    cursor.close()
    new_cursor = conn.cursor()
    for ingredient in ingredients:
        try:
            new_cursor.close()
            new_cursor = conn.cursor()
            new_cursor.callproc(sql, (ingredient["ingredient_id"], ))
            raw_result = new_cursor.fetchall()
            res = {
                "ingredient_id": ingredient["ingredient_id"],
                "protein": raw_result[0][4],
                "carbs": raw_result[0][5],
                "fat": raw_result[0][6],
                "fiber": raw_result[0][7],
                "calories": raw_result[0][8]
            }
            ingredient_macros.append(res)
        except Exception as e:
            print("MYSQL ERROR:", sql)
            logging.error(e)
    
    new_cursor.close()
    return ingredient_macros

def get_recipe_by_id(conn, cursor, recipe_id):
    '''
    Returns the available recipe details given a recipe_id
    Note: macros may still be empty if they were not added
    to the recipe or corresponding ingredients
    '''
    sql = 'getRecipe'
    try:
        cursor.callproc(sql, (recipe_id, ))
        raw_result = cursor.fetchall()
        res = {
            "recipe_id": recipe_id,
            "name": "",
            "recipe_description": "",
            "user_id": "",
            "creator_username": "",
            "protein": 0,
            "carbs": 0,
            "fat": 0,
            "fiber": 0,
            "calories": 0,
            "servings": 0,
            "vegetarian": False,
            "vegan": False,
            "cooking_time": 0,
            "steps": [],
            "ingredients": []
        }

        if len(raw_result):
            res["name"] = raw_result[0][1]
            res["recipe_description"] = raw_result[0][2]
            res["user_id"] = raw_result[0][3]
            res["creator_username"] = raw_result[0][4]
            res["protein"] = raw_result[0][5]
            res["carbs"] = raw_result[0][6]
            res["fat"] = raw_result[0][7]
            res["fiber"] = raw_result[0][8]
            res["calories"] = raw_result[0][9]
            res["servings"] = raw_result[0][10]
            res["vegetarian"] = bool(raw_result[0][11])
            res["vegan"] = bool(raw_result[0][12])
            res["cooking_time"] = raw_result[0][13]

            step_ids = set()
            ingredient_ids = set()

            for result in raw_result:
                if result[14] not in step_ids:
                    res["steps"].append(
                        {
                            "step_id": result[14],
                            "description": result[15],
                            "time": result[16],
                        }
                    )
                    step_ids.add(result[14])

                if result[17] not in ingredient_ids:
                    res["ingredients"].append(
                        {
                            "ingredient_id": result[17],
                            "ingredient_name": result[18],
                            "category": result[19]
                        }
                    )
                    ingredient_ids.add(result[17])
            
            res["steps"] = sorted(res["steps"], key=lambda step: step["step_id"])
            res["ingredients"] = sorted(res["ingredients"], key=lambda ingredient: ingredient["ingredient_id"])

            if is_missing_macros(res):
                ingredient_macros = get_ingredient_macros(conn, cursor, res["ingredients"])

                # Make sure the values for macros are not None so we can
                # add, and to fit our model
                res["protein"] = 0
                res["carbs"] = 0
                res["fat"] = 0
                res["fiber"] = 0
                res["calories"] = 0

                # Do something with the macros, assuming they do not
                # need to be scaled, i.e. they have proper macro values
                # according to the recipe
                for ingredient_macro in ingredient_macros:
                    res["protein"] += ingredient_macro["protein"]
                    res["carbs"] += ingredient_macro["carbs"]
                    res["fat"] += ingredient_macro["fat"]
                    res["fiber"] += ingredient_macro["fiber"]
                    res["calories"] += ingredient_macro["calories"]

                # update recipe macros so we don't need to repeat this
                # multiple times for the same recipe
                cursor.close()
                new_cursor = conn.cursor()
                new_sql = 'updateRecipeMacros'
                new_cursor.callproc(new_sql, 
                    (
                        res["recipe_id"], 
                        res["protein"],
                        res["carbs"],
                        res["fat"],
                        res["fiber"],
                        res["calories"]
                    )
                )
                conn.commit()
                
        return res
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)

def get_createdrecipe_by_userid(cursor, user_id):
    sql_proc = 'getCreatedRecipeById'
    try:
        cursor.callproc(sql_proc, (user_id, ))
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)