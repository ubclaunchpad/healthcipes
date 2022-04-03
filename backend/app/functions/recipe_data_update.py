import csv

MEATS = ["Chicken", "Beef", "Turkey", "Sausage", "Bacon", "Lamb", "Pork"]
FISH = ["Salmon", "Cod", "Tuna", "Bass", "Trout", "Red Snapper", "Halibut", "Sardines", "Char", "Herring"]
SEAFOOD = ["Shrimp", "Prawns", "Squid", "Octopus", "Clams", "Oysters", "Scallops", "Mussels", "Abalone", "Crab", "Lobster"]
DAIRY_SOURCES = ["Milk", "Cream", "Butter", "Sour Cream", "Yogurt", "Kefir", "Ice Cream", "Gelato", "Whey"]
GLUTEN_SOURCES = ["French Fries", "Gravy", "Pasta", "Bread", "Toast", "Spaghetti", "Lasagna", "Penne", "Rotini", "Beer"]
PALEO_RESTRICTIONS = ["Beans", "Edamame", "Peas", "Lentils", "Corn", "Rice", "Wheat", "Quinoa"]

def is_vegan(recipe_name):
    return int("Vegan" in recipe_name)

def is_abstract_dietary_restriction(recipe_name, category):
    for item in category:
        if item in recipe_name:
            return False

    return True

def is_vegetarian(recipe_name):
    return int(is_abstract_dietary_restriction(recipe_name, MEATS + FISH + SEAFOOD) or is_vegan(recipe_name))

def is_pescatarian(recipe_name):
    return int(is_abstract_dietary_restriction(recipe_name, MEATS))

def is_gluten_free(recipe_name):
    return int(is_abstract_dietary_restriction(recipe_name, GLUTEN_SOURCES))

def is_dairy_free(recipe_name):
    return int(is_abstract_dietary_restriction(recipe_name, DAIRY_SOURCES) or is_vegan(recipe_name))

def is_keto(recipe_name):
    # Would have done a similar approach to is_vegan but it seems to be about 
    # proportions of macros rather than any specific foods
    return 1

def is_paleo(recipe_name):
    return int(is_abstract_dietary_restriction(recipe_name, PALEO_RESTRICTIONS))

def generate_updated_recipe_row(row):
    return {
        "recipe_id": row["recipe_id"],
        "name": row["name"],
        "recipe_description": row["recipe_description"],
        "created_time": row["created_time"],
        "user_id": row["user_id"],
        "creator_username": row["creator_username"],
        "header_image": row["header_image"],
        "carbs": row["carbs"],
        "protein": row["protein"],
        "fat": row["fat"],
        "fiber": row["fiber"],
        "calories": row["calories"],
        "servings": row["servings"],
        "vegetarian": row["vegetarian"],
        "vegan": row["vegan"],
        "pescatarian": is_pescatarian(row["name"]),
        "gluten_free": is_gluten_free(row["name"]),
        "dairy_free": is_dairy_free(row["name"]),
        "keto": is_keto(row["name"]),
        "paleo": is_paleo(row["name"]),
        "cooking_time": row["cooking_time"]
    }

def update_recipe_data():
    field_names = []
    new_field_names = ["pescatarian", "gluten_free", "dairy_free", "keto", "paleo"]
    updated_recipe_rows = []
    with open("recipeOutput.csv", mode="r") as csv_file:
        csv_reader = csv.DictReader(csv_file)
        line_count = 0

        for row in csv_reader:
            if line_count == 0:
                field_names = list(row.keys())
            
            updated_recipe_rows.append(generate_updated_recipe_row(row))
            line_count += 1
    
    field_names[-1:-1] = new_field_names

    with open("recipeOutputUpdated.csv", mode="w", newline="") as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=field_names)

        writer.writeheader()

        for updated_row in updated_recipe_rows:
            writer.writerow(updated_row)

update_recipe_data()
