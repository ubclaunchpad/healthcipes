import React, {useState, useRef} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import LoginButton from '../../components/loginButton';
import color from '../../styles/color';
import loginStyles from './loginStyles';

export default function Forgot({navigation}) {
  const [email, onEmailChange] = useState('');
  const [password, onPasswordChange] = useState('');
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const localStyle = StyleSheet.create({
    ForgotButton: {
      alignSelf: 'flex-start',
      marginLeft: '10%',
      padding: 0,
      paddingBottom: 30,
    },
    ForgotTitle: {
      fontSize: 12,
    },
  });

  // Login User
  async function login(loginEmail, loginPassword) {
    if (loginEmail !== '') {
      if (loginPassword !== '') {
      } else {
        console.log('Password Cannot Be Empty');
      }
    } else {
      console.log('Email Cannot Be Empty');
    }
  }

  // Function to Pass
  const submitForm = () => {
    login(email, password);
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
                  fontSize: 30,
                  fontWeight: 'bold',
                  width: '70%',
                  marginBottom: 30,
                }}>
                Forgot Password?
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
              <View style={{marginTop: 80}}>
                {LoginButton("Let's go!", submitForm)}
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
