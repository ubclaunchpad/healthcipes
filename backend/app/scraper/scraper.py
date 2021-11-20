from recipe_scrapers import scrape_me
import json
import re

def scraper (url):
    scraper = scrape_me(url)
    recipename = scraper.title()

    recipe = {}
    nutrients = {}
    ingredients = []
    meats = ['Chicken', 'Beef', 'Turkey', 'Sausage', 'Bacon', 'Lamb', "Pork"]
    vegetarian = True
    vegan = False

    nutrients.update(scraper.nutrients())
    ingredients.append(scraper.ingredients())

    if 'Vegan' in recipename:
        vegetarian = True
        vegan = True
    else:
        for meat in meats:
            if meat in recipename or meat in ingredients:
                vegetarian = False
                vegan = False
                break

    try:
        protein = float(re.findall("\d+\.\d+", nutrients["proteinContent"])[0])
    except:
        protein = None
    try:
        carbs = float(re.findall("\d+\.\d+", nutrients["carbohydrateContent"])[0])
    except:
        carbs = None
    try:
        cal = float(re.findall("\d+\.\d+", nutrients["calories"])[0])
    except:
        cal = None
    try:
        servings = int(re.findall("\d+", scraper.yields())[0])
    except:
        servings = None

    recipe = {
        'recipe_id': None,
        "name": recipename,
        "recipe_description": "",
        "created_time": None,
        "user_id": None,
        "creator_username": None,
        "carbs": carbs,
        "protein": protein,
        "calories": cal,
        "servings": servings,
        "vegetarian": vegetarian,
        "vegan": vegan,
        "cooking_time": scraper.total_time()
    }

    return recipe