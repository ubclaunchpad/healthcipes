USE `umami_db`;

DROP procedure IF EXISTS `filterRecipeVegetarian`;
DROP procedure IF EXISTS `filterRecipeVegan`;
DROP procedure IF EXISTS `filterRecipePescatarian`;
DROP procedure IF EXISTS `filterRecipeDairyFree`;
DROP procedure IF EXISTS `filterRecipeGlutenFree`;
DROP procedure IF EXISTS `filterRecipeKeto`;
DROP procedure IF EXISTS `filterRecipePaleo`;

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

CREATE PROCEDURE `filterRecipePescatarian` (IN `_pescatarian` BOOLEAN)
BEGIN

SELECT * FROM `recipes_table` 
WHERE pescatarian = _pescatarian;

END$$

CREATE PROCEDURE `filterRecipeDairyFree` (IN `_dairy_free` BOOLEAN)
BEGIN

SELECT * FROM `recipes_table` 
WHERE dairy_free = _dairy_free;

END$$

CREATE PROCEDURE `filterRecipeGlutenFree` (IN `_gluten_free` BOOLEAN)
BEGIN

SELECT * FROM `recipes_table` 
WHERE gluten_free = _gluten_free;

END$$

CREATE PROCEDURE `filterRecipeKeto` (IN `_keto` BOOLEAN)
BEGIN

SELECT * FROM `recipes_table` 
WHERE keto = _keto;

END$$

CREATE PROCEDURE `filterRecipePaleo` (IN `_paleo` BOOLEAN)
BEGIN

SELECT * FROM `recipes_table` 
WHERE paleo = _paleo;

END$$

DELIMITER ;
