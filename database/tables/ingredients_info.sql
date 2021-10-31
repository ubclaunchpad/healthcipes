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
  `recipe_id` INT NOT NULL,
  `ingredient_name` VARCHAR(50),
  `category` VARCHAR(50),
  `protein` INT,
  `carbs` INT,
  `fat` INT,
  `fiber` INT,
  `calories` INT,
  PRIMARY KEY (`ingredient_id`),
  CONSTRAINT fk_recipe_ingredient_info FOREIGN KEY (`recipe_id`)
  REFERENCES `recipes_table`(`recipe_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

END$$

DELIMITER ;