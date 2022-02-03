# Mock_Data
CALL umami_db.postUser('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'harinwu', 'Harin', 'Wu', 'harinwu99@gmail.com', 'Vancouver', '', 1, 0, 0, 0, 0, 0, 0, 0, 'ANY', 0.5);
CALL umami_db.postUser('G7YXRqIBU1QKLCXQnox8Wxwl2VN2', 'kayett', 'Kaye', 'T', 'kaye.thinh.to@gmail.com', 'Vancouver', '', 1, 0, 0, 0, 0, 0, 0, 0, 'ANY', 0.5);
CALL umami_db.postUser('gNptOVCpuidg6plzj9ZaRi7brdj1', 'nick', 'Nick', 'K', 'kobenkao@gmail.com', 'Vancouver', '', 0, 0, 0, 0, 0, 0, 0, 0, 'ANY', 0.25);

CALL umami_db.upsertUserNotificationToken('gNptOVCpuidg6plzj9ZaRi7brdj1', 'trial token');

CALL umami_db.addMockUser();
CALL umami_db.addMockRecipe();
CALL umami_db.addMockSteps();
CALL umami_db.addMockIngredientsInfo();
CALL umami_db.addMockIngredients();

CALL umami_db.createRecipe(2, 'Butter Chicken', 'Tasty and savoury butter chicken', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'harinwu', 'gs://umami-2021.appspot.com/Recipes/Butter Chicken.jpeg', 20, 10, 5, 2, 600, 3, 0, 0, 20);
CALL umami_db.createRecipe(3, 'Teriyaki Chicken', 'The BEST teriyaki chicken recipe you will ever try', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'harinwu', 'gs://umami-2021.appspot.com/Recipes/Teriyaki Chicken.jpeg', 20, 10, 5, 2, 600, 3, 0, 0, 20);
CALL umami_db.createRecipe(4, 'Fried Chicken', 'Classic Louisiana-style fried chicken', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'harinwu', 'gs://umami-2021.appspot.com/Recipes/Fried Chicken.jpeg', 20, 10, 5, 2, 600, 3, 0, 0, 20);
CALL umami_db.createRecipe(5, 'Roasted Chicken', 'Who needs Costco anyways?', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'harinwu', 'gs://umami-2021.appspot.com/Recipes/Roasted Chicken.jpeg', 20, 10, 5, 2, 600, 3, 0, 0, 20);
CALL umami_db.createRecipe(6, 'Spicy Chicken', 'Because everything is better spicy', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'harinwu', 'gs://umami-2021.appspot.com/Recipes/Spicy Chicken.jpeg', 20, 10, 5, 2, 600, 3, 0, 0, 20);
CALL umami_db.createRecipe(7, 'Sweet & Sour Chicken', 'Impress your friends, family, and partner with this sweet & sour chicken recipe', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'harinwu', 'gs://umami-2021.appspot.com/Recipes/Sweet & Sour Chicken.jpeg', 20, 10, 5, 2, 600, 3, 0, 0, 20);
CALL umami_db.createRecipe(8, 'Beef Curry', 'Savoury beef curry for the soul', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'harinwu', 'gs://umami-2021.appspot.com/Recipes/Beef Curry.jpeg', 20, 10, 5, 2, 600, 3, 0, 0, 20);
CALL umami_db.createRecipe(9, 'Pineapple Gelato', 'Best enjoyed in the summer, but also surprisingly outdoors on a winter day', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'harinwu', 'gs://umami-2021.appspot.com/Recipes/Pineapple Gelato.jpeg', 20, 10, 5, 2, 600, 3, 1, 1, 20);
CALL umami_db.createRecipe(10, 'Kebabs', 'These are no ordinary kebabs', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'harinwu', 'gs://umami-2021.appspot.com/Recipes/Kebabs.jpeg', 20, 10, 5, 2, 600, 3, 0, 0, 20);
CALL umami_db.createRecipe(11, 'Fried Rice', 'You can never go wrong with fried rice', 'Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'harinwu', 'gs://umami-2021.appspot.com/Recipes/Fried Rice.jpeg', 20, 10, 5, 2, 600, 3, 1, 1, 20);

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

CALL umami_db.createIngredientInfo('Dummy1', 'Milk', 'Dairy', '', 0, 0, 0, 0, 2);
CALL umami_db.createIngredientInfo('Dummy2', 'Butter', 'Dairy', '', 0, 0, 0, 0, 2);
CALL umami_db.createIngredientInfo('Dummy3', 'Cheese', 'Dairy', '', 0, 0, 0, 0, 2);
CALL umami_db.createIngredientInfo('Dummy4', 'Orange', 'Fruits and Vegetables', '', 0, 0, 0, 0, 2);
CALL umami_db.createIngredientInfo('Dummy5', 'Banana', 'Fruits and Vegetables', '', 0, 0, 0, 0, 2);
CALL umami_db.createIngredientInfo('Dummy6', 'Strawberry', 'Fruits and Vegetables', '', 0, 0, 0, 0, 2);
CALL umami_db.createIngredientInfo('Dummy7', 'Chicken Breast', 'Meat and Fish', '', 0, 0, 0, 0, 2);
CALL umami_db.createIngredientInfo('Dummy8', 'Salmon', 'Meat and Fish', '', 0, 0, 0, 0, 2);
CALL umami_db.createIngredientInfo('Dummy9', 'Pepper', 'Seasoning', '', 0, 0, 0, 0, 2);
CALL umami_db.createIngredientInfo('Dummy10', 'Soy Sauce', 'Seasoning', '', 0, 0, 0, 0, 2);
CALL umami_db.createIngredientInfo('MagicID', 'Magic', 'Other', '', 0, 0, 0, 0, 0);

CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'Dummy1');
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'Dummy2');
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'Dummy3');
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'Dummy4');
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'Dummy5');
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'Dummy6');
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'Dummy7');
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'Dummy8');
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'Dummy9');
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'Dummy10');
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'aaaa');
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'aaab');
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'aaac');
CALL umami_db.postPantry('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'aaad');

CALL umami_db.postGroceryList('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'Dummy1');
CALL umami_db.postGroceryList('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'Dummy2');
CALL umami_db.postGroceryList('Qnj6AjQOLoZlJw4TZBpRE3iNz0K3', 'Dummy3');
