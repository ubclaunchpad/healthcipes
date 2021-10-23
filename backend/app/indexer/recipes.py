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


def get_recipe(cursor, recipe_id):
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
            res["calories"] = raw_result[0][5]
            res["servings"] = raw_result[0][6]
            res["vegetarian"] = bool(raw_result[0][7])
            res["vegan"] = bool(raw_result[0][8])
            res["cooking_time"] = raw_result[0][9]

            step_ids = set()
            ingredient_ids = set()

            for result in raw_result:
                if result[10] not in step_ids:
                    res["steps"].append(
                        {
                            "step_id": result[10],
                            "description": result[11],
                            "time": result[12],
                        }
                    )
                    step_ids.add(result[10])

                if result[13] not in ingredient_ids:
                    res["ingredients"].append(
                        {
                            "ingredient_id": result[13],
                            "ingredient_name": result[14],
                            "category": result[15]
                        }
                    )
                    ingredient_ids.add(result[13])
            
            res["steps"] = sorted(res["steps"], key=lambda step: step["step_id"])
            res["ingredients"] = sorted(res["ingredients"], key=lambda ingredient: ingredient["ingredient_id"])
                    
        print(res)
        return res
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)
