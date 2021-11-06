USE `umami_db`;

DROP procedure IF EXISTS `getUsersUserActivity`;
DROP procedure IF EXISTS `getAllUserActivity`;
DROP procedure IF EXISTS `rankRecipe`;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getUsersUserActivity` (IN `_user_id` VARCHAR(50))
BEGIN

SELECT * 
FROM `user_activity_table` ua
WHERE ua.user_id = _user_id
;

END$$

DELIMITER ;


DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getAllUserActivity` ()
BEGIN

SELECT * 
FROM `user_activity_table` ua
;

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `rankRecipe` (IN `_activity_type` VARCHAR(50))
BEGIN

SELECT * 
FROM `user_activity_table` ua 
WHERE ua.activity_type = _activity_type
;

END$$

DELIMITER ;
