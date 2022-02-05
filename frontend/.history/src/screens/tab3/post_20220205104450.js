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
import {GET_USER} from '../../actions/accountActions';

export default function Post({navigation}) {
  const dispatch = useDispatch();
  const onboarded = useSelector(state => state.globalReducer.onboardReducer);

  useEffect(() => {
    dispatch({type: GET_USER, userID: auth().currentUser.uid});
  }, [dispatch]);

  if (!onboarded) {
    navigation.replace('ShoppingStyle');
  } else {
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

  return null;
}
