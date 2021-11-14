USE `umami_db`;

DROP procedure IF EXISTS `postPantry`;
DROP procedure IF EXISTS `getPantry`;
DROP procedure IF EXISTS `getPantryByUser`;

DELIMITER $$ 

CREATE PROCEDURE `postPantry` (
    IN `_user_id` VARCHAR(50),
    IN `_ingredient_id` INT
) BEGIN 
REPLACE INTO `pantry_table` (`user_id`,`ingredient_id`)
VALUES (`_user_id`,`_ingredient_id`);

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


DELIMITER $$ 

CREATE PROCEDURE `getPantryByUser` (
    IN `_user_id` VARCHAR(50)
) BEGIN 

SELECT info.*, pantry.pantry_id FROM `ingredients_info_table` as info
INNER JOIN
(SELECT * FROM `pantry_table` 
WHERE `user_id` = `_user_id`) as pantry
ON info.ingredient_id = pantry.ingredient_id;

END $$

DELIMITER ;
