import React from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import {Chip} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import GoButton from '../../components/goButton';
import {SET_ONBOARDING} from '../../actions/globalActions';
import onboardingStyles from './onboardingStyles';
import color from '../../styles/color';

export default function Diet({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.accountReducer.userInfoReducer);
  const dietList = [
    'Vegetarian',
    'Gluten-free',
    'Vegan',
    'Keto',
    'Paleo',
    'Pescatarian',
    'Dairy-free',
  ];

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
        Tell us about yourself
      </Text>
      <View style={{flex: 3, marginVertical: 30, justifyContent: 'flex-start'}}>
        <Text style={onboardingStyles.promptText}>
          Do you have any dietary requirements?
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', flex: 3}}>
          {dietList.map(item => {
            return (
              <Chip
                key={item}
                onPress={() => console.log(item)}
                selectedColor={color.appPrimary}
                style={onboardingStyles.chipStyle}
                textStyle={onboardingStyles.chipTextStyle}>
                {item}
              </Chip>
            );
          })}
        </View>
      </View>
      {GoButton('Continue', () => {
        dispatch({type: SET_ONBOARDING, onboarded: true});
        navigation.push('AboutYou');
      })}
    </View>
  );
}
