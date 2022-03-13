import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {TabActions} from '@react-navigation/native';
import {v4 as uuidv4} from 'uuid';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {launchImageLibrary} from 'react-native-image-picker';
import color from '../../styles/color';
import GoButton from '../../components/goButton';
import {
  POST_RECIPE,
  PUT_RECIPE,
  RECIPE_STEP,
} from '../../actions/recipeActions';
import NutritionChips from '../../components/nutritionChips';
import newrecipeStyle from './newrecipeStyle';
import {SET_LOADING} from '../../actions/globalActions';
import Loader from '../../components/Loader';

export default function NewRecipe({navigation, route}) {
  const dispatch = useDispatch();
  const recipe = route.params ? route.params.recipe : null;
  const recipeInfo = route.params ? route.params.recipeInfo : null;
  const [editMode, setEditMode] = useState(false);
  const user = useSelector(state => state.accountReducer.userInfoReducer);
  const steps = useSelector(state => state.recipeReducer.recipeStepsReducer);
  const loading = useSelector(state => state.globalReducer.loadingReducer);
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [servings, setServings] = useState(0);
  const [prepTime, setPrepTime] = useState(0);
  const [importModal, setImportModal] = useState(false);
  const [parseURL, setParseURL] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      let prepTimeCalc = 0;
      steps.forEach(step => {
        prepTimeCalc += step.step_time ? step.step_time : 0;
      });
      setPrepTime(prepTimeCalc);
    }, [steps]),
  );

  useEffect(() => {
    if (recipe) {
      setEditMode(true);
      setRecipeName(recipe.name);
      setRecipeDescription(recipe.recipe_description);
      setPrepTime(recipe.cooking_time);
      setServings(recipe.servings);
      setRecipeImage({uri: recipe.header_image});
      const editSteps = recipeInfo.steps;
      const promises = [];
      editSteps.map(step => {
        const prom = storage()
          .refFromURL(step.header_image)
          .getDownloadURL()
          .then(res => {
            step['image_cache'] = {uri: res};
            step['step_text'] = step.description;
            step['step_time'] = step.time;
            step['step_image'] = step.header_image;
            step['step_ingredients'] = [];
          });

        promises.push(prom);
      });

      Promise.all(promises).then(() => {
        dispatch({
          type: RECIPE_STEP,
          payload: editSteps,
        });
      });
    }
  }, []);

  const renderItem = ({item, drag, isActive, index}) => {
    return (
      <TouchableOpacity
        onLongPress={drag}
        onPress={() => {
          navigation.push('NewStep', {index});
        }}
        disabled={isActive}
        style={[
          {
            height: '100%',
            width: 200,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <View
          style={{
            backgroundColor: color.appPrimary,
            width: 20,
            height: 20,
            borderRadius: 20,
            position: 'absolute',
            zIndex: 2,
          }}
        />
        {index % 2 === 0 ? (
          <View style={{alignItems: 'center', marginBottom: '120%'}}>
            <View
              style={{
                padding: 5,
                backgroundColor: color.appPrimaryLight,
                borderRadius: item.image_cache ? 20 : 100,
              }}>
              <ImageBackground
                imageStyle={{borderRadius: 20}}
                style={
                  item.image_cache
                    ? newrecipeStyle.StepImageContainer
                    : newrecipeStyle.StepImageRoundContainer
                }
                source={item.image_cache}>
                <Image
                  source={require('../../assets/EditStep.png')}
                  style={newrecipeStyle.EditStepIcon}
                />
              </ImageBackground>
            </View>
            <Image
              source={require('../../assets/DashLine.png')}
              style={newrecipeStyle.StepDashLine}
            />
          </View>
        ) : (
          <View style={{alignItems: 'center', marginTop: '120%'}}>
            <Image
              source={require('../../assets/DashLine.png')}
              style={newrecipeStyle.StepDashLine}
            />
            <View
              style={{
                padding: 5,
                backgroundColor: color.appPrimaryLight,
                borderRadius: item.image_cache ? 20 : 100,
              }}>
              <ImageBackground
                imageStyle={{borderRadius: 20}}
                style={
                  item.image_cache
                    ? newrecipeStyle.StepImageContainer
                    : newrecipeStyle.StepImageRoundContainer
                }
                source={item.image_cache}>
                <Image
                  source={require('../../assets/EditStep.png')}
                  style={newrecipeStyle.EditStepIcon}
                />
              </ImageBackground>
            </View>
          </View>
        )}
        <View
          style={{
            backgroundColor: color.appPrimary,
            width: '100%',
            height: 3,
            position: 'absolute',
          }}
        />
      </TouchableOpacity>
    );
  };

  function updateRecipe() {
    dispatch({type: SET_LOADING, loading: true});
    const uploadUri =
      Platform.OS === 'ios'
        ? recipeImage.uri.replace('file://', '')
        : recipeImage.uri;

    const storageRef = storage()
      .ref()
      .child('Recipes')
      .child(`${recipeName}_${auth().currentUser.uid}.jpeg`);

    const pattern = /^((http|https|ftp):\/\/)/;

    if (pattern.test(uploadUri)) {
      console.log('Skip Image Uploaded');
      const recipeObj = {
        recipe_id: recipe.recipe_id,
        name: recipeName,
        recipe_description: recipeDescription,
        header_image: storageRef.toString(),
        user_id: auth().currentUser.uid,
        creator_username: user.username,
        protein: recipe.protein,
        carbs: recipe.carbs,
        fat: recipe.fat,
        fiber: recipe.fiber,
        calories: recipe.calories,
        servings: servings,
        vegetarian: recipe.vegetarian,
        vegan: recipe.vegan,
        cooking_time: prepTime,
      };

      dispatch({
        type: PUT_RECIPE,
        recipeObj: recipeObj,
        steps: steps,
      });

      dispatch({type: SET_LOADING, loading: false});

      dispatch({
        type: RECIPE_STEP,
        payload: [{step_index: 0, step_image: ''}],
      });
      navigation.replace('NewRecipe');
      const jumpToAction = TabActions.jumpTo('FeedTab');
      navigation.dispatch(jumpToAction);
      navigation.popToTop();
    } else {
      storageRef
        .putFile(uploadUri, {
          customMetadata: {
            Owner: auth().currentUser.uid,
          },
        })
        .then(() => {
          console.log('Uploaded');
          const recipeObj = {
            recipe_id: recipe.recipe_id,
            name: recipeName,
            recipe_description: recipeDescription,
            header_image: storageRef.toString(),
            user_id: auth().currentUser.uid,
            creator_username: user.username,
            protein: recipe.protein,
            carbs: recipe.carbs,
            fat: recipe.fat,
            fiber: recipe.fiber,
            calories: recipe.calories,
            servings: servings,
            vegetarian: recipe.vegetarian,
            vegan: recipe.vegan,
            cooking_time: prepTime,
          };

          dispatch({
            type: PUT_RECIPE,
            recipeObj: recipeObj,
            steps: steps,
          });

          dispatch({type: SET_LOADING, loading: false});

          dispatch({
            type: RECIPE_STEP,
            payload: [{step_index: 0, step_image: ''}],
          });
          navigation.replace('NewRecipe');
          const jumpToAction = TabActions.jumpTo('FeedTab');
          navigation.dispatch(jumpToAction);
          navigation.popToTop();
        })
        .catch(() => {
          dispatch({type: SET_LOADING, loading: false});
        });
    }
  }

  function save() {
    console.log(`[INFO] EDIT MODE: ${editMode}`);
    if (recipeName !== '') {
      if (recipeImage !== '') {
        if (editMode) {
          updateRecipe();
        } else {
          dispatch({type: SET_LOADING, loading: true});
          const uploadUri =
            Platform.OS === 'ios'
              ? recipeImage.uri.replace('file://', '')
              : recipeImage.uri;

          const storageRef = storage()
            .ref()
            .child('Recipes')
            .child(`${recipeName}_${auth().currentUser.uid}.jpeg`);

          storageRef
            .putFile(uploadUri, {
              customMetadata: {
                Owner: auth().currentUser.uid,
              },
            })
            .then(() => {
              console.log('Uploaded');
              const recipeObj = {
                recipe_id: '',
                name: recipeName,
                recipe_description: recipeDescription,
                header_image: storageRef.toString(),
                user_id: auth().currentUser.uid,
                creator_username: user.username,
                protein: 0,
                carbs: 0,
                fat: 0,
                fiber: 0,
                calories: 0,
                servings: servings,
                vegetarian: false,
                vegan: false,
                cooking_time: prepTime,
              };
              const ingredients = [];

              steps.forEach(step => {
                ingredientList = step.step_ingredients;
                ingredientList.forEach(ingredient => {
                  if (!ingredients.includes(ingredient)) {
                    ingredients.push(ingredient);
                  }
                });
              });

              dispatch({
                type: POST_RECIPE,
                recipeObj: recipeObj,
                steps: steps,
                ingredients: ingredients,
              });

              dispatch({type: SET_LOADING, loading: false});

              dispatch({
                type: RECIPE_STEP,
                payload: [{step_index: 0, step_image: ''}],
              });
              navigation.replace('NewRecipe');
              const jumpToAction = TabActions.jumpTo('FeedTab');
              navigation.dispatch(jumpToAction);
            })
            .catch(() => {
              dispatch({type: SET_LOADING, loading: false});
            });
        }
      } else {
        console.log('Image Cannot Be Empty');
      }
    } else {
      console.log('Recipe Name Cannot Be Empty');
    }
  }

  function processURL(url) {
    console.log('processing URL: ' + url);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {Loader(loading, 'fade')}
      {importModal && (
        <View
          onTouchEnd={() => {
            setImportModal(false);
          }}
          style={{
            width: '100%',
            height: '110%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 5,
            position: 'absolute',
          }}>
          <View
            onTouchEnd={e => {
              e.stopPropagation();
            }}
            style={{
              width: '90%',
              height: 100,
              position: 'absolute',
              top: '18%',
              left: '5%',
              zIndex: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                height: 100,
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 10,
                paddingHorizontal: 20,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '500',
                  color: color.appPrimary,
                  marginBottom: 20,
                }}>
                Enter URL to Import Recipe
              </Text>
              <TextInput
                placeholder="www.example.com"
                autoCorrect={false}
                onChangeText={text => setParseURL(text)}
                value={parseURL}
                style={{
                  borderBottomColor: color.gray,
                  borderBottomWidth: 1,
                  width: '80%',
                  paddingBottom: 10,
                }}
                placeholderTextColor={color.gray}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                processURL(parseURL);
              }}
              style={{
                width: 50,
                height: 50,
                backgroundColor: color.appPrimary,
                borderRadius: 50,
                padding: 10,
                marginLeft: -25,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/Back.png')}
                style={{
                  width: 24,
                  height: 20,
                  resizeMode: 'contain',
                  tintColor: color.white,
                  transform: [{rotate: '180deg'}],
                  marginLeft: 5,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View
        style={{
          paddingHorizontal: '5%',
          flex: 2,
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity
          style={{flex: 1, marginBottom: 10, marginRight: 10}}
          onPress={() => {
            setImportModal(true);
          }}>
          <Image
            source={require('../../assets/Link.png')}
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
              tintColor: color.appPrimary,
            }}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Recipe Name"
          autoCorrect={false}
          onChangeText={text => setRecipeName(text)}
          value={recipeName}
          style={{
            borderBottomColor: color.gray,
            borderBottomWidth: 1,
            height: '100%',
            paddingTop: 20,
            flex: 8,
          }}
          placeholderTextColor={color.gray}
        />
        <TouchableOpacity
          style={{
            flex: 1.5,
            marginBottom: 10,
            marginLeft: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            save();
          }}>
          <Text
            style={{fontWeight: '500', color: color.appPrimary, fontSize: 18}}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
      <DraggableFlatList
        data={steps}
        onDragEnd={({data}) =>
          dispatch({
            type: RECIPE_STEP,
            payload: data,
          })
        }
        horizontal
        keyExtractor={() => uuidv4()}
        renderItem={renderItem}
        containerStyle={{flex: 18}}
        style={{height: '100%'}}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={
          <View style={{flexDirection: 'row', height: '100%'}}>
            <TouchableOpacity
              onPress={() => {
                dispatch({
                  type: RECIPE_STEP,
                  payload: [
                    ...steps,
                    {step_index: steps.length, step_image: ''},
                  ],
                });
              }}
              style={[
                {
                  height: '100%',
                  width: 200,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <Image
                source={require('../../assets/AddStep.png')}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  position: 'absolute',
                  zIndex: 2,
                }}
              />
              <View
                style={{
                  backgroundColor: color.appPrimary,
                  width: '50%',
                  height: 3,
                  alignSelf: 'flex-start',
                }}
              />
            </TouchableOpacity>
            <KeyboardAvoidingView
              behavior={'position'}
              keyboardVerticalOffset={30}
              contentContainerStyle={{
                height: '100%',
                width: 400,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                style={{
                  flex: 2,
                  marginTop: '5%',
                  width: '80%',
                  backgroundColor: color.appPrimaryLight,
                  borderRadius: 20,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  padding: recipeImage !== '' ? 0 : 20,
                }}
                onPress={() => {
                  launchImageLibrary({
                    selectionLimit: 1,
                    mediaType: 'photo',
                    includeBase64: false,
                  }).then(res => {
                    setRecipeImage({uri: res?.assets[0].uri});
                  });
                }}>
                <Image
                  source={
                    recipeImage !== ''
                      ? recipeImage
                      : require('../../assets/Logo.png')
                  }
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                    resizeMode: recipeImage !== '' ? 'cover' : 'contain',
                  }}
                />
                <Image
                  source={require('../../assets/EditStep.png')}
                  style={[
                    newrecipeStyle.EditStepIcon,
                    {
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                    },
                  ]}
                />
              </TouchableOpacity>
              <View style={{flex: 1.2}}>{NutritionChips({})}</View>
              <View style={{flex: 1.5, width: '80%'}}>
                <Text style={newrecipeStyle.InputPromptText}>Description</Text>
                <TextInput
                  style={{
                    height: '100%',
                    borderRadius: 20,
                  }}
                  value={recipeDescription}
                  onChangeText={text => {
                    setRecipeDescription(text);
                  }}
                  placeholder="Start typing..."
                  multiline
                />
              </View>
              <View style={{flex: 1.5, width: '80%', paddingBottom: 10}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/ServesIcon.png')}
                      style={newrecipeStyle.InputPromptIcon}
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={newrecipeStyle.InputPromptText}>Serves</Text>
                      <TextInput
                        style={{
                          borderBottomWidth: 1,
                          borderColor: color.gray,
                          width: 50,
                          textAlign: 'center',
                        }}
                        value={servings !== 0 ? servings.toString() : ''}
                        onChangeText={text => {
                          setServings(Number(text));
                        }}
                        keyboardType="number-pad"
                        placeholder="1"
                        returnKeyType="done"
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/TimeIcon.png')}
                      style={newrecipeStyle.InputPromptIcon}
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={newrecipeStyle.InputPromptText}>Time</Text>
                      <Text>{prepTime} Mins</Text>
                    </View>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        }
      />
      <View style={{flex: 2}} />
    </SafeAreaView>
  );
}
