USE `umami_db`;

DROP procedure IF EXISTS `getUserNotificationToken`;
DROP procedure IF EXISTS `upsertUserNotificationToken`;

DELIMITER $$

CREATE PROCEDURE `getUserNotificationToken` (
    IN `_user_id` VARCHAR(50)
)

BEGIN

SELECT * FROM `notification_token_table` WHERE `user_id` = _user_id;

END$$


DELIMITER ;

DELIMITER $$

CREATE PROCEDURE `upsertUserNotificationToken` (
    IN `_user_id` VARCHAR(50),
    IN `_notification_token` VARCHAR(255)
) BEGIN 
REPLACE INTO `notification_token_table` (
    `notification_token` 
    `user_id` 
    `created_at`
    `updated_at`
)
VALUES (
    `_notification_token`,
    `_user_id`
    NOW(),
    NOW(),
);

END$$


DELIMITER ;
