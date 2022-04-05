import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  SectionList,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../styles/color';
import {GET_GROCERY} from '../../actions/groceryListActions';
import {ADD_PANTRY_INGREDIENT} from '../../actions/pantryActions';
import {
  GET_ALL_INGREDIENTS,
  SEARCH_INGREDIENTS,
} from '../../actions/groceryListActions';
import Alerts from '../../components/Alerts';
import {SET_ALERT} from '../../actions/globalActions';

export default function GroceryList({navigation}) {
  const dispatch = useDispatch();
  const alert = useSelector(state => state.globalReducer.alertReducer);
  const grocerylist = useSelector(
    state => state.groceryListReducer.groceryListReducer,
  );
  const pantrylist = useSelector(state => state.pantryReducer.pantryReducer);
  const [pantryIngredientIds, setpantryIngredientIds] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch({type: GET_GROCERY, userID: auth().currentUser.uid});
    console.log('DISPATCHING');
  }, [dispatch]);

  useEffect(() => {
    console.log('Doing the ingredient ids stage');
    const pantryIds = pantrylist.map(pantryItem => {
      const data = pantryItem.data;
      return data.map(ingredient => {
        return ingredient.id;
      });
    });
    setpantryIngredientIds(pantryIds.flat());
  }, [pantrylist]);

  const groceryItemInPantry = item => {
    const id = item.id;
    return pantryIngredientIds.includes(id);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {Alerts(alert, 'Grocery List Error')}
      <View
        disabled={true}
        style={{
          // borderBottomWidth: 2,
          borderColor: color.black,
          flexDirection: 'row',
          justifyContent: 'space-around',
          flex: 1,
          width: 250,
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 25,
        }}>
        <Text
          onPress={() => {
            dispatch({type: SET_ALERT, alert: false});
            navigation.replace('Pantry');
          }}
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            paddingVertical: 10,
            // textAlign: 'flex-end',
            marginRight: 75,
            color: color.black,
          }}>
          Pantry
        </Text>

        <View
          style={{
            borderBottomWidth: 2,
            borderColor: color.black,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              paddingVertical: 10,
              // textAlign: 'flex-start',
              marginLeft: 0,
              color: color.black,
              // textDecorationLine: "underline"
            }}>
            Grocery List
          </Text>
        </View>
      </View>

      <View style={{flex: 12, marginHorizontal: '5%', paddingBottom: 45}}>
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
          }}>
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
              paddingVertical: '5%',
              width: '100%',
            }}
            value={search}
            placeholder="Search Grocery List"
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
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              backgroundColor: color.black75,
              paddingHorizontal: 20,
              borderRadius: 29,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 100,
              height: 40,
            }}
            onPress={() => {
              navigation.push('EditGrocery');
            }}>
            <Text
              style={{
                color: color.white,
                fontSize: 18,
                fontWeight: '400',
                marginRight: 5,
              }}>
              Edit
            </Text>
            <Image
              source={require('../../assets/Edit.png')}
              style={{
                width: 16,
                height: 16,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>

        <SectionList
          stickySectionHeadersEnabled={false}
          sections={grocerylist.filter(item => item.data.length > 0)}
          style={{paddingLeft: '5%', marginRight: '5%'}}
          renderSectionFooter={() => {
            return (
              <View
                style={{
                  height: 1,
                  backgroundColor: color.black75,
                  marginBottom: 20,
                  marginTop: 2,
                }}
              />
            );
          }}
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
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <Text style={{fontSize: 18, marginVertical: 20}}>
                  {item.name}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    // add the ingredient to the pantry if it is no
                    console.log('DISPATCHING MANY MANY TIMES');
                    if (!groceryItemInPantry(item)) {
                      dispatch({
                        type: ADD_PANTRY_INGREDIENT,
                        payload: {
                          userID: auth().currentUser.uid,
                          item: [item.id, item.name, item.category],
                        },
                      });
                    }
                  }}>
                  {!groceryItemInPantry(item) && (
                    <Image
                      source={require('../../assets/Plus.png')}
                      style={{
                        marginVertical: 20,
                        width: 24,
                        height: 24,
                        resizeMode: 'contain',
                        tintColor: color.gray,
                      }}
                    />
                  )}

                  {groceryItemInPantry(item) && (
                    <Image
                      source={require('../../assets/check.png')}
                      style={{
                        marginVertical: 20,
                        marginRight: 5,
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
          contentContainerStyle={{paddingBottom: '10%'}}
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
                <Text style={{fontSize: 22, fontWeight: 'bold'}}>{title}</Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
