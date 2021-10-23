USE `umami_db`;

DROP procedure IF EXISTS `postRecipe`;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `postRecipe` (IN `_recipe_id` INT, IN `_name` VARCHAR(50), IN `_created_time` DATETIME, IN `_user_id` VARCHAR(50), IN `_protein` INT, IN `_carbs` INT, IN `_calories` INT, IN `_servings` INT, IN `_vegetarian` BOOLEAN, IN `_vegan` BOOLEAN, IN `_cooking_time` INT)
BEGIN

REPLACE INTO `recipes_table` (`recipe_id`, `name`, `created_time`, `user_id`, `protein`, `carbs`, `calories`, `servings`, `vegetarian`, `vegan`, `cooking_time`)
VALUES (`_recipe_id`, `_name`, `_created_time`, `_user_id`, `_protein`, `_carbs`, `_calories`, `_servings`, `_vegetarian`, `_vegan`, `_cooking_time`)

END$$
