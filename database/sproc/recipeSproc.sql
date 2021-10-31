USE `umami_db`;

DROP procedure IF EXISTS `getRecipe`;
DROP procedure IF EXISTS `updateRecipeMacros`;
DROP procedure IF EXISTS `getIngredientInfo`;
DROP procedure IF EXISTS `addMockRecipe`;
DROP procedure IF EXISTS `addMockMissingMacroRecipe`;
DROP procedure IF EXISTS `addMockSteps`;
DROP procedure IF EXISTS `addMockIngredients`;
DROP procedure IF EXISTS `addMockIngredientsInfo`;


DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getRecipe` (IN `_recipe_id` INT)
BEGIN

SELECT r.recipe_id, r.name, r.user_id, r.protein, r.carbs, r.fat, r.fiber,
r.calories, r.servings, r.vegetarian, r.vegan, r.cooking_time,
rs.step_id, rs.description, rs.time,
i.ingredient_id, i.ingredient_name, i.category
FROM `recipes_table` r
JOIN `recipe_steps_table` rs ON r.recipe_id = rs.recipe_id
JOIN `ingredients_table` i ON r.recipe_id = i.recipe_id
WHERE r.recipe_id = `_recipe_id`
;

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `updateRecipeMacros` (
    IN `_recipe_id` INT,
    IN `_protein` INT,
    IN `_carbs` INT,
    IN `_fat` INT,
    IN `_fiber` INT,
    IN `_calories` INT
)
BEGIN

UPDATE `recipes_table`
SET `protein` = `_protein`, `carbs` = `_carbs`, `fat` = `_fat`, `fiber` = `_fiber`, `calories` = `_calories`
WHERE `recipe_id` = `_recipe_id`
;

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `getIngredientInfo` (IN `_ingredient_id` INT)
BEGIN

SELECT * FROM `ingredients_info_table`
WHERE `ingredient_id` = `_ingredient_id`;

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `addMockUser` ()
BEGIN

INSERT INTO `users_table` (
    `user_id`,
    `username`,
    `first_name`,
    `last_name`,
    `email`,
    `location`,
    `profile_picture`,
    `recipe_driven`
) VALUES(
    'abc',
    'thenotsohipmillenialchef',
    'karen',
    'white',
    'karenwhite@yahoo.com',
    'Shaughnessy',
    '',
    0
);

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `addMockRecipe` ()
BEGIN

INSERT INTO `recipes_table` (
    `name`,
    `user_id`,
    `protein`,
    `carbs`,
    `fat`,
    `fiber`,
    `calories`,
    `servings`,
    `vegetarian`,
    `vegan`,
    `cooking_time`
) VALUES(
    'scrambled eggs',
    'abc',
    10,
    1,
    5,
    0,
    300,
    1,
    1,
    0,
    5
);

END$$

DELIMITER ;

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `addMockMissingMacroRecipe` ()
BEGIN

INSERT INTO `recipes_table` (
    `name`,
    `user_id`,
    `protein`,
    `carbs`,
    `fat`,
    `fiber`,
    `calories`,
    `servings`,
    `vegetarian`,
    `vegan`,
    `cooking_time`
) VALUES(
    'scrambled eggs',
    'abc',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    1,
    1,
    0,
    5
);

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

DELIMITER $$
USE `umami_db`$$
CREATE PROCEDURE `addMockIngredientsInfo` ()
BEGIN

INSERT INTO `ingredients_info_table` (`recipe_id`, `ingredient_name`, `category`, `protein`, `carbs`, `fat`, `fiber`, `calories`)
VALUES(1, '2 eggs', 'alternative protein', 10, 0, 5, 0, 300);

INSERT INTO `ingredients_info_table` (`recipe_id`, `ingredient_name`, `category`, `protein`, `carbs`, `fat`, `fiber`, `calories`)
VALUES(1, 'pinch of salt', 'seasoning', 0, 0, 0, 0, 0);

INSERT INTO `ingredients_info_table` (`recipe_id`, `ingredient_name`, `category`, `protein`, `carbs`, `fat`, `fiber`, `calories`)
VALUES(1, 'pinch of pepper', 'seasoning', 0, 0, 0, 0, 0);

INSERT INTO `ingredients_info_table` (`recipe_id`, `ingredient_name`, `category`, `protein`, `carbs`, `fat`, `fiber`, `calories`)
VALUES(1, 'pinch of crushed red pepper', 'seasoning', 0, 0, 0, 0, 2);

END$$

DELIMITER ;