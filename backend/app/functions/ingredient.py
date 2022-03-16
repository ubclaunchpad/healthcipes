import spacy
import csv

def parse_ingredients_from_text(text):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    foodList = []
    ingredients = []
    nouns = [token.text for token in doc if token.pos_ == "NOUN"]

    with open('app/food.csv', newline='', encoding='utf-8') as csvfile:
        foodReader = csv.reader(csvfile, delimiter=',', quotechar='|')
        for row in foodReader:
            foodList.append(row[2])
    
    for noun in nouns:
        if any(noun.lower() in x for x in foodList) and len(noun) > 2:
            ingredients.append(noun.title())

    return list(set(ingredients))