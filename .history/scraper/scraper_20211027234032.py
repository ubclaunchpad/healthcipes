from recipe_scrapers import scrape_me
import json


# json file where the output will be sorted
outfile = open("scraper.json", "w")

# array of urls of recipes
urls = ["https://www.allrecipes.com/recipe/158968/spinach-and-feta-turkey-burgers/",
        "https://tasty.co/recipe/pumpkin-chai-glazed-donuts",
        "https://www.allrecipes.com/recipe/12974/butternut-squash-soup/",
        "https://www.allrecipes.com/recipe/242052/chopped-brussels-sprout-salad/",
        ]

# dictionary of recipe
recipe = {
    "example": {
        "recipe_id": "n/a",
        "name": "n/a",
        "created_time": "n/a",
        "user_id": "n/a",
        "protein": "n/a",
        "calories": "n/a",
        "servings": "n/a",
        "vegetarian": "n/a",
        "vegan": "n/a",
        "cooking_time": "n/a"
    },
}

nutrients = {}
ingredients = []

for x in urls:
    scraper = scrape_me(x)
    recipename = scraper.title()

    print(utrients.update(scraper.nutrients()))
    recipe.update({recipename: {'recipename': scraper.title(), 'totaltime': scraper.total_time(), 'ingredients': scraper.ingredients(), "instructions": scraper.instructions(), "nutrients": scraper.nutrients()}})

json.dump(recipe, outfile, indent = 6)

outfile.close()
