import React, { useEffect, useState } from 'react';
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
import { POST_RECIPE_URL } from '../../actions/recipeActions';

export default function webrecipe({ navigation }) {
  const dispatch = useDispatch();
  const onboarded = useSelector(state => state.globalReducer.onboardReducer);
  const [URL, setURL] = useState("");

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
                <TouchableOpacity
                  onPress={() => console.log("NEXT")}>
                  <Text style={webrecipeStyle.Next}> Next </Text>
                </TouchableOpacity>
              </View>
              <View style={{
                flexDirection: 'row'
              }}>
                <View style={webrecipeStyle.textBox}>
                  <TouchableOpacity onPress={() => {
                    console.log(URL);
                    dispatch({ type: POST_RECIPE_URL, url: URL });
                  }}>
                    <Image
                      source={require("../../assets/Search.png")}
                      style={{
                        height: 20,
                        width: 20,
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                  <TextInput
                    style={webrecipeStyle.textInput}
                    placeholder="Search Web"
                    onChangeText={(URL) => {
                      setURL(URL);
                    }} />
                </View>
                <TouchableOpacity onPress={() => console.log("FILTER")}>
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
                paddingHorizontal: 60,
                marginTop: 20,
                marginBottom: 100,
              }}>
                {GoButton('Submit', () => {
                  // save to DB
                  navigation.pop();
                })}
              </View>
            </View>} />
      </SafeAreaView>
    );
  }
  return null;
}
