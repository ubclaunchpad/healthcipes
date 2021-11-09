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
