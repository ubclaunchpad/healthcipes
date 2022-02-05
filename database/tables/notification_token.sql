USE `umami_db`;
DROP procedure IF EXISTS `createNotificationTokenTable`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `notification_token_table`;
SET FOREIGN_KEY_CHECKS = 1;

DELIMITER $$

USE `umami_db`$$
CREATE PROCEDURE `createNotificationTokenTable` ()
BEGIN

CREATE TABLE `notification_token_table` (

    `notification_token_id` INT NOT NULL AUTO_INCREMENT,
    `notification_token` VARCHAR(255) NOT NULL,
    `user_id` VARCHAR(50) NOT NULL UNIQUE,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,

    PRIMARY KEY (`notification_token_id`),

    CONSTRAINT fk_notification_token_table_user
        FOREIGN KEY (`user_id`)
        REFERENCES `users_table` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

END$$

DELIMITER ;
