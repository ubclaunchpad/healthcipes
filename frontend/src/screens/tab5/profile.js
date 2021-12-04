import React, {useEffect, useRef, useMemo, useState} from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import GoButton from '../../components/goButton';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import profileStyle from './profileStyle';
import color from '../../styles/color';
import {GET_USER} from '../../actions/accountActions';
import { FlatList } from 'react-native-gesture-handler';
import { GET_LIKEDRECIPES } from '../../actions/profileActions';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const onboarded = useSelector(state => state.globalReducer.onboardReducer);
  const user = useSelector(state => state.accountReducer.userInfoReducer);
  const likedFeed = useSelector(
    state => state.profileReducer.likedRecipeReducer,
  );
  const myRecipeFeed = useSelector(
    state => state.myReducer.myRecipeReducer,
  );
  const [page, setPage] = useState('Liked');
  const bottomSheetRef = useRef(null);
  const flatListRef = useRef(null);
  const snapPoints = useMemo(() => ['70%'], []);

  useEffect(() => {
    dispatch({type: GET_USER, userID: auth().currentUser.uid});
  }, [dispatch]);

  useEffect(() => {
    dispatch({type: GET_LIKEDRECIPES, userID: auth().currentUser.uid});
  }, [dispatch]);

  useEffect(() => {
    dispatch({type: GET_MYRECIPES, userID: auth().currentUser.uid});
  }, [dispatch]);

function profileTab(tab) {
    if (tab === 'Liked')
    {
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
    }
    else {
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
              mar: 0,
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
        onResponderEnd={() => {
            bottomSheetRef.current.close();
          }}
        numColumns={2}
        contentContainerStyle={{paddingBottom: '15%'}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        style={{marginTop: 20,}}
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
                    marginRight: index % 2 == 0 ? 10 : 0,
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
  )
}

function myRecipes() {
  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={myRecipeFeed}
        showsVerticalScrollIndicator={false}
        onResponderEnd={() => {
            bottomSheetRef.current.close();
          }}
        numColumns={2}
        contentContainerStyle={{paddingBottom: '15%'}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        style={{marginTop: 20,}}
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
                    marginRight: index % 2 == 0 ? 10 : 0,
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
  )
}
if (!onboarded) {
    navigation.replace('ShoppingStyle');
  } else {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#447551'}}>
      <View //Header Component
        style ={{
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
              onPress={() => { /* N/A */ }}>
              <Image
                source={require('../../assets/Searchprofile.png')}
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
            <Image
              source={require('../../assets/Profilepicture.png')}
              style = {profileStyle.profilePicture}
            />
            <TouchableOpacity
              onPress={() => {navigation.push('EditProfile')}}>
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
        <Text style={profileStyle.userTitle}>Name Lastname</Text>
        <Text style={profileStyle.userName}>@username</Text>
      </View>
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <View style={{flex: 1, paddingHorizontal: '3%'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8,}}>
          {profileTab('Liked')}
          {profileTab('Myrecipes')}
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
