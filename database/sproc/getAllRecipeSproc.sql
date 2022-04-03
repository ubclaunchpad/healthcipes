USE `umami_db`;

DROP procedure IF EXISTS `getAllRecipes`;
DROP procedure IF EXISTS `getRecipePage`;
DROP procedure IF EXISTS `getRecipePageDriven`;
DROP procedure IF EXISTS `getFeaturedRecipes`;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getAllRecipes` ()
BEGIN

SELECT * FROM `recipes_table`
ORDER BY `created_time` DESC;

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getRecipePage` (IN `start_index` INT(8), IN `numOnPage` INT(8))
BEGIN

SELECT * FROM `recipes_table`
ORDER BY `created_time` DESC
LIMIT `start_index`, `numOnPage`;

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getRecipePageDriven` (IN `start_index` INT(8), IN `numOnPage` INT(8), IN `user` VARCHAR(50))
BEGIN

SELECT * FROM `recipes_table` as r
LEFT JOIN
    (SELECT rt.recipe_id, MIN(ing.c) as cou
    FROM `recipes_table` as rt
    LEFT JOIN 
        (SELECT * FROM `ingredients_table` as i
        LEFT JOIN
            (SELECT ingredient_id as iid, COUNT(`ingredient_id`) as c FROM `pantry_table` WHERE `user_id` = `user` GROUP BY `pantry_id`) as pt
            ON i.ingredient_id = pt.iid
        ) as ing
        ON rt.recipe_id = ing.recipe_id
    GROUP BY rt.recipe_id) as pr
    ON r.recipe_id = pr.recipe_id
WHERE pr.cou > 0
ORDER BY r.created_time DESC
LIMIT `start_index`, `numOnPage`;

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getFeaturedRecipes` ()
BEGIN

SELECT r.*, ranking.cnt FROM `recipes_table` as r
INNER JOIN 
(SELECT COUNT(recipe_view_id) as cnt, recipe_view_id
FROM `user_activity_table` 
WHERE activity_type = 'RECIPE_VIEW'
GROUP BY recipe_view_id
ORDER BY COUNT(recipe_view_id) DESC
LIMIT 10) as ranking
ON ranking.recipe_view_id = r.recipe_id
ORDER BY ranking.cnt DESC;

END$$

DELIMITER ;
