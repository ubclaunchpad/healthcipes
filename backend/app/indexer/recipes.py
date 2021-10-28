import logging

def get_recipe(cursor, recipeID):
    sql = 'getRecipe'
    try:
        cursor.callproc(sql, (recipeID, ))
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)

# unsure about the difference between recipe and recipe.get
# unsure about how to the do the post section for recipe

def post_recipe(conn, cursor, recipe):
    sql = 'postRecipe'

    recipeID = recipe['recipeID']
    recipename = recipe.get('recipe')
    createdtime = recipe['createdtime']
    userID = recipe['userID']
    protein = recipe.get('protein')
    carbs = recipe.get('carbs')
    calories = recipe.get('calories')
    servings = recipe.get('servings')
    vegetarian = recipe.get('vegetarian')
    vegan = recipe.get('vegan')
    cooking_time = recipe.get('cooking_time')

    try:
        cursor.callproc(sql, (
            recipeID,
            recipename,
            createdtime, 
            userID,
            protein,
            carbs,
            calories,
            servings,
            vegetarian,
            vegan,
            cooking_time
             ))
        conn.commit()
        return recipe
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)