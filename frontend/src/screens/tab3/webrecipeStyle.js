import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import color from '../../styles/color';

const screenWidth = Dimensions.get('screen').width;

export default StyleSheet.create({
    Title: {
        fontSize: 26,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: color.black,
        marginLeft: 15,
        marginRight: 118
    },
    textBox: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: color.textGray,
        borderRadius: 35,
        paddingHorizontal: 18,
        paddingVertical: 16
    },
    textInput: {
        height: 16,
        borderColor: color.gray,
        paddingTop: 0,
        paddingBottom: 0,
    },
});