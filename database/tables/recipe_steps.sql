USE `umami_db`;
DROP procedure IF EXISTS `createRecipeStepsTable`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `recipe_steps_table`;
SET FOREIGN_KEY_CHECKS = 1;

DELIMITER $$

USE `umami_db`$$
CREATE PROCEDURE `createRecipeStepsTable` ()
BEGIN

CREATE TABLE `recipe_steps_table` (
  `step_id` INT NOT NULL auto_increment,
  `recipe_id` INT NOT NULL,
  `description` VARCHAR(255),
  `time` INT,
  PRIMARY KEY (`step_id`),
  CONSTRAINT fk_recipe_recipe_steps FOREIGN KEY (`recipe_id`)
  REFERENCES `recipes_table`(`recipe_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

END$$

DELIMITER ;