USE `umami_db`;
DROP procedure IF EXISTS `createIngredientsInfoTable`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `ingredients_info_table`;
SET FOREIGN_KEY_CHECKS = 1;

DELIMITER $$

USE `umami_db`$$
CREATE PROCEDURE `createIngredientsInfoTable` ()
BEGIN

CREATE TABLE `ingredients_info_table` (
  `ingredient_id` INT NOT NULL auto_increment,
  `ingredient_name` VARCHAR(255),
  `category` VARCHAR(255),
  `image` VARCHAR(255),
  `protein` INT,
  `carbs` INT,
  `fat` INT,
  `fiber` INT,
  `calories` INT,
  PRIMARY KEY (`ingredient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

END$$

DELIMITER ;