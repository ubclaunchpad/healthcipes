import React from 'react';
import { StyleSheet } from 'react-native';
import color from '../../styles/color';

export default StyleSheet.create({
    Title: {
        fontSize: 26,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: color.black,
        marginLeft: 15,
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