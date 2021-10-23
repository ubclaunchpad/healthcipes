USE `umami_db`;

DROP procedure IF EXISTS `getRecipeKeywordSearch`;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getRecipeKeywordSearch` (IN `_keyword` VARCHAR(50))
BEGIN

SELECT * FROM `recipes_table` WHERE name LIKE %_keyword% ;

END$$

DELIMITER ;
