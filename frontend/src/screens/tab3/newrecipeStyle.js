import {StyleSheet} from 'react-native';
import color from '../../styles/color';

export default StyleSheet.create({
  StepImageContainer: {
    backgroundColor: color.gray,
    width: 150,
    height: 150,
    borderRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    zIndex: 2,
  },
  StepDashLine: {
    height: 100,
    width: 3,
    resizeMode: 'cover',
  },
  EditStepIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    margin: 10,
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
