USE `umami_db`;

DROP procedure IF EXISTS `getRecipe`;
DROP procedure IF EXISTS `addMockRecipes`;
DROP procedure IF EXISTS `addMockSteps`;
DROP procedure IF EXISTS `addMockIngredients`;


DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getRecipe` (IN `_recipe_id` INT)
BEGIN

SELECT r.recipe_id, r.name, r.user_id, r.protein, r.carbs, r.calories, r.servings, r.vegetarian,
r.vegan, r.cooking_time, rs.step_id, rs.description, rs.time, i.ingredient_id, i.ingredient_name, i.category
FROM `recipes_table` r
JOIN `recipe_steps_table` rs ON r.recipe_id = rs.recipe_id
JOIN `ingredients_table` i ON r.recipe_id = i.recipe_id
WHERE r.recipe_id = `_recipe_id`
;

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `addMockUser` ()
BEGIN

INSERT INTO `users_table` (`user_id`, `username`, `first_name`, `last_name`, `email`, `location`, `profile_picture`, `recipe_driven`)
VALUES('abc', 'thenotsohipmillenialchef', 'karen', 'white', 'karenwhite@yahoo.com', 'Shaughnessy', '', 0);

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `addMockRecipes` ()
BEGIN

INSERT INTO `recipes_table` (`name`, `user_id`, `protein`, `carbs`, `calories`, `servings`, `vegetarian`, `vegan`, `cooking_time`)
VALUES('scrambled eggs', 'abc', 10, 1, 300, 1, 1, 0, 5);

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `addMockSteps` ()
BEGIN

INSERT INTO `recipe_steps_table` (`recipe_id`, `description`, `time`)
VALUES(1, 'crack two eggs into a small bowl', NULL);

INSERT INTO `recipe_steps_table` (`recipe_id`, `description`, `time`)
VALUES(1, 'add salt, pepper, and crushed red pepper', NULL);

INSERT INTO `recipe_steps_table` (`recipe_id`, `description`, `time`)
VALUES(1, 'cook in small pan on medium heat, stirring occassionally', 5);

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `addMockIngredients` ()
BEGIN

INSERT INTO `ingredients_table` (`recipe_id`, `ingredient_name`, `category`)
VALUES(1, '2 eggs', 'alternative protein');

INSERT INTO `ingredients_table` (`recipe_id`, `ingredient_name`, `category`)
VALUES(1, 'pinch of salt', 'seasoning');

INSERT INTO `ingredients_table` (`recipe_id`, `ingredient_name`, `category`)
VALUES(1, 'pinch of pepper', 'seasoning');

INSERT INTO `ingredients_table` (`recipe_id`, `ingredient_name`, `category`)
VALUES(1, 'pinch of crushed red pepper', 'seasoning');

END$$

DELIMITER ;