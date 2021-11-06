USE `umami_db`;

DROP procedure IF EXISTS `postPantry`

DELIMITER $$ 

CREATE PROCEDURE `postPantry` (
    IN `_user_id` VARCHAR(50),
    IN `_username` VARCHAR(50),
) BEGIN REPLACE INTO `pantry_table` (
    `user_id`,
    `username`,
)
VALUES
    (
        `_user_id`,
        `_username`,
    );

END $$

DELIMITER ;