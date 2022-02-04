import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import color from '../styles/color';

export default function NutritionChips(recipe) {
  const recipeStyle = StyleSheet.create({
    nutritionStyle: {
      flexDirection: 'column',
      borderRadius: 20,
      borderWidth: 1,
      padding: 10,
      alignItems: 'center',
      width: '20%',
    },
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 30,
      }}>
      <View
        style={[
          recipeStyle.nutritionStyle,
          {
            borderColor: color.appPrimary,
          },
        ]}>
        <Text>{recipe.calories ?? '0'}</Text>
        <Text style={{fontSize: 10}}>Calories</Text>
      </View>
      <View
        style={[
          recipeStyle.nutritionStyle,
          {
            borderColor: color.lightGreen,
          },
        ]}>
        <Text>{recipe.protein ?? '0'}g</Text>
        <Text style={{fontSize: 10}}>Protein</Text>
      </View>
      <View
        style={[
          recipeStyle.nutritionStyle,
          {
            borderColor: color.orange,
          },
        ]}>
        <Text>{recipe.fiber ?? '0'}g</Text>
        <Text style={{fontSize: 10}}>Fiber</Text>
      </View>
      <View
        style={[
          recipeStyle.nutritionStyle,
          {
            borderColor: color.red,
          },
        ]}>
        <Text>{recipe.fat ?? '0'}g</Text>
        <Text style={{fontSize: 10}}>Fat</Text>
      </View>
    </View>
  );
}
