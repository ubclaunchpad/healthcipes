USE `umami_db`;

DROP procedure IF EXISTS `getAllRecipes`;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getAllRecipes` ()
BEGIN

SELECT * FROM `recipes_table`;

END$$

DELIMITER ;
