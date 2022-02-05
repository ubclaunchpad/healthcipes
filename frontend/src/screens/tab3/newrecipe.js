import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {GET_USER} from '../../actions/accountActions';
import color from '../../styles/color';
import GoButton from '../../components/goButton';
import {POST_RECIPE} from '../../actions/recipeActions';
import NutritionChips from '../../components/nutritionChips';

export default function NewRecipe({navigation}) {
  const dispatch = useDispatch();
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [steps, setSteps] = useState(['NEW']);

  useEffect(() => {
    dispatch({type: GET_USER, userID: auth().currentUser.uid});
  }, [dispatch]);

  const renderItem = ({item, drag, isActive, index}) => {
    return (
      <TouchableOpacity
        onLongPress={drag}
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
            <View
              style={{
                backgroundColor: color.gray,
                width: 150,
                height: 150,
                borderRadius: 20,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                zIndex: 2,
              }}>
              <Image
                source={require('../../assets/EditStep.png')}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  margin: 10,
                }}
              />
            </View>
            <Image
              source={require('../../assets/DashLine.png')}
              style={{
                height: 100,
                width: 3,
                resizeMode: 'cover',
              }}
            />
          </View>
        ) : (
          <View style={{alignItems: 'center', marginTop: '120%'}}>
            <Image
              source={require('../../assets/DashLine.png')}
              style={{
                height: 100,
                width: 3,
                resizeMode: 'cover',
              }}
            />
            <View
              style={{
                backgroundColor: color.gray,
                width: 150,
                height: 150,
                borderRadius: 20,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                zIndex: 2,
              }}>
              <Image
                source={require('../../assets/EditStep.png')}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  margin: 10,
                }}
              />
            </View>
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
    const recipeObj = {
      name: recipeName,
      image: '',
      description: recipeDescription,
    };
    dispatch({type: POST_RECIPE, recipe: recipeObj});
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
        onDragEnd={({data}) => setSteps(data)}
        horizontal
        keyExtractor={item => item.key}
        renderItem={renderItem}
        containerStyle={{flex: 18}}
        style={{height: '100%'}}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={() => (
          <View style={{flexDirection: 'row', height: '100%'}}>
            <TouchableOpacity
              onPress={() => {
                setSteps([...steps, 'NEW']);
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
            <View
              style={[
                {
                  width: 400,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                },
              ]}>
              <TouchableOpacity
                style={{
                  flex: 2,
                  marginTop: '5%',
                  width: '80%',
                  backgroundColor: color.gray,
                  borderRadius: 20,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <Image
                  source={require('../../assets/EditStep.png')}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    margin: 10,
                  }}
                />
              </TouchableOpacity>
              <View style={{flex: 1}}>{NutritionChips({})}</View>
              <View style={{flex: 1, width: '80%'}}>
                <TextInput
                  style={{
                    paddingHorizontal: '5%',
                    height: '100%',
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: color.gray,
                  }}
                  value={recipeDescription}
                  onChangeText={text => setRecipeDescription(text)}
                  placeholder="Description"
                  multiline
                />
              </View>
              <View style={{flex: 1.5, width: '80%', paddingBottom: 10}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/ServesIcon.png')}
                    style={{
                      height: 24,
                      width: 24,
                      resizeMode: 'contain',
                      margin: 10,
                    }}
                  />
                  <View style={{flexDirection: 'column'}}>
                    <Text>Serves</Text>
                    <Text>4</Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/TimeIcon.png')}
                      style={{
                        height: 24,
                        width: 24,
                        resizeMode: 'contain',
                        margin: 10,
                      }}
                    />
                    <View style={{flexDirection: 'column'}}>
                      <Text>Prep</Text>
                      <Text>4</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <Text>Cook</Text>
                    <Text>4</Text>
                  </View>
                </View>
              </View>
              <View style={{flex: 0.75, width: '50%'}}>
                {GoButton('Save', save)}
              </View>
            </View>
          </View>
        )}
      />
      <View style={{flex: 2}} />
    </SafeAreaView>
  );
}
