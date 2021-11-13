import React, {useEffect, useRef, useMemo} from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import GoButton from '../../components/goButton';
import BottomSheet from '@gorhom/bottom-sheet';
import profileStyle from './profileStyle';
import color from '../../styles/color';
import {GET_USER} from '../../actions/accountActions';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const onboarded = useSelector(state => state.globalReducer.onboardReducer);
  const user = useSelector(state => state.accountReducer.userInfoReducer);
  const featuredFeed = useSelector(
    state => state.recipeReducer.featureFeedReducer,
  );
  const forYouFeed = useSelector(
    state => state.recipeReducer.forYouFeedReducer,
  );
  const bottomSheetRef = useRef(null);
  const flatListRef = useRef(null);
  const snapPoints = useMemo(() => ['80%'], []);

  useEffect(() => {
    dispatch({type: GET_USER, userID: auth().currentUser.uid});
  }, [dispatch]);

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
              onPress={() => { /*navigation.push('updateprofile') */ }}>
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
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderWidth: 1,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          marginBottom: 20,
        }}
      />
      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        index={-1}
        snapPoints={snapPoints}>
      </BottomSheet>
      </SafeAreaView>

    );
  }

  return null;
}
