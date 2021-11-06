USE `umami_db`;
DROP procedure IF EXISTS `createImagesTable`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `images_table`;
SET FOREIGN_KEY_CHECKS = 1;

DELIMITER $$

USE `umami_db`$$
CREATE PROCEDURE `createImagesTable` ()
BEGIN

CREATE TABLE `images_table` (
  `image_id` INT NOT NULL auto_increment,
  `recipe_id` INT NOT NULL,
  `image` VARCHAR(50),
  `date` DATETIME,
  `user_id` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`image_id`),
  CONSTRAINT fk_user_image FOREIGN KEY (`user_id`)
  REFERENCES `users_table`(`user_id`),
  CONSTRAINT fk_recipe_image FOREIGN KEY (`recipe_id`)
  REFERENCES `recipes_table`(`recipe_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

END$$

DELIMITER ;