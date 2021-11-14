# Mock_Data
CALL umami_db.postUser('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'harinwu', 'Harin', 'Wu', 'harinwu99@gmail.com', 'Vancouver', '', 1, 0, 0, 0, 0, 0, 0, 0, 'ANY', 0.5);
CALL umami_db.postUser('G7YXRqIBU1QKLCXQnox8Wxwl2VN2', 'kayett', 'Kaye', 'T', 'kaye.thinh.to@gmail.com', 'Vancouver', '', 1, 0, 0, 0, 0, 0, 0, 0, 'ANY', 0.5);

CALL umami_db.addMockUser();
CALL umami_db.addMockRecipe();
CALL umami_db.addMockSteps();
CALL umami_db.addMockIngredients();
CALL umami_db.addMockIngredientsInfo();

CALL umami_db.createRecipe(2, 'Butter Chicken', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'gs://umami-2021.appspot.com/Recipes/Butter Chicken.jpeg', 20, 10, 5, 2, 600, 3, 0, 0, 20);
CALL umami_db.createRecipe(3, 'Teriyaki Chicken', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'gs://umami-2021.appspot.com/Recipes/Teriyaki Chicken.jpeg', 20, 10, 5, 2, 600, 3, 0, 0, 20);
CALL umami_db.createRecipe(4, 'Fried Chicken', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'gs://umami-2021.appspot.com/Recipes/Fried Chicken.jpeg', 20, 10, 5, 2, 600, 3, 0, 0, 20);
CALL umami_db.createRecipe(5, 'Roasted Chicken', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'gs://umami-2021.appspot.com/Recipes/Roasted Chicken.jpeg', 20, 10, 5, 2, 600, 3, 0, 0, 20);
CALL umami_db.createRecipe(6, 'Spicy Chicken', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'gs://umami-2021.appspot.com/Recipes/Spicy Chicken.jpeg', 20, 10, 5, 2, 600, 3, 0, 0, 20);
CALL umami_db.createRecipe(7, 'Sweet & Sour Chicken', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'gs://umami-2021.appspot.com/Recipes/Sweet & Sour Chicken.jpeg', 20, 10, 5, 2, 600, 3, 0, 0, 20);
CALL umami_db.createRecipe(8, 'Beef Curry', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'gs://umami-2021.appspot.com/Recipes/Beef Curry.jpeg', 20, 10, 5, 2, 600, 3, 0, 0, 20);
CALL umami_db.createRecipe(9, 'Pineapple Gelato', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'gs://umami-2021.appspot.com/Recipes/Pineapple Gelato.jpeg', 20, 10, 5, 2, 600, 3, 1, 1, 20);
CALL umami_db.createRecipe(10, 'Kebabs', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'gs://umami-2021.appspot.com/Recipes/Kebabs.jpeg', 20, 10, 5, 2, 600, 3, 0, 0, 20);
CALL umami_db.createRecipe(11, 'Fried Rice', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'gs://umami-2021.appspot.com/Recipes/Fried Rice.jpeg', 20, 10, 5, 2, 600, 3, 1, 1, 20);

CALL umami_db.postUserActivity('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'RECIPE_VIEW', NULL, NULL, 3);
CALL umami_db.postUserActivity('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'RECIPE_VIEW', NULL, NULL, 3);
CALL umami_db.postUserActivity('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'RECIPE_VIEW', NULL, NULL, 3);
CALL umami_db.postUserActivity('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'RECIPE_VIEW', NULL, NULL, 4);
CALL umami_db.postUserActivity('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'RECIPE_VIEW', NULL, NULL, 5);
CALL umami_db.postUserActivity('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'RECIPE_VIEW', NULL, NULL, 6);
CALL umami_db.postUserActivity('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'RECIPE_VIEW', NULL, NULL, 7);
CALL umami_db.postUserActivity('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'RECIPE_VIEW', NULL, NULL, 8);
CALL umami_db.postUserActivity('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'RECIPE_VIEW', NULL, NULL, 9);
CALL umami_db.postUserActivity('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'RECIPE_VIEW', NULL, NULL, 10);
CALL umami_db.postUserActivity('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'RECIPE_VIEW', NULL, NULL, 11);
CALL umami_db.postUserActivity('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'RECIPE_VIEW', NULL, NULL, 3);
CALL umami_db.postUserActivity('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'RECIPE_VIEW', NULL, NULL, 2);
CALL umami_db.postUserActivity('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'RECIPE_VIEW', NULL, NULL, 4);
CALL umami_db.postUserActivity('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'RECIPE_VIEW', NULL, NULL, 3);
CALL umami_db.postUserActivity('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'RECIPE_VIEW', NULL, NULL, 2);

CALL umami_db.createIngredientInfo('Milk', 'Dairy', '', 0, 0, 0, 0, 2);
CALL umami_db.createIngredientInfo('Butter', 'Dairy', '', 0, 0, 0, 0, 2);
CALL umami_db.createIngredientInfo('Cheese', 'Dairy', '', 0, 0, 0, 0, 2);
CALL umami_db.createIngredientInfo('Orange', 'Fruits and Vegetables', '', 0, 0, 0, 0, 2);
CALL umami_db.createIngredientInfo('Banana', 'Fruits and Vegetables', '', 0, 0, 0, 0, 2);
CALL umami_db.createIngredientInfo('Strawberry', 'Fruits and Vegetables', '', 0, 0, 0, 0, 2);
CALL umami_db.createIngredientInfo('Chicken Breast', 'Meat and Fish', '', 0, 0, 0, 0, 2);
CALL umami_db.createIngredientInfo('Salmon', 'Meat and Fish', '', 0, 0, 0, 0, 2);
CALL umami_db.createIngredientInfo('Pepper', 'Seasoning', '', 0, 0, 0, 0, 2);
CALL umami_db.createIngredientInfo('Soy Sauce', 'Seasoning', '', 0, 0, 0, 0, 2);

CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 1);
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 2);
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 3);
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 4);
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 5);
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 6);
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 7);
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 8);
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 9);
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 10);
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 11);
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 12);
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 13);
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 14);
