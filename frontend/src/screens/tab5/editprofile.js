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
  ColorPropType,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import GoButton from '../../components/goButton';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import profileStyle from './profileStyle';
import color from '../../styles/color';
import {GET_USER} from '../../actions/accountActions';
import { FlatList } from 'react-native-gesture-handler';
import { csvParseRows } from 'd3-dsv';
import { randomWeibull } from 'd3-random';

export default function EditProfile({navigation}) {
  const dispatch = useDispatch();
  const onboarded = useSelector(state => state.globalReducer.onboardReducer);
  const user = useSelector(state => state.accountReducer.userInfoReducer);
  const featuredFeed = useSelector(
    state => state.recipeReducer.featureFeedReducer,
  );
  const forYouFeed = useSelector(
    state => state.recipeReducer.forYouFeedReducer,
  );
  const [page, setPage] = useState('Liked');
  const bottomSheetRef = useRef(null);
  const flatListRef = useRef(null);
  const snapPoints = useMemo(() => ['70%'], []);

  useEffect(() => {
    dispatch({type: GET_USER, userID: auth().currentUser.uid});
  }, [dispatch]);

  //test
if (!onboarded) {
    navigation.replace('ShoppingStyle');
  } else {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: color.white,}}>
        <FlatList
          ListHeaderComponent={
            <View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    marginTop: '10%',
                    marginLeft: '5%',
                  }}
                  onPress={() => {
                    navigation.pop();
                  }}>
                  <Image 
                    source={require('../../assets/Back.png')}
                    style={{
                      resizeMode: 'contain',
                      width: 30,
                      height: 30,
                      tintColor: color.black,
                    }}
                  />
                </TouchableOpacity>
                <Text
                    style={{
                      marginTop: '9.5%',
                      fontSize: 30,
                      color: 'black',
                      fontWeight: 'bold',
                      flex: 2.3,
                      alignSelf: 'center',
                    }}>
                    Edit Profile
                  </Text>
              </View>
              <View>
                <Image 
                  source={require('../../assets/Profilepicture.png')}
                  style={profileStyle.editprofilePicture}
                />
              </View>
          </View>
          }
      />
      </SafeAreaView>
    );
  }

  return null;
}
