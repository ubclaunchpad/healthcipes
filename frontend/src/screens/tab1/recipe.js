import React, {useEffect, useRef, useMemo, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  Alert,
  Button,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import moment from 'moment';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../styles/color';
import feedStyle from './feedStyle';
import AccordionItem from '../../components/accordionItem';
import axios from 'axios';
import {API_URL} from '@env';
import {
  DELETE_RECIPE,
  GET_RECIPE,
  POST_RECIPE_LIKE,
  POST_RECIPE_VIEW,
} from '../../actions/recipeActions';
import auth from '@react-native-firebase/auth';
import NutritionChips from '../../components/nutritionChips';
import {ADD_GROCERY_INGREDIENT} from '../../actions/groceryListActions';
import GoButton from '../../components/goButton';
import {REMOVE_PANTRY_INGREDIENT, REMOVE_RECIPE_INGREDIENT} from '../../actions/pantryActions';

export default function Recipe({navigation, route}) {
  const [recipe, setRecipe] = useState(route.params.recipe);
  const dispatch = useDispatch();
  const [page, setPage] = useState('Info');
  const [image, setImage] = useState(
    require('../../assets/defaultProfile.png'),
  );
  const [ingredients, setIngredients] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [editPrompt, setEditPrompt] = useState(false);
  const [steps, setSteps] = useState([]);
  const recipeInfo = useSelector(state => state.recipeReducer.recipeReducer);
  const user = useSelector(state => state.accountReducer.userInfoReducer);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['60%', '88%'], []);
  const stepIndex = useSelector(
    state => state.accordionReducer.accordionStepReducer,
  );

  useEffect(() => {
    if (route.params.recipe_id) {
      getRecipeFromID(parseInt(route.params.recipe_id));
    }
  }, []);

  function getRecipeFromID(ID) {
    const apiConfig = {
      method: 'get',
      url: `${API_URL}/recipe/${ID}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(apiConfig)
      .then(function (response) {
        if (response.data.data.header_image.startsWith('gs://')) {
          storage()
            .refFromURL(response.data.data.header_image)
            .getDownloadURL()
            .then(res => {
              response.data.data.header_image = res;
              setRecipe(response.data.data);
            });
        } else {
          setRecipe(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function checkLike(ID) {
    const apiConfig = {
      method: 'get',
      url: `${API_URL}/user_activity/like_status?userID=${
        auth().currentUser.uid
      }&recipeID=${ID}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(apiConfig)
      .then(function (response) {
        const res = response.data;
        if (res[0].length > 0) {
          setIsLiked(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    const apiConfig2 = {
      method: 'get',
      url: `${API_URL}/user_activity/like_count?recipeID=${ID}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(apiConfig2)
      .then(function (response) {
        const res = response.data[0][0];
        if (res) {
          setLikeCount(Number(res));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function addIngredientsToGroceryList(ingredients) {}

  function deleteLike(ID) {
    const apiConfig = {
      method: 'delete',
      url: `${API_URL}/user_activity/like?userID=${
        auth().currentUser.uid
      }&recipeID=${ID}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(apiConfig)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (recipe) {
      storage()
        .refFromURL(`gs://umami-2021.appspot.com/Users/${recipe.user_id}.jpg`)
        .getDownloadURL()
        .then(res => {
          setImage({uri: res});
        })
        .catch(e => {
          console.log('[INFO]: No User Image: ' + e);
        });
    }
  }, [recipe]);

  useEffect(() => {
    if (recipe) {
      dispatch({type: GET_RECIPE, recipe_id: recipe.recipe_id});
      dispatch({
        type: POST_RECIPE_VIEW,
        user_id: auth().currentUser.uid,
        recipe_id: recipe.recipe_id,
      });
      checkLike(recipe.recipe_id);
    }
  }, [dispatch, recipe]);

  useEffect(() => {
    console.log(recipeInfo);
    setIngredients(recipeInfo.ingredients);
    setSteps(recipeInfo.steps);
  }, [recipeInfo]);

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

  function infoTab(liked, count) {
    const img = liked
      ? require('../../assets/LikeFilled.png')
      : require('../../assets/Like.png');
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
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                if (liked) {
                  deleteLike(recipe.recipe_id);
                  setIsLiked(false);
                  setLikeCount(count - 1);
                } else {
                  dispatch({
                    type: POST_RECIPE_LIKE,
                    user_id: auth().currentUser.uid,
                    recipe_like_id: recipe.recipe_id,
                  });
                  setIsLiked(true);
                  setLikeCount(count + 1);
                }
              }}>
              <Image
                source={img}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  marginRight: 5,
                  tintColor: color.red,
                }}
              />
            </TouchableOpacity>
            <Text>{count}</Text>
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
              source={image}
              style={{
                width: 36,
                height: 36,
                resizeMode: 'cover',
                marginRight: 5,
                borderRadius: 36,
              }}
            />
            <View style={{flexDirection: 'column'}}>
              <Text numberOfLines={1} style={{width: 80}}>
                {recipe.creator_username}
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
        {NutritionChips(recipe)}
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
            About this Recipe
          </Text>
          <Text>{recipe.recipe_description}</Text>
        </View>
      </View>
    );
  }

  function ingredientTab() {
    return (
      <BottomSheetFlatList
        contentContainerStyle={{paddingTop: 20}}
        data={ingredients}
        keyExtractor={item => item.ingredient_id}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                alignItems: 'center',
              }}>
              <Button
                title="Add to Grocery List"
                onPress={() => {
                  console.log('Add to grocery list button pressed');
                  ingredients.forEach(ingredient => {
                    dispatch({
                      type: ADD_GROCERY_INGREDIENT,
                      payload: {
                        userID: auth().currentUser.uid,
                        item: ingredient,
                      },
                    });
                  });
                }}></Button>
              <Image
                source={require('../../assets/Plus.png')}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
              />
              <Text style={{fontSize: 18}}>{item.ingredient_name}</Text>
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
        keyExtractor={item => item.step_id}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                padding: 20,
                borderColor: color.appPrimary,
                borderWidth: 1,
                borderRadius: 20,
                marginBottom: 20,
                backgroundColor: stepIndex[index] ? 'white' : color.appPrimary,
              }}>
              <AccordionItem title={`Step ${index + 1}`} index={index + 1}>
                <Text>{item.description}</Text>
              </AccordionItem>
            </View>
          );
        }}
        ListFooterComponent={
          <View>
            {GoButton('Finish Cooking', () => {
              dispatch({
                type: REMOVE_RECIPE_INGREDIENT,
                payload: {
                  userID: auth().currentUser.uid,
                  ingredients
                },
              });
            })}
          </View>
        }
      />
    );
  }

  if (!recipe) {
    return null;
  }

  return (
    <View
      style={{flex: 1, backgroundColor: 'white'}}
      onTouchEndCapture={() => {
        if (editPrompt) {
          setEditPrompt(false);
        }
      }}>
      {editPrompt && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            top: '5%',
            right: '5%',
            zIndex: 2,
            borderRadius: 20,
            padding: 20,
          }}>
          {recipe.user_id === auth().currentUser.uid && (
            <View>
              <TouchableOpacity
                style={{padding: 10}}
                onPress={() => {
                  navigation.push('NewRecipe', {
                    recipe: recipe,
                    recipeInfo: recipeInfo,
                  });
                }}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Edit Recipe
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{padding: 10}}
                onPress={() => {
                  Alert.alert(
                    'Are you sure you want to delete this recipe?',
                    '',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'Delete',
                        onPress: () => {
                          dispatch({
                            type: DELETE_RECIPE,
                            recipe_id: recipe.recipe_id,
                            user: user,
                            startIndex: 0,
                          });
                          navigation.pop();
                        },
                        style: 'destructive',
                      },
                    ],
                  );
                }}>
                <Text style={{fontSize: 16, fontWeight: '500', color: 'red'}}>
                  Delete Recipe
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {recipe.user_id !== auth().currentUser.uid && (
            <TouchableOpacity style={{padding: 10}}>
              <Text style={{fontSize: 16, fontWeight: '500'}}>
                Report Recipe
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      <ImageBackground
        source={{uri: recipe.header_image}}
        resizeMode="cover"
        style={{
          width: '100%',
          height: '70%',
          justifyContent: 'flex-end',
          flexDirection: 'row',
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
        <View style={{flex: 3}} />
        <TouchableOpacity
          style={{
            flex: 1,
            width: 24,
            height: 24,
            margin: 20,
            marginTop: '15%',
            alignItems: 'flex-end',
          }}
          onPress={() => {
            setEditPrompt(true);
          }}>
          <Image
            source={require('../../assets/More.png')}
            style={{
              height: 24,
              width: 24,
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
          {page === 'Info' && infoTab(isLiked, likeCount)}
          {page === 'Ingredients' && ingredientTab()}
          {page === 'Steps' && stepTab()}
        </View>
      </BottomSheet>
    </View>
  );
}
