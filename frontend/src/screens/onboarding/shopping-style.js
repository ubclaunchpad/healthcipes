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
import PagerView from 'react-native-pager-view';
import GoButton from '../../components/goButton';

export default function ShoppingStyle({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        padding: '10%',
        paddingVertical: '20%',
      }}>
      <Text style={{fontSize: 30, fontWeight: 'bold', width: '80%', flex: 0.5}}>
        How do you pick a recipe?
      </Text>
      <PagerView
        style={{flex: 3, marginVertical: 30}}
        showPageIndicator={true}
        initialPage={0}>
        <View key="1">
          <Image
            source={require('../../assets/RecipeDriven.png')}
            style={{
              width: '90%',
              resizeMode: 'contain',
              alignSelf: 'center',
              flex: 1.5,
            }}
          />
        </View>
        <View key="2">
        <Image
            source={require('../../assets/IngredientDriven.png')}
            style={{
              width: '90%',
              resizeMode: 'contain',
              alignSelf: 'center',
              flex: 1.5,
            }}
          />
        </View>
      </PagerView>
      {GoButton('Select', () => {
        navigation.push('AboutYou');
      })}
    </View>
  );
}
