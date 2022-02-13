import React from 'react';
import {
  SafeAreaView,
  View,
} from 'react-native';
import GoButton from '../../components/goButton';

export default function Post({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        {GoButton('NewRecipe', () => {
          navigation.push('NewRecipe');
        })}
      </View>
      <View>
        {GoButton('New Video Recipe', () => {
          navigation.push('VideoRecipe');
        })}
      </View>
      <View>
        {GoButton('Import Web Recipe', () => {
          navigation.push('WebRecipe');
        })}
      </View>
    </SafeAreaView>
  );
}
