USE `umami_db`;
DROP procedure IF EXISTS `createGroceryListTable`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `grocery_list_table`;
SET FOREIGN_KEY_CHECKS = 1;

DELIMITER $$

USE `umami_db`$$
CREATE PROCEDURE `createGroceryListTable` ()
BEGIN

CREATE TABLE `grocery_list_table` (
    `grocery_list_item_id` INT NOT NULL auto_increment,
    `user_id` VARCHAR(50) NOT NULL,
    `ingredient_id` INT NOT NULL,
    `obtained` BOOLEAN,
    PRIMARY KEY (`grocery_list_item_id`),
    CONSTRAINT fk_grocery_list_user_id FOREIGN KEY (`user_id`)
    REFERENCES `users_table`(`user_id`),
    CONSTRAINT fk_grocery_list_ingredient_id FOREIGN KEY (`ingredient_id`)
    REFERENCES `ingredients_info_table`(`ingredient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

END$$

DELIMITER ;