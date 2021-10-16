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
import GoButton from '../../components/goButton';

let onboard = false;

export default function Feed({navigation}) {
  if (!onboard) {
    onboard = true;
    navigation.replace('ShoppingStyle');
  }

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
