import {StyleSheet} from 'react-native';
import color from '../../styles/color';

export default StyleSheet.create({
  feedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: '5%',
    marginBottom: 10,
  },
  filterTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginHorizontal: '5%',
    marginVertical: 20,
    marginBottom: 30,
    alignSelf: 'center',
    color: color.textGray,
  },
  recipeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    marginBottom: 30,
    color: color.black,
  },
});
