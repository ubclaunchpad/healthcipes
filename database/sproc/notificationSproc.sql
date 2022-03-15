USE `umami_db`;

DROP procedure IF EXISTS `getUserNotification`;

DELIMITER $$ 

CREATE PROCEDURE `getUserNotifications` (
    IN `_user_id` VARCHAR(50)
) BEGIN 

SELECT user_activity.*, recipes.name, users.username
FROM `user_activity_table` as user_activity
INNER JOIN 
    (SELECT * FROM `recipes_table` WHERE `user_id` = `_user_id`) as recipes
    ON user_activity.recipe_like_id = recipes.recipe_id
INNER JOIN 
    (SELECT * FROM `users_table` WHERE `user_id` = `_user_id`) as users
    ON user_activity.user_id = users.user_id
ORDER BY user_activity.date_created DESC
LIMIT 30;

END $$

DELIMITER ;
