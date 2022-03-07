USE `umami_db`;

DROP procedure IF EXISTS `getUsersUserActivity`;
DROP procedure IF EXISTS `getAllUserActivity`;
DROP procedure IF EXISTS `postUserActivity`;
DROP procedure IF EXISTS `rankRecipeByLike`;
DROP procedure IF EXISTS `rankRecipeByView`;
DROP procedure IF EXISTS `getUsersUserActivitySpecificActivity`;
DROP procedure IF EXISTS `userLikedStatus`;
DROP procedure IF EXISTS `getLikeCount`;
DROP procedure IF EXISTS `deleteUserActivity`;


DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getUsersUserActivity` (IN `_user_id` VARCHAR(50))
BEGIN

SELECT * 
FROM `user_activity_table` ua
WHERE ua.user_id = _user_id
;

END$$

DELIMITER ;


DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `userLikedStatus` (IN `_user_id` VARCHAR(50), IN `_recipe_id` INT)
BEGIN

SELECT * 
FROM `user_activity_table` ua
WHERE ua.user_id = _user_id AND ua.recipe_like_id = _recipe_id AND ua.activity_type = 'RECIPE_LIKE';

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getLikeCount` (IN `_recipe_id` INT)
BEGIN

SELECT COUNT(*)
FROM `user_activity_table` ua
WHERE ua.recipe_like_id = _recipe_id AND ua.activity_type = 'RECIPE_LIKE';

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `deleteUserActivity` (IN `_user_id` VARCHAR(50), IN `_recipe_id` INT)
BEGIN

DELETE FROM `user_activity_table` ua
WHERE ua.user_id = _user_id AND ua.recipe_like_id = _recipe_id AND ua.activity_type = 'RECIPE_LIKE';

END$$

DELIMITER ;


DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getUsersUserActivitySpecificActivity` (
    IN `_user_id` VARCHAR(50),
    IN `_activity_type` ENUM('RECIPE_LIKE', 'USER_FOLLOW', 'RECIPE_VIEW')
)
BEGIN

SELECT r.* FROM `recipes_table` as r
INNER JOIN 
(SELECT *
FROM `user_activity_table` 
WHERE activity_type = 'RECIPE_LIKE' and user_id = _user_id) as li
ON li.recipe_like_id = r.recipe_id
ORDER BY r.created_time DESC;

END$$

DELIMITER ;



DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getAllUserActivity` ()
BEGIN

SELECT * 
FROM `user_activity_table`
;

END$$

DELIMITER ;



DELIMITER $$

CREATE PROCEDURE `postUserActivity` (
    IN `_user_id` VARCHAR(50),
    IN `_activity_type` ENUM('RECIPE_LIKE', 'USER_FOLLOW', 'RECIPE_VIEW'),
    IN `_user_follow_id` VARCHAR(50),
    IN `_recipe_like_id` INT,
    IN `_recipe_view_id` INT
) BEGIN REPLACE INTO `user_activity_table` (
    `user_id`,
    `activity_type`,
    `date_created`,
    `user_follow_id`,
    `recipe_like_id`,
    `recipe_view_id`
)
VALUES (
    `_user_id`,
    `_activity_type`,
    NOW(),
    `_user_follow_id`,
    `_recipe_like_id`,
    `_recipe_view_id`
);


END$$

DELIMITER ;



DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `rankRecipeByLike` ()
BEGIN

SELECT COUNT(recipe_like_id), recipe_like_id
FROM `user_activity_table` 
WHERE activity_type = 'RECIPE_LIKE'
GROUP BY recipe_like_id
ORDER BY COUNT(recipe_like_id) DESC;

END$$

DELIMITER ;



DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `rankRecipeByView` ()
BEGIN

SELECT COUNT(recipe_view_id), recipe_view_id
FROM `user_activity_table` 
WHERE activity_type = 'RECIPE_VIEW'
GROUP BY recipe_view_id
ORDER BY COUNT(recipe_view_id) DESC;

END$$

DELIMITER ;

