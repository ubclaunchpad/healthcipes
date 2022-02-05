import React, {useEffect, useState} from 'react';
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
import videorecipeStyle from './videorecipeStyle';
import color from '../../styles/color';
import { FlatList } from 'react-native-gesture-handler';

export default function Post({navigation}) {
  const dispatch = useDispatch();
  const onboarded = useSelector(state => state.globalReducer.onboardReducer);

  useEffect(() => {
    dispatch({type: GET_USER, userID: auth().currentUser.uid});
  }, [dispatch]);

  const [RecipeName, SetRecipeName] = useState('')
  const [URL, SetURL] = useState('')
  const [Description, SetDescription] = useState('')

  if (!onboarded) {
    navigation.replace('ShoppingStyle');
  } else {
    return (
      <SafeAreaView style={{flex: 1, marginHorizontal: '5%'}}>
        <FlatList 
            ListHeaderComponent={
            <View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 20
                }}>
                    <TouchableOpacity 
                        onPress={() => {navigation.pop()}}
                    > 
                        <Image
                            source={require("../../assets/Back.png")}
                            style={{
                                tintColor: 'black',
                                height: 30,
                                width: 30,
                                resizeMode: 'contain',
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={videorecipeStyle.Title}> New Recipe </Text>
                    <TouchableOpacity>
                    <Text style={videorecipeStyle.Next}> Next </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Image
                        source={require("../../assets/BestSpaghettiInItaly.png")}
                        style={{
                            marginTop: 20,
                            borderRadius: 35,
                            height: 300,
                            width: "100%",
                        }}
                    />
                </View>
                <View style={{
                    marginTop: 10,
                }}>
                    <View style={videorecipeStyle.textBox}>
                        <TextInput
                                textContentType="firstname"
                                placeholder="Recipe Name"
                                autoCorrect={false}
                                onChangeText={text => SetRecipeName(text)}
                                value={RecipeName}
                                style={videorecipeStyle.textInput}
                                placeholderTextColor={color.gray}
                        />
                    </View>
                    <View style={videorecipeStyle.textBox}>
                        <TextInput
                                textContentType="firstname"
                                placeholder="URL"
                                autoCorrect={false}
                                onChangeText={text => SetURL(text)}
                                value={URL}
                                style={videorecipeStyle.textInput}
                                placeholderTextColor={color.gray}
                        />
                    </View>
                    <View style={[videorecipeStyle.textBox, videorecipeStyle.description]}>
                        <TextInput
                            textContentType="firstname"
                            placeholder="Description"
                            autoCorrect={false}
                            multiline={true}
                            numberOfLines={10}
                            onChangeText={text => SetDescription(text)}
                            value={Description}
                            style={[videorecipeStyle.textInput, videorecipeStyle.descriptionText]}
                            placeholderTextColor={color.gray}
                    />
                    </View>
                </View>
                <View style={{
                    paddingHorizontal: 60,
                    marginTop: 20,
                }}>
                    {GoButton('Submit', () => {
                        navigation.push('VideoRecipe');
                    })}
                </View>
            </View>
        }
        />
      </SafeAreaView>
    );
  }

  return null;
}
