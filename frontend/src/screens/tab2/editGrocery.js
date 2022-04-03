import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  SectionList,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Swipeable from 'react-native-swipeable';
import SwitchSelector from 'react-native-switch-selector';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../styles/color';
import {
  GET_GROCERY,
  ADD_GROCERY_INGREDIENT,
  GET_ALL_INGREDIENTS,
  REMOVE_INGREDIENT,
  SEARCH_INGREDIENTS,
} from '../../actions/groceryListActions';

export default function EditGrocery({navigation}) {
  const dispatch = useDispatch();
  const [addState, setAddState] = useState(true);
  const [search, setSearch] = useState('');
  const [ingredientIds, setingredientIds] = useState([]);
  const groceryList = useSelector(state => state.groceryListReducer.groceryListReducer);
  const ingredients = useSelector(
    state => state.pantryReducer.ingredientReducer,
  );
  
  useEffect(() => {
    dispatch({type: GET_ALL_INGREDIENTS});
  }, [dispatch]);

  useEffect(() => {
    console.log("THIS IS THE GROCERY LIST ---->", groceryList[0].data[1].id); 
    const groceryIds = groceryList.map(groceryItem => {
      const data = groceryItem.data;
      return data.map(ingredient => {
        return ingredient.id;
      });
    });
    setingredientIds(groceryIds.flat());
  }, [groceryList]);

  const itemInPantry = item => {
    const id = item[0];
    return ingredientIds.includes(id);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{flex: 1, marginLeft: 20}}
          onPress={() => {
            navigation.pop();
          }}
        >
          <Image
            source={require('../../assets/Back.png')}
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <View style={{flex: 5}}>
          <SwitchSelector
            initial={0}
            onPress={value => setAddState(value)}
            backgroundColor={color.appPrimary}
            textColor={color.white}
            selectedColor={color.appPrimary}
            buttonColor={color.white}
            borderColor={color.appPrimary}
            hasPadding
            options={[
              {label: 'Add', value: true},
              {label: 'Remove', value: false},
            ]}
          />
        </View>
        <View style={{flex: 1, height: 1}} />
      </View>
      <View style={{flex: 10}}>
        {addState && (
          <FlatList
            style={{paddingHorizontal: '5%'}}
            data={ingredients}
            ListHeaderComponent={ 
              <View
                style={{
                  backgroundColor: color.lightGray,
                  height: 40,
                  width: '100%',
                  borderRadius: 20,
                  marginBottom: 20,
                  paddingHorizontal: '5%',
                  alignItems: 'center',
                  alignSelf: 'center',
                  flexDirection: 'row',
                }}
              >
                <Image
                  source={require('../../assets/Search.png')}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                  }}
                />
                <TextInput
                  style={{
                    height: 40,
                    paddingHorizontal: '5%',
                    width: '100%',
                  }}
                  value={search}
                  onChangeText={text => setSearch(text)}
                  onSubmitEditing={() => {
                    if (search !== '') {
                      dispatch({
                        type: SEARCH_INGREDIENTS,
                        keyword: search,
                      });
                    } else {
                      dispatch({type: GET_ALL_INGREDIENTS});
                    }
                  }}
                />
              </View>
            }
            
            contentContainerStyle={{paddingBottom: '30%'}}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: 1,
                    backgroundColor: color.black75,
                    marginVertical: 20,
                  }}
                />
              );
            }}
            renderItem={({item}) => {
                // console.log("THIS IS AN ITEM ----> ", item); 
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Text style={{fontSize: 18}}>{item[1]}</Text>
                  <TouchableOpacity
                    onPress={() => {
                        console.log("Dispatching", item)
                      dispatch({
                        type:ADD_GROCERY_INGREDIENT ,
                        payload: {userID: auth().currentUser.uid, item: item},
                      });
                      console.log(""); 

                    //   dispatch({
                    //     type: REMOVE_PANTRY_INGREDIENT,
                    //     payload: {userID: auth().currentUser.uid, item},
                    //   });
                    }}
                  >
                    {!itemInPantry(item) && (
                      <Image
                        source={require('../../assets/Plus.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor: color.gray,
                        }}
                      />
                    )}

                    {itemInPantry(item) && (
                      <Image
                        source={require('../../assets/check.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                        }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        )}
        {!addState && (
          <SectionList
            sections={groceryList}
            style={{paddingLeft: '5%', marginRight: '5%'}}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: 1,
                    backgroundColor: color.black75,
                  }}
                />
              );
            }}
            ListHeaderComponent={
              <TouchableOpacity
                style={{
                  backgroundColor: color.lightGray,
                  height: 40,
                  width: '100%',
                  borderRadius: 20,
                  marginBottom: 20,
                  paddingHorizontal: '5%',
                  alignItems: 'center',
                  alignSelf: 'center',
                  flexDirection: 'row',
                }}
                onPress={() => {
                  navigation.push('Search');
                }}
              >
                <Image
                  source={require('../../assets/Search.png')}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            }
            renderItem={({item}) => {
              return (
                <Swipeable
                  rightButtons={[
                    <TouchableOpacity
                      style={{
                        backgroundColor: color.appPrimary,
                        height: '100%',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        dispatch({
                          type: REMOVE_INGREDIENT,
                          payload: {userID: auth().currentUser.uid, item},
                        });
                      }}
                    >
                      <Image
                        source={require('../../assets/X.png')}
                        style={{
                          width: 16,
                          height: 16,
                          resizeMode: 'contain',
                          marginLeft: 30,
                        }}
                      />
                    </TouchableOpacity>,
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      marginVertical: 20,
                      marginLeft: 10,
                    }}
                  >
                    {item.name}
                  </Text>
                </Swipeable>
              );
            }}
            contentContainerStyle={{paddingBottom: '30%'}}
            showsVerticalScrollIndicator={false}
            SectionSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: 1,
                  }}
                />
              );
            }}
            renderSectionHeader={({section: {title}}) => {
              return (
                <View>
                  <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                    {title}
                  </Text>
                </View>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
