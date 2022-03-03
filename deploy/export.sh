#!/bin/bash

echo "Run this script locally to export deployed database information!"

mysql -h umami.harinwu.com -P 3306 -u root -p -e 'select * from umami_db.recipes_table' | sed -e 's/,/;/g' -e 's/\t/,/g' > ./recipeOutput.csv
mysql -h umami.harinwu.com -P 3306 -u root -p -e 'select * from umami_db.recipe_steps_table' | sed -e 's/,/;/g' -e 's/\t/,/g' > ./recipeStepsOutput.csv
mysql -h umami.harinwu.com -P 3306 -u root -p -e 'select * from umami_db.ingredients_table' | sed -e 's/,/;/g' -e 's/\t/,/g'  > ./recipeIngredientsOutput.csv
mysql -h umami.harinwu.com -P 3306 -u root -p -e 'select * from umami_db.user_activity_table' | sed -e 's/,/;/g' -e 's/\t/,/g'  > ./activityOutput.csv