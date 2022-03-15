from recipe_scrapers import scrape_me
import re

def scraper (url):
    scraper = scrape_me(url, wild_mode=True)
    recipename = scraper.title()
    image = scraper.image()

    recipe = {}
    nutrients = {}
    ingredients = []
    steps = []
    meats = ['Chicken', 'Beef', 'Turkey', 'Sausage', 'Bacon', 'Lamb', "Pork"]
    vegetarian = True
    vegan = False

    nutrients.update(scraper.nutrients())
    ingredients = scraper.ingredients()
    steps = scraper.instructions().split('\n')

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
        fat = float(re.findall("\d+\.\d+", nutrients["fatContent"])[0])
    except:
        fat = None
    try:
        fiber = float(re.findall("\d+\.\d+", nutrients["fiberContent"])[0])
    except:
        fiber = None
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
        "recipe_description": "A fun auto generated recipe from " + url,
        "created_time": None,
        "user_id": "Qnj6AjQOLoZlJw4TZBpRE3iNz0K3",
        "creator_username": "harinwu",
        "header_image": image,
        "carbs": carbs,
        "protein": protein,
        "fat": fat,
        "fiber": fiber,
        "calories": cal,
        "servings": servings,
        "vegetarian": vegetarian,
        "vegan": vegan,
        "cooking_time": scraper.total_time()
    }

    return recipe, steps, ingredients
