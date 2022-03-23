import React from 'react';
import {View, StyleSheet, Image, Modal} from 'react-native';
import colors from '../styles/color';

export default function Alert(alertVisible, text) {
  const styles = StyleSheet.create({
    wrapper: {
      zIndex: 10,
      backgroundColor: 'rgba(255,255,255,0.6)',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      justifyContent: 'center',
    },
    loaderContainer: {
      width: 100,
      height: 100,
      backgroundColor: colors.transparent,
      borderRadius: 15,
      position: 'absolute',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    loaderImage: {
      width: 200,
      height: 200,
      alignSelf: 'center',
      resizeMode: 'contain',
    },
  });

  return (
    <View>
        <Text>
            
        </Text>
    </View>
  );
}
