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
  `activity_type` ENUM(`RECIPE_LIKE`, `USER_FOLLOW`),
  `user_follow_id` VARCHAR(50),
  `recipe_like_id` INT,
  `date` DATETIME,
  PRIMARY KEY (`user_activity_id`),
  CONSTRAINT fk_user_follow_id FOREIGN KEY (`user_id`)
  REFERENCES `users_table`(`user_id`),
  CONSTRAINT recipe_like_id FOREIGN KEY (`recipe_id`)
  REFERENCES `recipes_table`(`recipe_id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

END$$

DELIMITER ;
