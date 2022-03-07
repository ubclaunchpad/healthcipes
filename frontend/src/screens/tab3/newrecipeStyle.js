import {StyleSheet} from 'react-native';
import color from '../../styles/color';

export default StyleSheet.create({
  StepImageContainer: {
    backgroundColor: color.appPrimary,
    width: 150,
    height: 150,
    borderRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    zIndex: 2,
  },
  StepImageRoundContainer: {
    backgroundColor: color.appPrimary,
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  StepDashLine: {
    height: 100,
    width: 3,
    resizeMode: 'cover',
    tintColor: color.appPrimary,
  },
  EditStepIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    margin: 10,
    tintColor: color.white,
  },
  InputPromptText: {
    marginBottom: 10,
    fontWeight: '300',
    fontSize: 18,
  },
  InputPromptIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    margin: 10,
  },
});
