import React, { useEffect } from 'react';
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
import webrecipeStyle from './webrecipeStyle';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import GoButton from '../../components/goButton';
import { GET_USER } from '../../actions/accountActions';
import { FlatList } from 'react-native-gesture-handler';

export default function webrecipe({ navigation }) {
  const dispatch = useDispatch();
  const onboarded = useSelector(state => state.globalReducer.onboardReducer);

  useEffect(() => {
    dispatch({ type: GET_USER, userID: auth().currentUser.uid });
  }, [dispatch]);

  if (!onboarded) {
    navigation.replace('ShoppingStyle');
  } else {
    return (
      <SafeAreaView>
        <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={webrecipeStyle.Title}>
              <Text> New Recipe </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Image
                source={require("../../assets/Back.png")}
                style={{
                  tintColor: 'black',
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                  marginLeft: 25
                }}
              />
            </TouchableOpacity>
          </View>} />
      </SafeAreaView>
    );
  }

  return null;
}
