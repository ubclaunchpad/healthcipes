import React, {useEffect} from 'react';
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
import profileStyle from './profileStyle';
import {GET_USER} from '../../actions/accountActions';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const onboarded = useSelector(state => state.globalReducer.onboardReducer);

  useEffect(() => {
    dispatch({type: GET_USER, userID: auth().currentUser.uid});
  }, [dispatch]);

  if (!onboarded) {
    navigation.replace('ShoppingStyle');
  } else {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#447551'}}>
      <View>
        <Text style={profileStyle.userTitle}>Name Lastname</Text>
        <Text style={profileStyle.userName}>@username</Text>
      </View>
      </SafeAreaView>
    );
  }

  return null;
}
