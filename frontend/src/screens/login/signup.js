import React, {useState, useRef} from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import GoButton from '../../components/goButton';
import color from '../../styles/color';
import loginStyles from './loginStyles';
import {POST_USER} from '../../actions/accountActions';
import {SET_ONBOARDING} from '../../actions/globalActions';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export default function SignUp({navigation}) {
  const dispatch = useDispatch();
  const [username, onUsernameChange] = useState('');
  const [email, onEmailChange] = useState('');
  const [password, onPasswordChange] = useState('');
  const [confirmPassword, onConfirmChange] = useState('');
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmInput = useRef(null);

  // Sign Up User
  async function signUp(
    newUsername,
    newEmail,
    newPassword,
    newConfirmPassword,
  ) {
    const usernameLower = newUsername.toLowerCase();
    if (newEmail !== '') {
      if (newPassword !== '') {
        if (newPassword === newConfirmPassword) {
          if (newPassword.length >= 6) {
            if (
              usernameLower.length <= 30 &&
              !usernameLower.includes('/') &&
              usernameLower.length >= 1
            ) {
              dispatch({type: SET_ONBOARDING, onboarded: false});
              await auth()
                .createUserWithEmailAndPassword(newEmail, newPassword)
                .then(result => {
                  console.log(result);

                  result.user.updateProfile({
                    displayName: usernameLower,
                  });

                  dispatch({
                    type: POST_USER,
                    payload: {
                      user_id: result.user.uid,
                      username: usernameLower,
                      email: newEmail,
                    },
                  });
                });
            } else {
              console.log('Invalid Username');
              Alert.alert('Error', 'Invalid Username');
            }
          } else {
            console.log('Invalid Password');
            Alert.alert(
              'Invalid Password',
              'Your password needs to be at least 6 digits long',
            );
          }
        } else {
          console.log('Password Does Not Match');
          Alert.alert('Error', 'Password Does Not Match');
        }
      } else {
        console.log('Password Cannot Be Empty');
        Alert.alert('Error', 'Password Cannot Be Empty');
      }
    } else {
      console.log('Email Cannot Be Empty');
      Alert.alert('Error', 'Email Cannot Be Empty');
    }
  }

  // Function to Pass
  const submitForm = (
    newUsername,
    newEmail,
    newPassword,
    newConfirmPassword,
  ) => {
    signUp(newUsername, newEmail, newPassword, newConfirmPassword);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? '' : ''}
        style={{flex: 1}}
        contentContainerStyle={{flex: 1}}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
          <View
            style={{
              paddingHorizontal: '15%',
              flex: 1,
            }}
          >
            <Image
              source={require('../../assets/Logo.png')}
              style={{
                width: '50%',
                resizeMode: 'contain',
                alignSelf: 'center',
                flex: 1.5,
              }}
            />

            <View style={{flex: 2.5}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: color.appPrimary,
                }}
              >
                Register
              </Text>
              <TextInput
                textContentType="username"
                placeholder="Username"
                autoCorrect={false}
                onChangeText={text => onUsernameChange(text)}
                value={username}
                style={loginStyles.textInput}
                placeholderTextColor={color.gray}
                onSubmitEditing={() => {
                  emailInput.current.focus();
                }}
              />
              <TextInput
                textContentType="emailAddress"
                placeholder="Email"
                autoCorrect={false}
                onChangeText={text => onEmailChange(text)}
                value={email}
                style={loginStyles.textInput}
                placeholderTextColor={color.gray}
                onSubmitEditing={() => {
                  passwordInput.current.focus();
                }}
                ref={emailInput}
              />
              <TextInput
                textContentType="newPassword"
                secureTextEntry
                placeholder="Password"
                autoCorrect={false}
                onChangeText={text => onPasswordChange(text)}
                value={password}
                style={loginStyles.textInput}
                placeholderTextColor={color.gray}
                onSubmitEditing={() => {
                  confirmInput.current.focus();
                }}
                ref={passwordInput}
              />
              <TextInput
                textContentType="newPassword"
                secureTextEntry
                placeholder="Confirm Password"
                autoCorrect={false}
                onChangeText={text => onConfirmChange(text)}
                value={confirmPassword}
                style={loginStyles.textInput}
                placeholderTextColor={color.gray}
                ref={confirmInput}
              />
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              {GoButton('Sign Up', () => {
                submitForm(username, email, password, confirmPassword);
              })}
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => {
                  navigation.push('Login');
                }}
              >
                <Text style={{fontWeight: '300'}}>
                  Already have an account?{'   '}Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
