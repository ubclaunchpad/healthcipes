USE `umami_db`;

DROP procedure IF EXISTS `createRecipe`;
DROP procedure IF EXISTS `createRecipeAutoID`;
DROP procedure IF EXISTS `addSteps`;
DROP procedure IF EXISTS `addIngredients`;
DROP procedure IF EXISTS `getRecipe`;
DROP procedure IF EXISTS `deleteRecipe`;
DROP procedure IF EXISTS `softDeleteRecipe`;
DROP procedure IF EXISTS `updateRecipeMacros`;
DROP procedure IF EXISTS `getIngredientInfo`;


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
WHERE r.recipe_id = `_recipe_id`;

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getCreatedRecipeById` (IN `_user_id` VARCHAR(255))
BEGIN

SELECT r.*
FROM `recipes_table` r
WHERE r.user_id = `_user_id`
ORDER BY `created_time` DESC;

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `deleteRecipe` (IN `_recipe_id` VARCHAR(255))
BEGIN

DELETE FROM `user_activity_table`
WHERE recipe_view_id = `_recipe_id` OR recipe_like_id = `_recipe_id`;

DELETE FROM `ingredients_table`
WHERE `recipe_id` = `_recipe_id`;

DELETE FROM `recipe_steps_table`
WHERE `recipe_id` = `_recipe_id`;

DELETE FROM `recipes_table`
WHERE recipe_id = `_recipe_id`;

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `softDeleteRecipe` (IN `_recipe_id` VARCHAR(255))
BEGIN

DELETE FROM `ingredients_table`
WHERE `recipe_id` = `_recipe_id`;

DELETE FROM `recipe_steps_table`
WHERE `recipe_id` = `_recipe_id`;

DELETE FROM `recipes_table`
WHERE recipe_id = `_recipe_id`;

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
    IN `_pescatarian` BOOLEAN,
    IN `_gluten_free` BOOLEAN,
    IN `_dairy_free` BOOLEAN,
    IN `_keto` BOOLEAN,
    IN `_paleo` BOOLEAN,
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
    `pescatarian`,
    `gluten_free`,
    `dairy_free`,
    `keto`,
    `paleo`,
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
    `_pescatarian`,
    `_gluten_free`,
    `_dairy_free`,
    `_keto`,
    `_paleo`,
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
    IN `_pescatarian` BOOLEAN,
    IN `_gluten_free` BOOLEAN,
    IN `_dairy_free` BOOLEAN,
    IN `_keto` BOOLEAN,
    IN `_paleo` BOOLEAN,
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
    `pescatarian`,
    `gluten_free`,
    `dairy_free`,
    `keto`,
    `paleo`,
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
    `_pescatarian`,
    `_gluten_free`,
    `_dairy_free`,
    `_keto`,
    `_paleo`,
    `_cooking_time`
);

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `addSteps` (IN `_recipe_id` INT, IN `_description` VARCHAR(255), IN `_time` INT, IN `_header_image` VARCHAR(255))
BEGIN

INSERT INTO `recipe_steps_table` (`recipe_id`, `description`, `time`, `header_image`)
VALUES(`_recipe_id`, `_description`, `_time`, `_header_image`);

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `addIngredients` (IN `_ingredient_id` VARCHAR(255), IN `_recipe_id` INT, IN `_step_id` INT, IN `_ingredient_name` VARCHAR(255), IN `_category` VARCHAR(50))
BEGIN

INSERT INTO `ingredients_table` (`ingredient_id`, `recipe_id`, `step_id`, `ingredient_name`, `category`)
VALUES(`_ingredient_id`, `_recipe_id`, `_step_id`, `_ingredient_name`, `_category`);

END$$

DELIMITER ;