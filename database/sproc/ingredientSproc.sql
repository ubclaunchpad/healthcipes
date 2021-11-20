USE `umami_db`;

DROP procedure IF EXISTS `createIngredientInfo`;
DROP procedure IF EXISTS `getIngredientsKeyWordSearch`;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `createIngredientInfo` (
    IN `_ingredient_name` VARCHAR(255),
    IN `_category` VARCHAR(255),
    IN `_image` VARCHAR(255),
    IN `_protein` INT,
    IN `_carbs` INT,
    IN `_fat` INT,
    IN `_fiber` INT,
    IN `_calories` INT
)
BEGIN INSERT INTO `ingredients_info_table` (`ingredient_name`,`category`,`image`,`protein`,`carbs`,`fat`,`fiber`, `calories`)
VALUES (`_ingredient_name`,`_category`,`_image`,`_protein`,`_carbs`,`_fat`,`_fiber`,`_calories`);

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getAllIngredients` ()
BEGIN 
SELECT * FROM `ingredients_info_table`; 

END$$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `getIngredientsKeyWordSearch` (IN `_keyword` VARCHAR(50))
BEGIN 

SELECT * FROM `ingredients_info_table` WHERE ingredient_name LIKE CONCAT('%', _keyword , '%') ;

END$$

DELIMITER ;
