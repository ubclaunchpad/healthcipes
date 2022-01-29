import React, {useEffect, useRef, useMemo, useState} from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Image,
  ImageBackground,
  ColorPropType,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Chip} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import GoButton from '../../components/goButton';
import profileStyle from './profileStyle';
import color from '../../styles/color';
import {GET_USER} from '../../actions/accountActions';
import {PUT_USER} from '../../actions/accountActions';
import { FlatList } from 'react-native-gesture-handler';
import ProfileChips from '../../components/filterChips';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';

export default function EditProfile({navigation}) {
  const dispatch = useDispatch();
  const onboarded = useSelector(state => state.globalReducer.onboardReducer);
  const user = useSelector(state => state.accountReducer.userInfoReducer);
  const [response, setResponse] = React.useState('');

  const [firstname, onFirstNameChange] = useState('');
  const [lastname, onLastNameChange] = useState('');
  const [username, onUsernameChange] = useState('');
  const [email, onEmailChange] = useState('');

  const firstnameInput = useRef(null);
  const lastnameInput = useRef(null);
  const emailInput = useRef(null);
  const usernameInput = useRef(null);
  const [profPic, setProfPic] = useState('');
  
  useEffect(() => {
    dispatch({type: GET_USER, userID: auth().currentUser.uid});
  }, [dispatch]);

  useEffect(() => {
    storage()
      .refFromURL(`gs://umami-2021.appspot.com/Users/${user.user_id}.jpg`)
      .getDownloadURL()
      .then(res => {
        setProfPic({uri: res});
      })
      .catch(e => {
        console.log('No User Image: ' + e);
      });
  }, [user]);

  async function updateForm (firstname, lastname, username, email) {
    const usernameLower = username.toLowerCase();
    if (firstname !== '') {
      if (lastname !== '') {
        if (         
          usernameLower.length <= 30 &&
          !usernameLower.includes('/') &&
          usernameLower.length >= 1          
          ) {
            if (
              email !== '' &&
              email.includes('@')
            ) {

              var user = auth().currentUser;
              user.updateEmail(email).then(() => {
                console.log('success')
                dispatch({
                  type: PUT_USER,
                  payload: {
                    user_id: user.uid,
                    username: usernameLower,
                    first_name: firstname,
                    last_name: lastname,
                    email: email,
                  },
                });
              }).catch((error) => {
                console.log(error)
              });

            } else {
              console.log('Invalid Email');
              Alert.alert(
              "Invalid Email",
              "Your email needs to be a valid email"
              ); 
             
            }
          } else {
            console.log('Invalid Username');
            Alert.alert(
              "Error",
              "Invalid Username"
              );     
          }
        } else {
          console.log('Last Name Does Not Match');
          Alert.alert(
            "Error",
            "Last Name Does Not Match"
            ); 
        }
      } else {
        console.log('First Name Cannot Be Empty');
        Alert.alert(
          "Error",
          "First Name Cannot Be Empty"
          ); 
      }
  }

  const submitForm = (
    Firstname,
    Lastname,
    Username,
    Email,
  ) => {
    updateForm(Firstname, Lastname, Username, Email,);
  };

  const dietList = {
    Vegetarian: 'vegetarian',
    Vegan: 'vegan',
    Pescatarian: 'pescatarian',
    'Gluten-free': 'gluten_free',
    'Dairy-free': 'dairy_free',
    Keto: 'keto',
    Paleo: 'paleo',
  };
  const styles = StyleSheet.create({
    chipStyle: {
      marginRight: 10,
      marginBottom: 15,
      borderRadius: 50,
    },
    chipTextStyle: {
      fontSize: 18,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
  });

if (!onboarded) {
    navigation.replace('ShoppingStyle');
  } else {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: color.white,}}>
        <FlatList
          ListHeaderComponent={
            <View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    marginTop: '10%',
                    marginLeft: '5%',
                  }}
                  onPress={() => {
                    navigation.pop();
                  }}>
                  <Image 
                    source={require('../../assets/Back.png')}
                    style={{
                      resizeMode: 'contain',
                      width: 30,
                      height: 30,
                      tintColor: color.black,
                    }}
                  />
                </TouchableOpacity>
                <Text
                    style={{
                      marginBottom: '5%',
                      marginTop: '9.5%',
                      fontSize: 30,
                      color: 'black',
                      fontWeight: 'bold',
                      flex: 2.3,
                      alignSelf: 'center',
                    }}>
                    Edit Profile
                  </Text>
              </View>
              <View style={profileStyle.editprofilepictureContainer}>
                <ImageBackground
                  source={profPic}
                  style={profileStyle.editprofilePicture}
                >
                </ImageBackground>
                <TouchableOpacity onPress={() => {
                    launchImageLibrary({
                      selectionLimit: 1,
                      mediaType: 'photo',
                      includeBase64: false,
                    }, setResponse)
                    setProfPic(response?.assets[0].uri)
                }}>
                      <Image
                        source={require('../../assets/Editprofilepicture.png')}
                        style={profileStyle.editprofilepicturebutton}
                      />
                </TouchableOpacity>
              </View>
              <View>
                <Text style = {profileStyle.inputTitle}>
                  First Name
                </Text>
                <TextInput
                  textContentType="firstname"
                  placeholder=""
                  autoCorrect={false}
                  onChangeText={text => onFirstNameChange(text)}
                  value={firstname}
                  style={profileStyle.textInput}
                  placeholderTextColor={color.gray}
                  onSubmitEditing={() => {
                    firstnameInput.current.focus();
                  }}
                />
                <Text style = {profileStyle.inputTitle}>
                  Last Name
                </Text>
                <TextInput
                  textContentType="lastname"
                  placeholder=""
                  autoCorrect={false}
                  onChangeText={text => onLastNameChange(text)}
                  value={lastname}
                  style={profileStyle.textInput}
                  placeholderTextColor={color.gray}
                  onSubmitEditing={() => {
                    lastnameInput.current.focus();
                  }}
                />
                <Text style = {profileStyle.inputTitle}>
                  Username
                </Text>
                <TextInput
                  textContentType="username"
                  placeholder=""
                  autoCorrect={false}
                  onChangeText={text => onUsernameChange(text)}
                  value={username}
                  style={profileStyle.textInput}
                  placeholderTextColor={color.gray}
                  onSubmitEditing={() => {
                    usernameInput.current.focus();
                  }}
                />
                <Text style = {profileStyle.inputTitle}>
                  Email
                </Text>
                <TextInput
                  textContentType="email"
                  placeholder=""
                  autoCorrect={false}
                  onChangeText={text => onEmailChange(text)}
                  value={email}
                  style={profileStyle.textInput}
                  placeholderTextColor={color.gray}
                  onSubmitEditing={() => {
                    emailInput.current.focus();
                  }}
                />
              </View> 
              <View style={{
                  marginHorizontal: "8%",
                  }}> 
                  <Text style={{
                    fontSize: 17,
                    marginTop: "10%",
                    fontWeight: "700",
                    color: color.textGray,
                    marginBottom: "5%",
                    }}>
                    Dietary Requirements
                  </Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap', flex: 3}}>
                    {Object.keys(dietList).map(item => {
                      const diet = dietList[item];
                      return (
                        <Chip
                          key={item}
                          onPress={() => {
                            dispatch({
                              type: USER_INFO,
                              payload: {...user, [diet]: !user[diet]},
                            });
                          }}
                          selectedColor={color.appPrimary}
                          style={[
                            styles.chipStyle,
                            {
                              backgroundColor: user[diet] ? color.appPrimary : null,
                            },
                          ]}
                          textStyle={[
                            styles.chipTextStyle,
                            {
                              color: user[diet] ? color.white : color.textGray,
                            },
                          ]}>
                          {item}
                        </Chip>
                      );
                    })}
                  </View>
                </View>
                <View style={{
                    paddingTop: "10%",
                    width: "60%",
                    alignSelf: 'center',
                    }}>
                    {GoButton('Save', () => {
                      submitForm(firstname, lastname, username, email) 
                    })}
                <TouchableOpacity
                  onPress={() => {
                    auth().signOut();
                  }}>
                  <Text
                    style={{
                      paddingTop: '20%',
                      marginBottom: 300,
                      color: color.black,
                      alignSelf: 'center',
                      fontSize: 16,
                      fontWeight: '700',
                    }}>
                    Log Out
                  </Text>
                </TouchableOpacity>
                </View>          
            </View>
          }
      />
      </SafeAreaView>
    );
  }

  return null;
}
