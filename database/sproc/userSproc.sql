USE `umami_db`;

DROP procedure IF EXISTS `postUser`;

DROP procedure IF EXISTS `getUser`;

DROP procedure IF EXISTS `updateUser`;

DELIMITER $$ 

CREATE PROCEDURE `postUser` (
    IN `_user_id` VARCHAR(50),
    IN `_username` VARCHAR(50),
    IN `_first_name` VARCHAR(50),
    IN `_last_name` VARCHAR(50),
    IN `_email` VARCHAR(50),
    IN `_location` VARCHAR(50),
    IN `_profile_picture` VARCHAR(255),
    IN `_recipe_driven` BOOLEAN,
    IN `_vegetarian` BOOLEAN,
    IN `_vegan` BOOLEAN,
    IN `_pescatarian` BOOLEAN,
    IN `_gluten_free` BOOLEAN,
    IN `_dairy_free` BOOLEAN,
    IN `_keto` BOOLEAN,
    IN `_paleo` BOOLEAN,
    IN `_style` VARCHAR(50),
    IN `_experience` DECIMAL(10, 5)
) BEGIN REPLACE INTO `users_table` (
    `user_id`,
    `username`,
    `first_name`,
    `last_name`,
    `email`,
    `location`,
    `profile_picture`,
    `recipe_driven`,
    `vegetarian`,
    `vegan`,
    `pescatarian`,
    `gluten_free`,
    `dairy_free`,
    `keto`,
    `paleo`,
    `style`,
    `experience`
)
VALUES
    (
        `_user_id`,
        `_username`,
        `_first_name`,
        `_last_name`,
        `_email`,
        `_location`,
        `_profile_picture`,
        `_recipe_driven`,
        `_vegetarian`,
        `_vegan`,
        `_pescatarian`,
        `_gluten_free`,
        `_dairy_free`,
        `_keto`,
        `_paleo`,
        `_style`,
        `_experience`
    );

END $$ 

CREATE PROCEDURE `updateUser` (
    IN `_user_id` VARCHAR(50),
    IN `_first_name` VARCHAR(50),
    IN `_last_name` VARCHAR(50),
    IN `_location` VARCHAR(50),
    IN `_profile_picture` VARCHAR(255),
    IN `_recipe_driven` BOOLEAN,
    IN `_vegetarian` BOOLEAN,
    IN `_vegan` BOOLEAN,
    IN `_pescatarian` BOOLEAN,
    IN `_gluten_free` BOOLEAN,
    IN `_dairy_free` BOOLEAN,
    IN `_keto` BOOLEAN,
    IN `_paleo` BOOLEAN,
    IN `_style` VARCHAR(50),
    IN `_experience` DECIMAL(10, 5)
) BEGIN
UPDATE
    `users_table`
SET
    `first_name` = `_first_name`,
    `last_name` = `_last_name`,
    `location` = `_location`,
    `profile_picture` = `_profile_picture`,
    `recipe_driven` = `_recipe_driven`,
    `vegetarian` = `_vegetarian`,
    `vegan` = `_vegan`,
    `pescatarian` = `_pescatarian`,
    `gluten_free` = `_gluten_free`,
    `dairy_free` = `_dairy_free`,
    `keto` = `_keto`,
    `paleo` = `_paleo`,
    `style` = `_style`,
    `experience` = `_experience`
WHERE
    `user_id` = `_user_id`;

END $$ 

CREATE PROCEDURE `getUser` (IN `_user_id` VARCHAR(50)) BEGIN
SELECT
    *
FROM
    `users_table`
WHERE
    `user_id` = `_user_id`;

END $$ 

DELIMITER ;