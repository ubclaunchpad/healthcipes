USE `umami_db`;
DROP procedure IF EXISTS `createRecipesTable`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `recipes_table`;
SET FOREIGN_KEY_CHECKS = 1;

DELIMITER $$

USE `umami_db`$$
CREATE PROCEDURE `createRecipesTable` ()
BEGIN

CREATE TABLE `recipes_table` (
  `recipe_id` INT NOT NULL auto_increment,
  `name` VARCHAR(50),
  `recipe_description` VARCHAR(255),
  `created_time` DATETIME,
  `user_id` VARCHAR(50) NOT NULL,
  `creator_username` VARCHAR(50),
  `header_image` VARCHAR(255),
  `protein` INT,
  `carbs` INT,
  `fat` INT,
  `fiber` INT,
  `calories` INT,
  `servings` INT,
  `vegetarian` BOOLEAN,
  `vegan` BOOLEAN,
  `pescatarian` BOOLEAN,
  `gluten_free` BOOLEAN,
  `dairy_free` BOOLEAN,
  `keto` BOOLEAN,
  `paleo` BOOLEAN,
  `cooking_time` INT,
  PRIMARY KEY (`recipe_id`),
  CONSTRAINT fk_user_recipe FOREIGN KEY (`user_id`)
  REFERENCES `users_table`(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

END$$

DELIMITER ;