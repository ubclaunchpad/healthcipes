USE `umami_db`;

DROP procedure IF EXISTS `postPantry`;

DELIMITER $$ 

CREATE PROCEDURE `postPantry` (
    IN `_user_id` VARCHAR(50),
    IN `_ingredient_id` INT
) BEGIN REPLACE INTO `pantry_table` (
    `user_id`,
    `ingredient_id`
)
VALUES (
    `_user_id`,
    `_ingredient_id`
);

END $$

DELIMITER ;