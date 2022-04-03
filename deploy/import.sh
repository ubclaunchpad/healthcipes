#!/bin/bash

echo "Run this script locally to import into deployed database!"

mysql -h umami.harinwu.com -P 3306 -u root -p --local-infile umami_db -e "LOAD DATA LOCAL INFILE 'userOutput.csv'  INTO TABLE users_table  FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (user_id,username,first_name,last_name,email,location,profile_picture,recipe_driven,vegetarian,vegan,pescatarian,gluten_free,dairy_free,keto,paleo,style,experience)"
mysql -h umami.harinwu.com -P 3306 -u root -p --local-infile umami_db -e "LOAD DATA LOCAL INFILE 'recipeOutputUpdated.csv'  INTO TABLE recipes_table  FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (recipe_id,name,recipe_description,created_time,user_id,creator_username,header_image,protein,carbs,fat,fiber,calories,servings,vegetarian,vegan,pescatarian,gluten_free,dairy_free,keto,paleo,cooking_time)"
mysql -h umami.harinwu.com -P 3306 -u root -p --local-infile umami_db -e "LOAD DATA LOCAL INFILE 'recipeStepsOutput.csv'  INTO TABLE recipe_steps_table  FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (step_id,recipe_id,description,time,header_image)"
mysql -h umami.harinwu.com -P 3306 -u root -p --local-infile umami_db -e "LOAD DATA LOCAL INFILE 'recipeIngredientsOutput.csv'  INTO TABLE ingredients_table  FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (instance_id,ingredient_id,recipe_id,step_id,ingredient_name,category)"
mysql -h umami.harinwu.com -P 3306 -u root -p --local-infile umami_db -e "LOAD DATA LOCAL INFILE 'activityOutput.csv'  INTO TABLE user_activity_table  FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"' LINES TERMINATED BY '\n' IGNORE 1 LINES (user_activity_id,user_id,activity_type,date_created,user_follow_id,recipe_like_id,recipe_view_id)"
