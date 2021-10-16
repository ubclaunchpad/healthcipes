from recipe_scrapers import scrape_me
import json

#sample code to learn
"""
recipes = {

    "example": {
        "title": scraper.title(),
    },
    "recipe2": {
        "title": "carrots",
    }
}
json.dump(recipe, outfile, indent = 6)
recipe.update({'recipe3': {'title': 23, 'shirt': 34}})
"""

# website receipe link
scraper = scrape_me('https://www.allrecipes.com/recipe/158968/spinach-and-feta-turkey-burgers/')

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
    "layout": {
        "recipename": "recipename",
        "totaltime": "totaltime",
        "ingredients": "ingredients",
        "instructions": "instructions",
        "nutrients": "nutrients",
    },
}

for x in urls:
    scraper = scrape_me(x)
    recipe.update({scraper.title(): {'recipename': scraper.title(), 'totaltime': scraper.total_time(), 'ingredients': scraper.ingredients(), "instructions": scraper.instructions(), "nutrients": scraper.nutrients()}})

json.dump(recipe, outfile, indent = 6)

outfile.close()
