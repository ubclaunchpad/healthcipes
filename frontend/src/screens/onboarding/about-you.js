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
import GoButton from '../../components/goButton';

export default function AboutYou({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Tell us about yourself</Text>
      {GoButton('Select', () => {
        navigation.replace('MainTabs');
      })}
    </SafeAreaView>
  );
}
