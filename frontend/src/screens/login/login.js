import React, {useState, useRef} from 'react';
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
import GoButton from '../../components/goButton';
import color from '../../styles/color';
import loginStyles from './loginStyles';

export default function Login({navigation}) {
  const [email, onEmailChange] = useState('');
  const [password, onPasswordChange] = useState('');
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  // Login User
  async function login(loginEmail, loginPassword) {
    if (loginEmail !== '') {
      if (loginPassword !== '') {
        await auth()
          .signInWithEmailAndPassword(loginEmail, loginPassword)
          .then(res => {
            console.log(res);
          });
      } else {
        console.log('Password Cannot Be Empty');
      }
    } else {
      console.log('Email Cannot Be Empty');
    }
  }

  // Function to Pass
  const submitForm = (myEmail, myPassword) => {
    login(myEmail, myPassword);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{flex: 1, margin: 20}}
            onPress={() => {
              navigation.pop();
            }}>
            <Image
              source={require('../../assets/Back.png')}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              paddingHorizontal: '15%',
              paddingBottom: '30%',
              flex: 3,
            }}>
            <View style={{flex: 3}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Login
              </Text>
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
                ref={passwordInput}
              />
              <View style={{marginTop: 80}}>
                {GoButton("Let's go!", () => {
                  submitForm(email, password);
                })}
              </View>
              <TouchableOpacity
                style={{alignSelf: 'center', marginTop: 30}}
                onPress={() => {
                  navigation.push('Forgot');
                }}>
                <Text style={{fontWeight: '300'}}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
