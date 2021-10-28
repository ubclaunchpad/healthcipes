import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import GoButton from '../../components/goButton';
import onboardingStyles from './onboardingStyles';
import color from '../../styles/color';
import {USER_INFO} from '../../actions/accountActions';

export default function Diet({navigation}) {
  const dispatch = useDispatch();
  const [userDiet, setUserDiet] = useState([]);
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

  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        padding: '10%',
        paddingVertical: '20%',
        backgroundColor: color.white,
      }}>
      <Text style={[onboardingStyles.onboardingTitle, {width: '100%'}]}>
        Tell us about yourself..
      </Text>
      <View style={{flex: 3, marginVertical: 30, justifyContent: 'flex-start'}}>
        <Text style={onboardingStyles.promptText}>
          Do you have any dietary requirements?
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', flex: 3}}>
          {Object.keys(dietList).map(item => {
            return (
              <Chip
                key={item}
                onPress={() => {
                  if (userDiet.includes(dietList[item])) {
                    setUserDiet(userDiet.filter(obj => obj !== dietList[item]));
                  } else {
                    setUserDiet(old => [...old, dietList[item]]);
                  }
                }}
                selectedColor={color.appPrimary}
                style={[
                  onboardingStyles.chipStyle,
                  {
                    backgroundColor: userDiet.includes(dietList[item])
                      ? color.appPrimary
                      : null,
                  },
                ]}
                textStyle={[
                  onboardingStyles.chipTextStyle,
                  {
                    color: userDiet.includes(dietList[item])
                      ? color.white
                      : color.textGray,
                  },
                ]}>
                {item}
              </Chip>
            );
          })}
        </View>
      </View>
      {GoButton('Continue', () => {
        Object.values(dietList).forEach(item => {
          user[item] = userDiet.includes(item);
        });
        dispatch({
          type: USER_INFO,
          payload: user,
        });
        navigation.push('AboutYou');
      })}
    </View>
  );
}
