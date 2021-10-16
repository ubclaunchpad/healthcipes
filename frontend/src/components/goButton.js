import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import color from '../styles/color';

export default function GoButton(text, action) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color.black,
        width: '80%',
        alignSelf: 'center',
        height: 50,
        borderRadius: 29,
        justifyContent: 'center',
      }}
      onPress={action}>
      <Text
        style={{
          color: color.white,
          alignSelf: 'center',
          fontSize: 16,
          fontWeight: '700',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
