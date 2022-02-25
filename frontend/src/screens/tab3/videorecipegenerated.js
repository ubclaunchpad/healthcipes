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
import {POST_VIDEO_URL} from '../../actions/recipeActions'
import videorecipeStyle from './videorecipeStyle';
import newrecipeStyle from './newrecipeStyle';
import {launchImageLibrary} from 'react-native-image-picker';
import color from '../../styles/color';
import { FlatList } from 'react-native-gesture-handler';
import BatchedBridge from 'react-native/Libraries/BatchedBridge/BatchedBridge';
import { black, green100 } from 'react-native-paper/lib/typescript/styles/colors';

export default function Post({navigation}) {
    const dispatch = useDispatch();
    const onboarded = useSelector(state => state.globalReducer.onboardReducer);
    const videoRecipe = useSelector(state => state.recipeReducer.videoRecipeReducer)

    useEffect(() => {
    dispatch({type: GET_USER, userID: auth().currentUser.uid});
    }, [dispatch]);

    const [recipeImage, setrecipeImage] = useState('');
    const [page, setPage] = useState('Info')

    function recipeTab(tab) {
        if (tab === 'Info') {
          return (
            <TouchableOpacity
              onPress={() => {
                setPage(tab);
              }}
              style={{
                borderBottomWidth: page === tab ? 2 : 0,
                paddingBottom: 15,
                borderColor: color.black,
                alignItems: 'center',
                flex: 1,
              }}>
            <Text style={videorecipeStyle.tabtext}> Info </Text>
            </TouchableOpacity>
          );
        }
        else if (tab === "Ingredients") {
          return (
            <TouchableOpacity
              onPress={() => {
                setPage(tab);
              }}
              style={{
                borderBottomWidth: page === tab ? 2 : 0,
                paddingBottom: 15,
                borderColor: color.black,
                alignItems: 'center',
                flex: 1,
              }}>
              <Text style={videorecipeStyle.tabtext}> Ingredients </Text>
            </TouchableOpacity>
          );
        }
        else {
            return (
                <TouchableOpacity
                    onPress={() => {
                        setPage(tab);
                    }}
                    style={{
                        borderBottomWidth: page === tab ? 2 : 0,
                        paddingBottom: 15,
                        borderColor: color.black,
                        alignItems: 'center',
                        flex: 1,
                    }}>
                    <Text style={videorecipeStyle.tabtext}> Steps </Text>
                </TouchableOpacity>
            );
        }
    }

    function infoTab() {
        return(
            <View>
                <View style={videorecipeStyle.textBox}>
                    <Text> {videoRecipe['name']} </Text>
                </View>
                <View style={[videorecipeStyle.textBox, videorecipeStyle.description]}>
                    <Text> {videoRecipe['recipe_description']} </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 30,
                }}>
                    <Text style={videorecipeStyle.tabtext}> Servings </Text>
                    <View style={{
                        borderWidth: 1,
                        borderColor: color.textGray,
                        borderRadius: 35,
                        paddingHorizontal: 30,
                        paddingVertical: 8,
                        marginLeft: 20,
                    }}>
                        <Text> 4 </Text>
                    </View>
                </View>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: color.black,
                    marginTop: 24, 
                }}> Time </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 23
                }}>
                    <View style={{
                         alignItems: 'center',
                         flex: 1,
                    }}>
                        <Text style={{
                            fontSize: 16,
                        }}> Preparation </Text>
                        <View style={{
                            borderWidth: 1,
                            borderColor: color.textGray,
                            borderRadius: 35,
                            paddingHorizontal: 30,
                            paddingVertical: 8,
                            marginTop: 20
                        }}>
                            <Text> 1:50 hrs </Text>
                        </View>
                    </View>
                    <View style={{
                        alignItems: 'center',
                        flex: 1,
                    }}>
                        <Text style={{
                            fontSize: 16,
                        }}> Cooking Time</Text>
                        <View style={{
                            borderWidth: 1,
                            borderColor: color.textGray,
                            borderRadius: 35,
                            paddingHorizontal: 30,
                            paddingVertical: 8,
                            marginTop: 20
                        }}>
                            <Text> 4:50 hrs </Text>
                        </View>
                    </View>
                </View>             
            </View>    
        );
    }

    function ingredientsTab() {
        return (
            <Text> No ingredients here :)</Text>
        );
    }

    function stepsTab() {
        return (
            <Text> No steps here :)</Text>
        );
    }

    if (!onboarded) {
        navigation.replace('ShoppingStyle');
    } 
    else {
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
                    <View style={{marginTop: 20, marginBottom: 300}}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 8,
                            }}>
                            {recipeTab('Info')}
                            {recipeTab('Ingredients')}
                            {recipeTab('Steps')}
                        </View>
                            {page === "Info" && infoTab()}
                            {page === "Ingredients" && ingredientsTab()}
                            {page === "Steps" && stepsTab()}
                    </View>
                </View>
            }
            />
        </SafeAreaView>
        );
    }

    return null;
}