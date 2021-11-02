import {StyleSheet} from 'react-native';
import color from '../../styles/color';

export default StyleSheet.create({
  onboardingTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    width: '80%',
    flex: 0.5,
    color: color.appPrimary,
  },
  shoppingStyleImage: {
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
    flex: 1,
  },
  promptText: {
    flex: 0.5,
    fontSize: 18,
  },
  sliderText: {
    color: color.textGray,
  },
});
