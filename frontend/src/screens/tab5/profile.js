import React, {useEffect, useRef, useMemo, useState} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {useDispatch, useSelector} from 'react-redux';
import BottomSheet from '@gorhom/bottom-sheet';
import profileStyle from './profileStyle';
import color from '../../styles/color';
import {GET_USER} from '../../actions/accountActions';
import {FlatList} from 'react-native-gesture-handler';
import {GET_LIKEDRECIPES, GET_MYRECIPES} from '../../actions/profileActions';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const onboarded = useSelector(state => state.globalReducer.onboardReducer);
  const user = useSelector(state => state.accountReducer.userInfoReducer);
  const likedFeed = useSelector(
    state => state.profileReducer.likedRecipeReducer,
  );
  const myRecipeFeed = useSelector(
    state => state.profileReducer.myRecipeReducer,
  );
  const [page, setPage] = useState('Myrecipes');
  const [profPic, setProfPic] = useState('');
  const bottomSheetRef = useRef(null);
  const flatListRef = useRef(null);
  const snapPoints = useMemo(() => ['70%'], []);

  useEffect(() => {
    dispatch({type: GET_USER, userID: auth().currentUser.uid});
  }, [dispatch]);

  useEffect(() => {
    dispatch({type: GET_LIKEDRECIPES, user});
  }, [dispatch, user]);

  useEffect(() => {
    dispatch({type: GET_MYRECIPES, user});
  }, [dispatch, user]);

  useEffect(() => {
    storage()
      .refFromURL(`gs://umami-2021.appspot.com/Users/${user.user_id}.jpg`)
      .getDownloadURL()
      .then(res => {
        setProfPic({uri: res});
      })
      .catch(e => {
        console.log('No User Image: ' + e);
        // dispatch({ type: SET_ALERT, alert: true });
      });
  }, [user]);

  function profileTab(tab) {
    if (tab === 'Liked') {
      return (
        <TouchableOpacity
          onPress={() => {
            setPage(tab);
          }}
          style={{
            borderBottomWidth: page === tab ? 2 : 0,
            paddingBottom: 15,
            borderColor: color.black,
            alignItems: 'center',
            flex: 1,
          }}>
          <Image
            source={require('../../assets/Liked.png')}
            style={{
              padding: 10,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            setPage(tab);
          }}
          style={{
            borderBottomWidth: page === tab ? 2 : 0,
            paddingBottom: 15,
            borderColor: color.black,
            alignItems: 'center',
            flex: 1,
          }}>
          <Image
            source={require('../../assets/Myrecipes.png')}
            style={{
              margin: 0,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      );
    }
  }

  function likedTab() {
    return (
      <View>
        <FlatList
          ref={flatListRef}
          data={likedFeed}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{paddingBottom: '100%'}}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          style={{marginTop: 20}}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Recipe', {recipe: item});
                }}
                style={{
                  width: '48%',
                  aspectRatio: 0.95,
                  borderRadius: 20,
                  marginBottom: 10,
                  mariginTop: 10,
                  marginRight: index % 2 === 0 ? 10 : 0,
                }}>
                <ImageBackground
                  source={{uri: item.header_image}}
                  resizeMode="cover"
                  borderRadius={20}
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      height: '30%',
                      paddingHorizontal: '10%',
                      paddingVertical: 10,
                      borderBottomRightRadius: 20,
                      borderBottomLeftRadius: 20,
                    }}>
                    <Text
                      style={{
                        color: color.white,
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.recipe_id}
        />
      </View>
    );
  }

  function myRecipes() {
    return (
      <View>
        <FlatList
          ref={flatListRef}
          data={myRecipeFeed}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{paddingBottom: '100%'}}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          style={{marginTop: 20}}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Recipe', {recipe: item});
                }}
                style={{
                  width: '48%',
                  aspectRatio: 0.95,
                  borderRadius: 20,
                  marginBottom: 10,
                  mariginTop: 10,
                  marginRight: index % 2 === 0 ? 10 : 0,
                }}>
                <ImageBackground
                  source={{uri: item.header_image}}
                  resizeMode="cover"
                  borderRadius={20}
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      height: '30%',
                      paddingHorizontal: '10%',
                      paddingVertical: 10,
                      borderBottomRightRadius: 20,
                      borderBottomLeftRadius: 20,
                    }}>
                    <Text
                      style={{
                        color: color.white,
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.recipe_id}
        />
      </View>
    );
  }
  if (!onboarded) {
    navigation.replace('ShoppingStyle');
  } else {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#447551'}}>
        {/* {Alerts(alert, "Profile Error")} */}
        <View //Header Component
          style={{
            paddingVertical: 45,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                /* N/A */
              }}>
              <Image
                source={require('../../assets/Searchprofile.png')}
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
            <Image source={profPic} style={profileStyle.profilePicture} />
            <TouchableOpacity
              onPress={() => {
                navigation.push('EditProfile');
              }}>
              <Image
                source={require('../../assets/More.png')}
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={profileStyle.userTitle}>
            {user.first_name} {user.last_name}
          </Text>
          <Text style={profileStyle.userName}>{user.username}</Text>
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={false}>
          <View style={{flex: 1, paddingHorizontal: '3%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              {profileTab('Myrecipes')}
              {profileTab('Liked')}
            </View>
            {page === 'Liked' && likedTab()}
            {page === 'Myrecipes' && myRecipes()}
          </View>
        </BottomSheet>
      </SafeAreaView>
    );
  }

  return null;
}
