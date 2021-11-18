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
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import GoButton from '../../components/goButton';
import color from '../../styles/color';
import loginStyles from './loginStyles';

export default function Forgot({navigation}) {
  const [email, onEmailChange] = useState('');
  const emailInput = useRef(null);

  // Reset Password User
  async function resetPassword(loginEmail) {
    if (loginEmail !== '') {
      await auth()
        .sendPasswordResetEmail(loginEmail)
        .then(res => {
          console.log(res);
        });
    } else {
      console.log('Email Cannot Be Empty');
      Alert.alert(
        "Error",
        "Email Cannot Be Empty"
        ); 
    }
  }

  // Function to Pass
  const submitForm = myEmail => {
    resetPassword(myEmail);
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
                  color: color.appPrimary,
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
                ref={emailInput}
              />
              <View style={{marginTop: 80}}>
                {GoButton("Let's go!", () => {
                  submitForm(email);
                })}
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
