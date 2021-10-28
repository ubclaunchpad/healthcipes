USE `umami_db`;

DROP procedure IF EXISTS `postRecipe`;
DROP procedure IF EXISTS `getRecipe`;


DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `postRecipe` (IN `_recipe_id` INT, IN `_name` VARCHAR(50), `_created_time` DATETIME, `_user_id` VARCHAR(50), `_protein` INT, `_carbs` INT, `_calories` INT, `_servings` INT,`_vegetarian` BOOLEAN,`_vegan` BOOLEAN,`_cooking_time` INT)
BEGIN

REPLACE INTO `recipes_table` (`recipe_id`, `name`, `created_time`, `user_id`, `protein`, `carbs`, `calories`, `servings`, `vegetarian`, `vegtan`, `cooking_time`)
VALUES (`_recipe_id`, `name`, `_created_time`, `_user_id`, `_protein`, `_carbs`, `_calories`, `_servings`, `_vegetarian`, `_vegan`, `_cooking_time`);

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getRecipe` (IN `_recipe_id` VARCHAR(50))
BEGIN

SELECT * FROM `recipes_table`
WHERE `recipes_id` = `_recipes_id`;

END$$

DELIMITER ;