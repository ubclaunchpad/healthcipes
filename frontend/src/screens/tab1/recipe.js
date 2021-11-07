import React, {useEffect, useRef, useMemo, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {GET_USER} from '../../actions/accountActions';
import {GET_FEED} from '../../actions/feedActions';
import color from '../../styles/color';
import feedStyle from './feedStyle';
import AccordionItem from '../../components/accordionItem';

export default function Recipe({navigation, route}) {
  const {recipe} = route.params;
  const dispatch = useDispatch();
  const [page, setPage] = useState('Info');
  const user = useSelector(state => state.accountReducer.userInfoReducer);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['60%', '88%'], []);

  useEffect(() => {
    dispatch({type: GET_USER, userID: auth().currentUser.uid});
  }, [dispatch]);

  useEffect(() => {
    dispatch({type: GET_FEED, user: user});
  }, [dispatch, user]);

  const ingredients = ['2 tsp olive oil', '1 brown onion', '2 garlic cloves'];
  const steps = [
    'Melt the butter in a large saucepan over medium-high heat until foaming. Add the flour and cook, stirring, for 1-2 minutes or until mixture bubbles and begins to come away from the side of the pan. Remove from heat.',
    'Melt the butter in a large saucepan over medium-high heat until foaming. Add the flour and cook, stirring, for 1-2 minutes or until mixture bubbles and begins to come away from the side of the pan. Remove from heat.',
    'Melt the butter in a large saucepan over medium-high heat until foaming. Add the flour and cook, stirring, for 1-2 minutes or until mixture bubbles and begins to come away from the side of the pan. Remove from heat.',
  ];

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
            <TouchableOpacity
              onPress={() => {
                setPage('Info');
              }}
              style={{borderBottomWidth: 2, borderColor: color.appPrimary}}>
              <Text style={{padding: 10}}>Info</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPage('Ingredients');
              }}
              style={{borderBottomWidth: 2, borderColor: color.appPrimary}}>
              <Text style={{padding: 10}}>Ingredients</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPage('Steps');
              }}
              style={{borderBottomWidth: 2, borderColor: color.appPrimary}}>
              <Text style={{padding: 10}}>Steps</Text>
            </TouchableOpacity>
          </View>
          {page === 'Info' && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={feedStyle.recipeTitle}>{recipe.name}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../../assets/defaultProfile.png')}
                    style={{
                      width: 24,
                      height: 24,
                      resizeMode: 'contain',
                      marginRight: 5,
                    }}
                  />
                  <View style={{flexDirection: 'column'}}>
                    <Text>Harin W</Text>
                    <Text>Date</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../../assets/Time.png')}
                    style={{
                      width: 24,
                      height: 24,
                      resizeMode: 'contain',
                      marginRight: 5,
                    }}
                  />
                  <Text>2h 30m</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../../assets/Serving.png')}
                    style={{
                      width: 24,
                      height: 24,
                      resizeMode: 'contain',
                      marginRight: 5,
                    }}
                  />
                  <Text>10 Servings</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 30,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    borderColor: color.appPrimary,
                    borderRadius: 20,
                    borderWidth: 2,
                    padding: 10,
                    alignItems: 'center',
                    width: '20%',
                  }}>
                  <Text>507</Text>
                  <Text style={{fontSize: 10}}>Calories</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    borderColor: color.appPrimary,
                    borderRadius: 20,
                    borderWidth: 2,
                    padding: 10,
                    alignItems: 'center',
                    width: '20%',
                  }}>
                  <Text>507</Text>
                  <Text style={{fontSize: 10}}>Protein</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    borderColor: color.appPrimary,
                    borderRadius: 20,
                    borderWidth: 2,
                    padding: 10,
                    alignItems: 'center',
                    width: '20%',
                  }}>
                  <Text>507</Text>
                  <Text style={{fontSize: 10}}>Fiber</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    borderColor: color.appPrimary,
                    borderRadius: 20,
                    borderWidth: 2,
                    padding: 10,
                    alignItems: 'center',
                    width: '20%',
                  }}>
                  <Text>507</Text>
                  <Text style={{fontSize: 10}}>Fat</Text>
                </View>
              </View>
              <View>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
                  About this Recipe
                </Text>
                <Text>
                  Homemade Lasagna is a classic that every cook should have in
                  their rotation. Tender sheets of pasta, a cheese filling, and
                  a rich meaty tomato sauce make the perfect dish!
                </Text>
              </View>
            </View>
          )}
          {page === 'Ingredients' && (
            <BottomSheetFlatList
              contentContainerStyle={{paddingTop: 20}}
              data={ingredients}
              keyExtractor={i => i}
              renderItem={({item}) => {
                return (
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../assets/Plus.png')}
                      style={{
                        width: 24,
                        height: 24,
                        resizeMode: 'contain',
                        marginRight: 5,
                      }}
                    />
                    <Text>{item}</Text>
                  </View>
                );
              }}
            />
          )}
          {page === 'Steps' && (
            <BottomSheetFlatList
              contentContainerStyle={{paddingTop: 20, paddingBottom: '30%'}}
              data={steps}
              keyExtractor={i => i}
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
          )}
        </View>
      </BottomSheet>
    </View>
  );
}
