import {StyleSheet} from 'react-native'
import color from '../../styles/color';

export default StyleSheet.create({
    Title: {
        fontSize: 26,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: color.black,
        marginLeft: 15,
        flex: 8,
        textAlign: 'center',
    },
    textBox: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: color.textGray,
        borderRadius: 35,
        paddingHorizontal: 18,
        paddingVertical: 16
    },
    numberBox: {
        borderWidth: 1,
        borderColor: color.textGray,
        borderRadius: 35,
        paddingHorizontal: 30,
        paddingVertical: 8,
    },
    textInput: {
        height: 16,
        borderColor: color.gray,
        paddingTop: 0,
        paddingBottom: 0,
    },
    description: {
        borderRadius: 25,
    },
    descriptionText: {
        paddingTop: 0,
        paddingBottom: 0,
        height: 150,
    },
    tabtext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: color.black,
        alignSelf: 'center',
    }

})