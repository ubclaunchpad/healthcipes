import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import GoButton from '../../components/goButton';
import {GET_USER} from '../../actions/accountActions';
import {POST_VIDEO_URL} from '../../actions/recipeActions';
import videorecipeStyle from './videorecipeStyle';
import color from '../../styles/color';
import {FlatList} from 'react-native-gesture-handler';
import Alerts from '../../components/Alerts';

export default function VideoRecipe({navigation}) {
  const dispatch = useDispatch();
  const alert = useSelector(state => state.globalReducer.alertReducer);

  useEffect(() => {
    dispatch({type: GET_USER, userID: auth().currentUser.uid});
  }, [dispatch]);

  const [URL, SetURL] = useState('');

  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: '5%'}}>
      {Alerts(alert, "Video Recipe Error")}
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => {
                  navigation.pop();
                }}>
                <Image
                  source={require('../../assets/Back.png')}
                  style={{
                    tintColor: 'black',
                    height: 30,
                    width: 30,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
              <Text style={videorecipeStyle.Title}>Import via Video</Text>
              <View style={{flex: 1}} />
            </View>
            <View
              style={{
                marginTop: '70%',
              }}>
              <View style={videorecipeStyle.textBox}>
                <TextInput
                  textContentType="firstname"
                  placeholder="Video URL"
                  autoCorrect={false}
                  onChangeText={text => SetURL(text)}
                  value={URL}
                  style={videorecipeStyle.textInput}
                  placeholderTextColor={color.gray}
                />
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 60,
                marginTop: 20,
                marginBottom: 100,
              }}>
              {GoButton('Convert', () => {
                navigation.push('VideoRecipeGenerated');
                dispatch({
                  type: POST_VIDEO_URL,
                  payload: {
                    url: URL,
                  },
                });
              })}
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
