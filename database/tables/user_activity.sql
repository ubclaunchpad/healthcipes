USE `umami_db`;
DROP procedure IF EXISTS `createUserActivityTable`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `user_activity_table`;
SET FOREIGN_KEY_CHECKS = 1;

DELIMITER $$

USE `umami_db`$$
CREATE PROCEDURE `createUserActivityTable` ()
BEGIN

CREATE TABLE `user_activity_table` (
  `user_activity_id` INT NOT NULL auto_increment,
  `user_id` VARCHAR(50) NOT NULL,
  `activity_type` ENUM('RECIPE_LIKE', 'USER_FOLLOW', 'RECIPE_VIEW'),
  `date_created` DATETIME,
  `user_follow_id` VARCHAR(50),
  `recipe_like_id` INT,
  `recipe_view_id` INT,

  PRIMARY KEY (`user_activity_id`),
  CONSTRAINT fk_user_follow_id FOREIGN KEY (`user_follow_id`)
  REFERENCES `users_table`(`user_id`),
  CONSTRAINT fk_recipe_like_id FOREIGN KEY (`recipe_like_id`)
  REFERENCES `recipes_table`(`recipe_id`),
  CONSTRAINT fk_recipe_view_id FOREIGN KEY (`recipe_view_id`)
  REFERENCES `recipes_table`(`recipe_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

END$$

DELIMITER ;
