import React, {useEffect, useRef, useMemo, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {GET_USER} from '../../actions/accountActions';
import color from '../../styles/color';
import feedStyle from './feedStyle';
import AccordionItem from '../../components/accordionItem';
import recipeStyle from './recipeStyle';
import {GET_RECIPE} from '../../actions/recipeActions';

export default function Recipe({navigation, route}) {
  const {recipe} = route.params;
  const dispatch = useDispatch();
  const [page, setPage] = useState('Info');
  const recipeInfo = useSelector(state => state.recipeReducer.recipeReducer);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['60%', '88%'], []);

  useEffect(() => {
    dispatch({type: GET_USER, userID: auth().currentUser.uid});
  }, [dispatch]);

  useEffect(() => {
    dispatch({type: GET_RECIPE, recipe_id: recipe.recipe_id});
  }, [dispatch, recipe]);

  const ingredients = ['2 tsp olive oil', '1 brown onion', '2 garlic cloves'];
  const steps = [
    'Melt the butter in a large saucepan over medium-high heat until foaming. Add the flour and cook, stirring, for 1-2 minutes or until mixture bubbles and begins to come away from the side of the pan. Remove from heat.',
    'Heat the butter in a large saucepan over medium-high heat until foaming. Add the flour and cook, stirring, for 1-2 minutes or until mixture bubbles and begins to come away from the side of the pan. Remove from heat.',
    'Stir the butter in a large saucepan over medium-high heat until foaming. Add the flour and cook, stirring, for 1-2 minutes or until mixture bubbles and begins to come away from the side of the pan. Remove from heat.',
  ];

  function recipeTab(tab) {
    return (
      <TouchableOpacity
        onPress={() => {
          setPage(tab);
        }}
        style={{
          borderBottomWidth: page === tab ? 2 : 0,
          borderColor: color.appPrimary,
          flex: 1,
        }}>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 16,
            padding: 10,
            textAlign: 'center',
            color: page === tab ? color.appPrimary : color.textGray,
          }}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  }

  function nutrition() {
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
          <Text>{recipe.calories}</Text>
          <Text style={{fontSize: 10}}>Calories</Text>
        </View>
        <View
          style={[
            recipeStyle.nutritionStyle,
            {
              borderColor: color.lightGreen,
            },
          ]}>
          <Text>{recipe.protein}g</Text>
          <Text style={{fontSize: 10}}>Protein</Text>
        </View>
        <View
          style={[
            recipeStyle.nutritionStyle,
            {
              borderColor: color.orange,
            },
          ]}>
          <Text>{recipe.fiber}g</Text>
          <Text style={{fontSize: 10}}>Fiber</Text>
        </View>
        <View
          style={[
            recipeStyle.nutritionStyle,
            {
              borderColor: color.red,
            },
          ]}>
          <Text>{recipe.fat}g</Text>
          <Text style={{fontSize: 10}}>Fat</Text>
        </View>
      </View>
    );
  }

  function infoTab() {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={feedStyle.recipeTitle}>{recipe.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <Image
              source={require('../../assets/Like.png')}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
                marginRight: 5,
              }}
            />
            <Text>2.3k</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/defaultProfile.png')}
              style={{
                width: 36,
                height: 36,
                resizeMode: 'contain',
                marginRight: 5,
              }}
            />
            <View style={{flexDirection: 'column'}}>
              <Text numberOfLines={1} style={{width: 80}}>
                {recipe.user_id}
              </Text>
              <Text style={{fontSize: 10}}>
                {moment(new Date(recipe.created_time)).format('D MMM YYYY')}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/Time.png')}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
                marginRight: 2,
              }}
            />
            <Text>{recipe.cooking_time} mins</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/Serving.png')}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
                marginRight: 2,
              }}
            />
            <Text>{recipe.servings} Servings</Text>
          </View>
        </View>
        {nutrition()}
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
            About this Recipe
          </Text>
          <Text>
            Homemade Lasagna is a classic that every cook should have in their
            rotation. Tender sheets of pasta, a cheese filling, and a rich meaty
            tomato sauce make the perfect dish!
          </Text>
        </View>
      </View>
    );
  }

  function ingredientTab() {
    return (
      <BottomSheetFlatList
        contentContainerStyle={{paddingTop: 20}}
        data={ingredients}
        keyExtractor={i => i}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/Plus.png')}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
              />
              <Text style={{fontSize: 18}}>{item}</Text>
            </View>
          );
        }}
      />
    );
  }

  function stepTab() {
    return (
      <BottomSheetFlatList
        contentContainerStyle={{paddingTop: 20, paddingBottom: '30%'}}
        data={steps}
        keyExtractor={index => index}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                padding: 20,
                borderColor: color.appPrimary,
                borderWidth: 1,
                borderRadius: 20,
                marginBottom: 20,
              }}>
              <AccordionItem title={`Step ${index + 1}`}>
                <Text>{item}</Text>
              </AccordionItem>
            </View>
          );
        }}
      />
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
        source={{uri: recipe.header_image}}
        resizeMode="cover"
        style={{
          width: '100%',
          height: '70%',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          style={{flex: 1, width: 24, height: 24, margin: 20, marginTop: '15%'}}
          onPress={() => {
            navigation.pop();
          }}>
          <Image
            source={require('../../assets/Back.png')}
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
              tintColor: color.white,
            }}
          />
        </TouchableOpacity>
      </ImageBackground>
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <View style={{flex: 1, paddingHorizontal: '7%'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {recipeTab('Info')}
            {recipeTab('Ingredients')}
            {recipeTab('Steps')}
          </View>
          {page === 'Info' && infoTab()}
          {page === 'Ingredients' && ingredientTab()}
          {page === 'Steps' && stepTab()}
        </View>
      </BottomSheet>
    </View>
  );
}
