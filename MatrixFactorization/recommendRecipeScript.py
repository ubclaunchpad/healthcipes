import pandas as pd
import random
import factor
import numpy
# get "out.csv" from the user_activity_table
# mysql -h localhost -P 3306 --protocol=tcp -u root --password=password < getUserActivityTable.sql | sed 's/\t/,/g' > out.cs
df=pd.read_csv('out.csv', sep=',',header=0,keep_default_na=False)

# get the user_ids
userColumn = df["user_id"].values
# get the recipe ratings (you would actually do this by doing a join on a recipe_ratings table)
recipeRatingColumn = df["recipe_like_id"].values

# recipeIDs will be a set of all the recipes that users have liked
recipeIDs = set()
# lines 17-25 will make userRatingsDictionary will look like {userId1: {recipeId1: userId1RatingOfRecipeId1,
#                                                recipeId2: userId1RatingOfRecipeId2},
#                                       userId2: {recipeId2: userId2RaingOfRecipeId1}}
# and so on
userRatingDictionary = {}
for user, rating in zip(userColumn, recipeRatingColumn): 
       if user not in userRatingDictionary:
              userRatingDictionary[user] = {}
              userRatingDictionary[user][rating] = random.randint(1,5)
       else:
              userRatingDictionary[user][rating] = random.randint(1,5)
       recipeIDs.add(rating)

# set up the factorMatrix
factorMatrix = []
# iterate over each user and their ratings
for user, recipeRatings in userRatingDictionary.items():
       # set up the outputList to append to factorMatrix
       outputList = []
       # iterate over every unique recipeId 
       for recipeId in recipeIDs:
              # append 0 to the outputList there user has not rated this recipe
              if recipeId not in recipeRatings:
                     outputList.append(0)
              # if they have rated it, then key in their recipeRatings with the current recipeId and append their rating
              else:
                     outputList.append(recipeRatings[recipeId])

       # copy their ratings to factorMatrix
       factorMatrix.append(outputList.copy())


# the factor matrix will look like 
#                            recipeIDs[0],              recipeIDs[1],            recipeIDs[2], ..., recipeIDs[-1] FYI can't index sets so iterate over it
# userRatingDictionary[0]    user0 rating of recipe0   user0 rating of recipe1 ...
# userRatingDictionary[1]    user1 rating of recipe0, ...
# ...                        ... 
# userRatingDictionary[-1]

# FYI can't index dict so iterate over the keys

# matrix factorization stuff
# https://towardsdatascience.com/recommendation-system-matrix-factorization-d61978660b4b
R = numpy.array(factorMatrix)
print(R)
N = len(R)
# M: num of Movie
M = len(R[0])
# Num of Features
K = 3

P = numpy.random.rand(N,K)
Q = numpy.random.rand(M,K)

nP, nQ = factor.matrix_factorization(R, P, Q, K)

nR = numpy.dot(nP, nQ.T)
print(nR)