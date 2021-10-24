USE `umami_db`;

DROP procedure IF EXISTS `postUser`;
DROP procedure IF EXISTS `getUser`;
DROP procedure IF EXISTS `updateUser`;


DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `postUser` (IN `_user_id` VARCHAR(50), IN `_username` VARCHAR(50), IN `_first_name` VARCHAR(50), IN `_last_name` VARCHAR(50), IN `_email` VARCHAR(50), IN `_location` VARCHAR(50), IN `_profile_picture` VARCHAR(50), IN `_recipe_driven` BOOLEAN)
BEGIN

REPLACE INTO `users_table` (`user_id`, `username`, `first_name`, `last_name`, `email`, `location`, `profile_picture`, `recipe_driven`)
VALUES (`_user_id`, `_username`, `_first_name`, `_last_name`, `_email`, `_location`, `_profile_picture`, `_recipe_driven`);

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `updateUser` (IN `_user_id` VARCHAR(50), IN `_first_name` VARCHAR(50), IN `_last_name` VARCHAR(50), IN `_location` VARCHAR(50), IN `_profile_picture` VARCHAR(50), IN `_recipe_driven` BOOLEAN)
BEGIN

UPDATE `users_table` 
SET 
    `first_name`=`_first_name`,
    `last_name`=`_last_name`,
    `location`=`_location`,
    `profile_picture`=`_profile_picture`,
    `recipe_driven`=`_recipe_driven`
WHERE `user_id`=`_user_id`;

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getUser` (IN `_user_id` VARCHAR(50))
BEGIN

SELECT * FROM `users_table`
WHERE `user_id` = `_user_id`;

END$$

DELIMITER ;