USE `umami_db`;

DROP procedure IF EXISTS `getAllUserActivity`;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getAllUserActivity` (IN `_user_id` VARCHAR(50))
BEGIN

SELECT * 
FROM `user_activity_table` ua
WHERE ua.user_id = _user_id`
;

END$$

DELIMITER ;
