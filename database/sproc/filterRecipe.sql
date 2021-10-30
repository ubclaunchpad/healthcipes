USE `umami_db`;

DROP procedure IF EXISTS `filterRecipeVegetarian`;
DROP procedure IF EXISTS `filterRecipeVegan`;

DELIMITER $$

CREATE PROCEDURE `filterRecipeVegetarian` (IN `_vegetarian` BOOLEAN)
BEGIN

SELECT * FROM `recipes_table` 
WHERE vegetarian = _vegetarian;

END$$

CREATE PROCEDURE `filterRecipeVegan` (IN `_vegan` BOOLEAN)
BEGIN

SELECT * FROM `recipes_table` 
WHERE vegan = _vegan;

END$$

DELIMITER ;
