#!/bin/bash

echo "Run this script locally to import into deployed database!"

mysql -h umami.harinwu.com -P 3306 -u root -p --local-infile umami_db -e "LOAD DATA LOCAL INFILE 'recipeOutput.csv'  INTO TABLE recipes_table  FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (recipe_id,name,recipe_description,created_time,user_id,creator_username,header_image,protein,carbs,fat,fiber,calories,servings,vegetarian,vegan,cooking_time)"
mysql -h umami.harinwu.com -P 3306 -u root -p --local-infile umami_db -e "LOAD DATA LOCAL INFILE 'recipeStepsOutput.csv'  INTO TABLE recipe_steps_table  FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (step_id,recipe_id,description,time,header_image)"
mysql -h umami.harinwu.com -P 3306 -u root -p --local-infile umami_db -e "LOAD DATA LOCAL INFILE 'recipeIngredientsOutput.csv'  INTO TABLE ingredients_table  FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (instance_id,ingredient_id,recipe_id,step_id,ingredient_name,category)"
