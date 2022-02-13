USE `umami_db`;

DROP procedure IF EXISTS `createRecipe`;
DROP procedure IF EXISTS `createRecipeAutoID`;
DROP procedure IF EXISTS `addSteps`;
DROP procedure IF EXISTS `addIngredients`;
DROP procedure IF EXISTS `getRecipe`;
DROP procedure IF EXISTS `updateRecipeMacros`;
DROP procedure IF EXISTS `getIngredientInfo`;
DROP procedure IF EXISTS `addMockRecipe`;
DROP procedure IF EXISTS `addMockMissingMacroRecipe`;
DROP procedure IF EXISTS `addMockSteps`;
DROP procedure IF EXISTS `addMockIngredients`;
DROP procedure IF EXISTS `addMockIngredientsInfo`;


DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getRecipe` (IN `_recipe_id` INT)
BEGIN

SELECT r.*,
rs.*,
i.ingredient_id, i.ingredient_name, i.category, i.step_id
FROM `recipes_table` r
LEFT JOIN `recipe_steps_table` rs ON r.recipe_id = rs.recipe_id
LEFT JOIN `ingredients_table` i ON r.recipe_id = i.recipe_id
WHERE r.recipe_id = `_recipe_id`
;

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getCreatedRecipeById` (IN `_user_id` VARCHAR(255))
BEGIN

SELECT r.*
FROM `recipes_table` r
WHERE r.user_id = `_user_id`
;

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `updateRecipeMacros` (
    IN `_recipe_id` INT,
    IN `_protein` INT,
    IN `_carbs` INT,
    IN `_fat` INT,
    IN `_fiber` INT,
    IN `_calories` INT
)
BEGIN

UPDATE `recipes_table`
SET `protein` = `_protein`, `carbs` = `_carbs`, `fat` = `_fat`, `fiber` = `_fiber`, `calories` = `_calories`
WHERE `recipe_id` = `_recipe_id`
;

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getIngredientInfo` (IN `_ingredient_id` VARCHAR(255))
BEGIN

SELECT * FROM `ingredients_info_table`
WHERE `ingredient_id` = `_ingredient_id`;

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `addMockUser` ()
BEGIN

INSERT INTO `users_table` (
    `user_id`,
    `username`,
    `first_name`,
    `last_name`,
    `email`,
    `location`,
    `profile_picture`,
    `recipe_driven`
) VALUES(
    'abc',
    'thenotsohipmillenialchef',
    'karen',
    'white',
    'karenwhite@yahoo.com',
    'Shaughnessy',
    '',
    0
);

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `addMockRecipe` ()
BEGIN

INSERT INTO `recipes_table` (
    `name`,
    `recipe_description`,
    `user_id`,
    `creator_username`,
    `created_time`,
    `header_image`,
    `protein`,
    `carbs`,
    `fat`,
    `fiber`,
    `calories`,
    `servings`,
    `vegetarian`,
    `vegan`,
    `cooking_time`
) VALUES(
    'Scrambled Eggs',
    'Scrambled eggs: timeless, simple, quick',
    'abc',
    'thenotsohipmillenialchef',
    now(),
    'gs://umami-2021.appspot.com/Recipes/Scrambled Eggs.jpeg',
    10,
    1,
    5,
    0,
    300,
    1,
    1,
    0,
    5
);

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `addMockMissingMacroRecipe` ()
BEGIN

INSERT INTO `recipes_table` (
    `name`,
    `recipe_description`,
    `user_id`,
    `creator_username`,
    `protein`,
    `carbs`,
    `fat`,
    `fiber`,
    `calories`,
    `servings`,
    `vegetarian`,
    `vegan`,
    `cooking_time`
) VALUES(
    'Scrambled Eggs',
    'Scrambled eggs: timeless, simple, quick',
    'abc',
    'thenotsohipmillenialchef',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    1,
    1,
    0,
    5
);

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `addMockSteps` ()
BEGIN

INSERT INTO `recipe_steps_table` (`recipe_id`, `description`, `time`, `header_image`)
VALUES(1, 'crack two eggs into a small bowl', NULL, 'gs://umami-2021.appspot.com/Recipes/Scrambled Eggs.jpeg');

INSERT INTO `recipe_steps_table` (`recipe_id`, `description`, `time`, `header_image`)
VALUES(1, 'add salt, pepper, and crushed red pepper', NULL, 'gs://umami-2021.appspot.com/Recipes/Butter Chicken.jpeg');

INSERT INTO `recipe_steps_table` (`recipe_id`, `description`, `time`, `header_image`)
VALUES(1, 'cook in small pan on medium heat, stirring occassionally', 5, 'gs://umami-2021.appspot.com/Recipes/Fried Chicken.jpeg');

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `addMockIngredients` ()
BEGIN

INSERT INTO `ingredients_table` (`ingredient_id`, `recipe_id`, `step_id`, `ingredient_name`, `category`)
VALUES('aaaa', 1, 1, '2 eggs', 'Dairy');

INSERT INTO `ingredients_table` (`ingredient_id`, `recipe_id`, `step_id`, `ingredient_name`, `category`)
VALUES('aaab', 1, 2, 'pinch of salt', 'Seasoning');

INSERT INTO `ingredients_table` (`ingredient_id`, `recipe_id`, `step_id`, `ingredient_name`, `category`)
VALUES('aaac', 1, 2, 'pinch of pepper', 'Seasoning');

INSERT INTO `ingredients_table` (`ingredient_id`, `recipe_id`, `step_id`, `ingredient_name`, `category`)
VALUES('aaad', 1, 2, 'pinch of crushed red pepper', 'Seasoning');

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `addMockIngredientsInfo` ()
BEGIN

INSERT INTO `ingredients_info_table` (`ingredient_id`, `ingredient_name`, `category`, `protein`, `carbs`, `fat`, `fiber`, `calories`)
VALUES('aaaa', '2 eggs', 'Dairy', 10, 0, 5, 0, 300);

INSERT INTO `ingredients_info_table` (`ingredient_id`, `ingredient_name`, `category`, `protein`, `carbs`, `fat`, `fiber`, `calories`)
VALUES('aaab', 'pinch of salt', 'Seasoning', 0, 0, 0, 0, 0);

INSERT INTO `ingredients_info_table` (`ingredient_id`, `ingredient_name`, `category`, `protein`, `carbs`, `fat`, `fiber`, `calories`)
VALUES('aaac', 'pinch of pepper', 'Seasoning', 0, 0, 0, 0, 0);

INSERT INTO `ingredients_info_table` (`ingredient_id`, `ingredient_name`, `category`, `protein`, `carbs`, `fat`, `fiber`, `calories`)
VALUES('aaad', 'pinch of crushed red pepper', 'Seasoning', 0, 0, 0, 0, 2);

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `createRecipe` (
    IN `_recipe_id` INT,
    IN `_name` VARCHAR(50),
    IN `_recipe_description` VARCHAR(255),
    IN `_user_id` VARCHAR(50),
    IN `_creator_username` VARCHAR(50),
    IN `_header_image` VARCHAR(255),
    IN `_protein` INT,
    IN `_carbs` INT,
    IN `_fat` INT,
    IN `_fiber` INT,
    IN `_calories` INT,
    IN `_servings` INT,
    IN `_vegetarian` BOOLEAN,
    IN `_vegan` BOOLEAN,
    IN `_cooking_time` INT
)
BEGIN

REPLACE INTO `recipes_table` (
    `recipe_id`,
    `name`,
    `recipe_description`,
    `created_time`,
    `user_id`,
    `creator_username`,
    `header_image`,
    `protein`,
    `carbs`,
    `fat`,
    `fiber`,
    `calories`,
    `servings`,
    `vegetarian`,
    `vegan`,
    `cooking_time`
)
VALUES (
    `_recipe_id`,
    `_name`,
    `_recipe_description`,
    NOW(),
    `_user_id`,
    `_creator_username`,
    `_header_image`,
    `_protein`,
    `_carbs`,
    `_fat`,
    `_fiber`,
    `_calories`,
    `_servings`,
    `_vegetarian`,
    `_vegan`,
    `_cooking_time`
);

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `createRecipeAutoID` (
    IN `_name` VARCHAR(50),
    IN `_recipe_description` VARCHAR(255),
    IN `_user_id` VARCHAR(50),
    IN `_creator_username` VARCHAR(50),
    IN `_header_image` VARCHAR(255),
    IN `_protein` INT,
    IN `_carbs` INT,
    IN `_fat` INT,
    IN `_fiber` INT,
    IN `_calories` INT,
    IN `_servings` INT,
    IN `_vegetarian` BOOLEAN,
    IN `_vegan` BOOLEAN,
    IN `_cooking_time` INT
)
BEGIN

INSERT INTO `recipes_table` (
    `name`,
    `recipe_description`,
    `created_time`,
    `user_id`,
    `creator_username`,
    `header_image`,
    `protein`,
    `carbs`,
    `fat`,
    `fiber`,
    `calories`,
    `servings`,
    `vegetarian`,
    `vegan`,
    `cooking_time`
)
VALUES (
    `_name`,
    `_recipe_description`,
    NOW(),
    `_user_id`,
    `_creator_username`,
    `_header_image`,
    `_protein`,
    `_carbs`,
    `_fat`,
    `_fiber`,
    `_calories`,
    `_servings`,
    `_vegetarian`,
    `_vegan`,
    `_cooking_time`
);

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `addSteps` (IN `_recipe_id` INT, IN `_description` VARCHAR(255), IN `_time` INT)
BEGIN

INSERT INTO `recipe_steps_table` (`recipe_id`, `description`, `time`)
VALUES(`_recipe_id`, `_description`, `_time`);

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `addIngredients` (IN `_ingredient_id` VARCHAR(255), IN `_recipe_id` INT, IN `_ingredient_name` VARCHAR(255), IN `_category` VARCHAR(50))
BEGIN

INSERT INTO `ingredients_table` (`ingredient_id`, `recipe_id`, `ingredient_name`, `category`)
VALUES(`_ingredient_id`, `_recipe_id`, `_ingredient_name`, `_category`);

END$$

DELIMITER ;