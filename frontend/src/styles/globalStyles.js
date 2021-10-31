import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  tabIcon: {
    width: '30%',
    height: '30%',
    resizeMode: 'contain',
    marginTop: 10,
  },
  middleTabIcon: {
    width: Platform.OS === 'ios' ? 60 : 45,
    height: Platform.OS === 'ios' ? 60 : 45,
    resizeMode: 'contain',
    marginTop: Platform.OS === 'ios' ? 10 : -5,
  },
});
