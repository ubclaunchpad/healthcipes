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
import {v4 as uuidv4} from 'uuid';
import {useDispatch, useSelector} from 'react-redux';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {launchImageLibrary} from 'react-native-image-picker';
import {GET_USER} from '../../actions/accountActions';
import color from '../../styles/color';
import GoButton from '../../components/goButton';
import {POST_RECIPE, RECIPE_STEP} from '../../actions/recipeActions';
import NutritionChips from '../../components/nutritionChips';
import newrecipeStyle from './newrecipeStyle';

export default function NewRecipe({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.accountReducer.userInfoReducer);
  const steps = useSelector(state => state.recipeReducer.recipeStepsReducer);
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [servings, setServings] = useState(0);
  const [prepTime, setPrepTime] = useState(0);

  useEffect(() => {
    dispatch({type: GET_USER, userID: auth().currentUser.uid});
  }, [dispatch]);

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
            backgroundColor: color.textGray,
            width: 20,
            height: 20,
            borderRadius: 20,
            position: 'absolute',
            zIndex: 2,
          }}
        />
        {index % 2 === 0 ? (
          <View style={{alignItems: 'center', marginBottom: '120%'}}>
            <ImageBackground imageStyle={{borderRadius: 20}} style={newrecipeStyle.StepImageContainer} source={item.image_cache}>
              <Image
                source={require('../../assets/EditStep.png')}
                style={newrecipeStyle.EditStepIcon}
              />
            </ImageBackground>
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
            <ImageBackground imageStyle={{borderRadius: 20}} style={newrecipeStyle.StepImageContainer} source={item.image_cache}>
              <Image
                source={require('../../assets/EditStep.png')}
                style={newrecipeStyle.EditStepIcon}
              />
            </ImageBackground>
          </View>
        )}
        <View
          style={{
            backgroundColor: color.textGray,
            width: '100%',
            height: 3,
            position: 'absolute',
          }}
        />
      </TouchableOpacity>
    );
  };

  function save() {
    if (recipeName !== '') {
      if (recipeImage !== '') {
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
            const finalSteps = [];
            const ingredients = [];
            dispatch({
              type: POST_RECIPE,
              recipeObj: recipeObj,
              steps: finalSteps,
              ingredients: ingredients,
            });
          });
      } else {
        console.log('Image Cannot Be Empty');
      }
    } else {
      console.log('Recipe Name Cannot Be Empty');
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingHorizontal: '5%', flex: 2}}>
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
          }}
          placeholderTextColor={color.gray}
        />
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
                  backgroundColor: color.textGray,
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  position: 'absolute',
                  zIndex: 2,
                }}
              />
              <View
                style={{
                  backgroundColor: color.textGray,
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
                  backgroundColor: color.gray,
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
                <TextInput
                  style={{
                    paddingHorizontal: '5%',
                    height: '100%',
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: color.gray,
                  }}
                  value={recipeDescription}
                  onChangeText={text => {
                    setRecipeDescription(text);
                  }}
                  placeholder="Description"
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
                        value={servings.toString()}
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
              <View style={{flex: 0.75, width: '50%'}}>
                {GoButton('Save', save)}
              </View>
            </KeyboardAvoidingView>
          </View>
        }
      />
      <View style={{flex: 2}} />
    </SafeAreaView>
  );
}
