import React from 'react';
import {Chip} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import color from '../styles/color';
import {USER_INFO} from '../actions/accountActions';

export default function FilterChips() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.accountReducer.userInfoReducer);
  const dietList = {
    Vegetarian: 'vegetarian',
    Vegan: 'vegan',
    Pescatarian: 'pescatarian',
    'Gluten-free': 'gluten_free',
    'Dairy-free': 'dairy_free',
    Keto: 'keto',
    Paleo: 'paleo',
  };
  const styles = StyleSheet.create({
    chipStyle: {
      marginRight: 10,
      marginBottom: 15,
      borderRadius: 50,
    },
    chipTextStyle: {
      fontSize: 18,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
  });

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', flex: 3}}>
      {Object.keys(dietList).map(item => {
        const diet = dietList[item];
        return (
          <Chip
            key={item}
            onPress={() => {
              dispatch({
                type: USER_INFO,
                payload: {...user, [diet]: !user[diet]},
              });
            }}
            selectedColor={color.appPrimary}
            style={[
              styles.chipStyle,
              {
                backgroundColor: user[diet] ? color.appPrimary : null,
              },
            ]}
            textStyle={[
              styles.chipTextStyle,
              {
                color: user[diet] ? color.white : color.textGray,
              },
            ]}>
            {item}
          </Chip>
        );
      })}
    </View>
  );
}
