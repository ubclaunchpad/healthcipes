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
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20
              }}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                  <Image
                    source={require("../../assets/Back.png")}
                    style={{
                      tintColor: 'black',
                      height: 30,
                      width: 30,
                      resizeMode: 'contain',
                      marginLeft: 18
                    }}
                  />
                </TouchableOpacity>
                <Text style={webrecipeStyle.Title}> New Recipe </Text>
                <TouchableOpacity>
                  <Text style={webrecipeStyle.Next}> Next </Text>
                </TouchableOpacity>
              </View>
              <View style={{
                flexDirection: 'row'
              }}>
                <View style={webrecipeStyle.textBox}>
                  <TextInput style={webrecipeStyle.textInput} placeholder="Search Web" />
                  <TouchableOpacity>
                    <Image
                      source={require("../../assets/Search.png")}
                      style={{
                        height: 20,
                        width: 20,
                        resizeMode: 'contain',
                        marginLeft: 25
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <Image
                    source={require("../../assets/Filter.png")}
                    style={{
                      flex: 1,
                      height: 40,
                      width: 40,
                      resizeMode: 'contain',
                      marginTop: 30,
                    }} />
                </TouchableOpacity>
              </View>
              <View style={{
                auto: 1,
                marginLeft: 18,
                marginTop: 20
              }}>
                <Text>
                  Search Results for "Healthy Chicken Recipes"
                </Text>
              </View>
            </View>} />
      </SafeAreaView>
    );
  }
  return null;
}
