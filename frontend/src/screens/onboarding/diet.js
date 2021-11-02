import React from 'react';
import {Text, View} from 'react-native';
import GoButton from '../../components/goButton';
import onboardingStyles from './onboardingStyles';
import color from '../../styles/color';
import FilterChips from '../../components/filterChips';

export default function Diet({navigation}) {
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
        {FilterChips()}
      </View>
      {GoButton('Continue', () => {
        navigation.push('AboutYou');
      })}
    </View>
  );
}
