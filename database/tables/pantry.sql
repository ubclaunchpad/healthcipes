USE `umami_db`;
DROP procedure IF EXISTS `createPantryTable`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `pantry_table`;
SET FOREIGN_KEY_CHECKS = 1;

DELIMITER $$

USE `umami_db`$$
CREATE PROCEDURE `createPantryTable` ()
BEGIN

CREATE TABLE `pantry_table` (
    `pantry_id` INT NOT NULL auto_increment,
    `user_id` VARCHAR(50) NOT NULL,
    `ingredient_id` INT NOT NULL,
    PRIMARY KEY (`pantry_id`),
    CONSTRAINT fk_user_id FOREIGN KEY (`user_id`)
    REFERENCES `users_table`(`user_id`),
    CONSTRAINT fk_ingredient_id FOREIGN KEY (`ingredient_id`)
    REFERENCES `ingredients_info_table`(`ingredient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

END$$

DELIMITER ;