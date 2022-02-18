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
import newrecipeStyle from './newrecipeStyle';
import {launchImageLibrary} from 'react-native-image-picker';
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
  const [recipeImage, setrecipeImage] = useState('');

  if (!onboarded) {
    navigation.replace('ShoppingStyle');
  } else {
    return (
      <SafeAreaView style={{flex: 1, marginHorizontal: '5%'}}>
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
                    <TouchableOpacity
                        style={{
                            aspectRatio: 1.2,
                            marginTop: '7%',
                            width: '100%',
                            backgroundColor: color.gray,
                            borderRadius: 20,
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            padding: recipeImage !== '' ? 0 : 20,
                        }}
                        onPress={() => {
                        launchImageLibrary({
                            selectionLimit: 1,
                            mediaType: 'photo',
                            includeBase64: false,
                        }).then(res => {
                            setrecipeImage({uri: res?.assets[0].uri});
                        });
                    }}>
                        <Image
                            source={
                                recipeImage !== '' ? recipeImage : require('../../assets/Logo.png')
                            }
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 20,
                                resizeMode: recipeImage !== '' ? 'cover' : 'contain',
                            }}
                         />
                        <Image
                            source={require('../../assets/EditStep.png')}
                            style={[
                                newrecipeStyle.EditStepIcon,
                                {
                                position: 'absolute',
                                bottom: 10,
                                right: 10,
                                },
                            ]}
                        />
                    </TouchableOpacity>
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
                                placeholder="Video URL"
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
                    marginBottom: 100,
                }}>
                    {GoButton('Submit', () => {
                        console.log(URL, Description, RecipeName);
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
