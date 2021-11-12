USE `umami_db`;

DROP procedure IF EXISTS `postPantry`;
DROP procedure IF EXISTS `getPantry`;

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


DELIMITER $$ 

CREATE PROCEDURE `getPantry` (
    IN `_pantry_id` INT
) BEGIN 

SELECT * FROM `pantry_table` 
WHERE `pantry_id` = `_pantry_id`;

END $$

DELIMITER ;
