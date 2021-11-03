USE `umami_db`;

DROP procedure IF EXISTS `getAllUserActivity`;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getAllUserActivity` ()
BEGIN

SELECT * FROM `user_activity_table`;

END$$

DELIMITER ;
