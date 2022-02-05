import {StyleSheet} from 'react-native'
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
        height: 12,
        marginLeft: 60,
        marginRight: 60,
        borderBottomWidth: 1,
        borderColor: color.gray,
        paddingBottom: 5,
      },

})