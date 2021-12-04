USE `umami_db`;

DROP procedure IF EXISTS `postGroceryList`;
DROP procedure IF EXISTS `deleteGroceryListItem`;
DROP procedure IF EXISTS `getGroceryListByUser`;
DROP procedure IF EXISTS `updateGroceryListObtainedStatus`;

DELIMITER $$ 

CREATE PROCEDURE `postGroceryList` (
    IN `_user_id` VARCHAR(50),
    IN `_ingredient_id` INT
) BEGIN 
REPLACE INTO `grocery_list_table` (`user_id`, `ingredient_id`, `obtained`)
VALUES (`_user_id`,`_ingredient_id`, 0);

END $$

DELIMITER ;

DELIMITER $$ 

CREATE PROCEDURE `deleteGroceryListItem` (
    IN `_grocery_list_item_id` INT,
    IN `_user_id` VARCHAR(50)
) BEGIN 
DELETE FROM `grocery_list_table`
WHERE `grocery_list_item_id` = `_grocery_list_item_id` AND `user_id` = `_user_id`;

END $$

DELIMITER ;


DELIMITER $$ 

CREATE PROCEDURE `getGroceryListByUser` (
    IN `_user_id` VARCHAR(50)
) BEGIN 

SELECT * FROM `grocery_list_table` 
WHERE `user_id` = `_user_id`;

END $$

DELIMITER ;


DELIMITER $$ 

CREATE PROCEDURE `updateGroceryListObtainedStatus` (
    IN `_grocery_list_item_id` INT,
    IN `_user_id` VARCHAR(50),
    IN `_obtained` BOOLEAN
) BEGIN 

UPDATE `grocery_list_table`
SET `obtained` = `_obtained`
WHERE `grocery_list_item_id` = `_grocery_list_item_id` AND `user_id` = `_user_id`;

END $$

DELIMITER ;
