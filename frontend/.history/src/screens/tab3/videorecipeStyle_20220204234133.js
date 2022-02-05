import {StyleSheet} from 'react-native'
import { blue100 } from 'react-native-paper/lib/typescript/styles/colors';
import color from '../../styles/color';

export default StyleSheet.create({
    Title: {
        fontSize: 26,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: color.black,
        marginLeft: 15,
    },
    Next: {
        fontSize: 18,
        color: color.lightGey,
    },
    textInput: {
        height: 16,
        borderColor: color.gray,
      },
    textBox: {
        borderWidth: 1,
        borderColor: color.textGray,
        borderRadius: 35,
        paddingHorizontal: 18,
    }

})