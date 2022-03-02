USE `umami_db`;

DROP procedure IF EXISTS `getUserNotification`;

DELIMITER $$ 

CREATE PROCEDURE `getUserNotifications` (
    IN `_user_id` VARCHAR(50)
) BEGIN 

SELECT user_activity.* 
FROM `user_activity_table` as user_activity
INNER JOIN 
    (SELECT * FROM `recipes_table` WHERE `user_id` = `_user_id`) as recipes
    ON user_activity.recipe_like_id = recipes.recipe_id
ORDER BY user_activity.date_created DESC;

END $$

DELIMITER ;
