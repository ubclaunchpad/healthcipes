from fastapi import APIRouter
from typing import List, Optional, Union
from pydantic import BaseModel
import logging
from app.indexer.tools import init_conn, connect_mysql
from app.indexer.recipes import get_recipe_by_keyword, get_all_recipes, post_recipe, get_recipe
from datetime import datetime

defaultRecipe = {
    # TODO: id is required due to the nature of the query, should just auto increment if given null id
    "recipe_id": 0,
    "name": "testRecipeId",
    # NOTE: need to create default user before default recipe can be made
    "user_id": "testID",
    "protein": 1,
    "carbs": 2,
    "calories": 3,
    "servings": 4,
    "vegetarian": True,
    "vegan": True,
    "cooking_time": 10
}

class RecipeStep(BaseModel):
    step_id: int
    description: str
    time: Optional[int] = None

class RecipeIngredient(BaseModel):
    ingredient_id: int
    ingredient_name: str
    category: str

class RecipeDetails(BaseModel):
    recipe_id: int
    name: str
    user_id: str
    protein: int
    carbs: int
    calories: int
    servings: int
    vegetarian: bool
    vegan: bool
    cooking_time: Optional[int] = None
    steps: List[RecipeStep]
    ingredients: List[RecipeIngredient]

class RecipeDetailsOut(BaseModel):
    data: Union[RecipeDetails, str]
    status_code: int

router = APIRouter(
    prefix="/recipe",
    tags=["recipe"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def read_recipe(keyword: str = "", filter: str = None):
    if keyword:
        return await recipe_by_keyword(keyword)
    else:
        return await read_all_recipes()

# Seems natural to merge the below with the / path and then conditional 
# statement on the keyword being empty or not?
async def recipe_by_keyword(keyword: str = ""):
    try:
        _, cursor = init_conn()
        res = get_recipe_by_keyword(cursor, keyword)
        return res, 200
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400


async def read_all_recipes():
    try:
        _, cursor = init_conn()
        res = get_all_recipes(cursor)
        return res, 200
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400


@router.post("/")
async def create_recipe(recipe: dict = defaultRecipe):
    try:
        conn, cursor = init_conn()
        res = post_recipe(conn, cursor, recipe)
        return res, 200
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400

@router.get("/{recipe_id}", response_model=RecipeDetailsOut)
async def read_recipe(recipe_id: int):
    '''get recipe info, steps, and ingredients'''
    try:
        _, cursor = init_conn()
        res = get_recipe(cursor, recipe_id)
        return {
            "data": res,
            "status_code": 200
        }

    except Exception as e:
        logging.error(e)
        return {
            "data": "Error with {}".format(e),
            "status_code": 400
        }
