import React from 'react';
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
import {useSelector} from 'react-redux';
import GoButton from '../../components/goButton';

export default function Feed({navigation}) {
  const onboarded = useSelector(state => state.globalReducer.onboardReducer);

  if (!onboarded) {
    navigation.replace('ShoppingStyle');
  } else {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Text>HomeScreen</Text>
        {GoButton('Logout', () => {
          auth().signOut();
        })}
        {GoButton('Onboard (DEV)', () => {
          navigation.replace('ShoppingStyle');
        })}
      </SafeAreaView>
    );
  }

  return null;
}
