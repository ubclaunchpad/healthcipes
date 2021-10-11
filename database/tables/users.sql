USE `umami_db`;
DROP procedure IF EXISTS `createUsersTable`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `users_table`;
SET FOREIGN_KEY_CHECKS = 1;

DELIMITER $$

USE `umami_db`$$
CREATE PROCEDURE `createUsersTable` ()
BEGIN

CREATE TABLE `users_table` (
  `user_id` INT NOT NULL auto_increment,
  `first_name` VARCHAR(50),
  `last_name` VARCHAR(50),
  `email` VARCHAR(50),
  `location` VARCHAR(50),
  `profile_picture` MEDIUMBLOB,
  `recipe_driven` BOOLEAN,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

END$$

DELIMITER ;