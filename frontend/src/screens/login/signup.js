import React, {useState, useRef} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Button,
} from 'react-native';

export default function SignUp({navigation}) {
  const [email, onEmailChange] = useState('');
  const [password, onPasswordChange] = useState('');
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
    <SafeAreaView>
      <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
        <Text>Login</Text>
        <TextInput
          keyboardType="email-address"
          textContentType="emailAddress"
          placeholder="Email"
          onChangeText={text => onEmailChange(text)}
          value={email}
          onSubmitEditing={() => {
            passwordInput.current.focus();
          }}
        />
        <TextInput
          textContentType="newPassword"
          secureTextEntry
          placeholder="Password"
          onChangeText={text => onPasswordChange(text)}
          value={password}
          ref={passwordInput}
        />
        <Button
          titleStyle={localStyle.ForgotTitle}
          buttonStyle={localStyle.ForgotButton}
          title="Forgot Password?"
          onPress={() => {
            navigation.push('Forgot');
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
