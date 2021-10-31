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
            "user_id": "",
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
            res["user_id"] = raw_result[0][2]
            res["protein"] = raw_result[0][3]
            res["carbs"] = raw_result[0][4]
            res["fat"] = raw_result[0][5]
            res["fiber"] = raw_result[0][6]
            res["calories"] = raw_result[0][7]
            res["servings"] = raw_result[0][8]
            res["vegetarian"] = bool(raw_result[0][9])
            res["vegan"] = bool(raw_result[0][10])
            res["cooking_time"] = raw_result[0][11]

            step_ids = set()
            ingredient_ids = set()

            for result in raw_result:
                if result[12] not in step_ids:
                    res["steps"].append(
                        {
                            "step_id": result[12],
                            "description": result[13],
                            "time": result[14],
                        }
                    )
                    step_ids.add(result[12])

                if result[15] not in ingredient_ids:
                    res["ingredients"].append(
                        {
                            "ingredient_id": result[15],
                            "ingredient_name": result[16],
                            "category": result[17]
                        }
                    )
                    ingredient_ids.add(result[15])
            
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
