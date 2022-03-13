import React from 'react';
import {SafeAreaView, Image, TouchableOpacity} from 'react-native';
import GoButton from '../../components/goButton';
import color from '../../styles/color';

export default function Post({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.appPrimary, justifyContent: 'center'}}>
      <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', marginBottom: '10%'}} onPress={() => {
          navigation.push('NewRecipe');
        }}>
        <Image
          source={require('../../assets/Add.png')}
          style={{
            width: 50,
            height: 50,
            resizeMode: 'contain'
          }}
        />
        {GoButton('New Recipe', () => {
          navigation.push('NewRecipe');
        })}
      </TouchableOpacity>
      <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', marginBottom: '10%'}} onPress={() => {
          navigation.push('VideoRecipe');
        }}>
      <Image
          source={require('../../assets/Link.png')}
          style={{
            width: 50,
            height: 50,
            resizeMode: 'contain'
          }}
        />
        {GoButton('Import via Video', () => {
          navigation.push('VideoRecipe');
        })}
      </TouchableOpacity>
      <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', marginBottom: '10%'}} onPress={() => {
          navigation.push('WebRecipe');
        }}>
      <Image
          source={require('../../assets/Link.png')}
          style={{
            width: 50,
            height: 50,
            resizeMode: 'contain'
          }}
        />
        {GoButton('Import Web Recipe', () => {
          navigation.push('WebRecipe');
        })}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
