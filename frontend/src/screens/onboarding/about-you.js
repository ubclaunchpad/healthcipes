import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import {useDispatch, useSelector} from 'react-redux';
import GoButton from '../../components/goButton';
import {SET_ONBOARDING} from '../../actions/globalActions';
import color from '../../styles/color';
import onboardingStyles from './onboardingStyles';
import {PUT_USER} from '../../actions/accountActions';

export default function AboutYou({navigation}) {
  const dispatch = useDispatch();
  const [styleValue, setStyleValue] = useState(0);
  const [style, setStyle] = useState('ANY');
  const [experience, setExperience] = useState(0.5);
  const user = useSelector(state => state.accountReducer.userInfoReducer);

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
      <View style={{flex: 3, marginVertical: 30}}>
        <Text style={onboardingStyles.promptText}>
          What do you care most about when cooking?
        </Text>
        <View style={{justifyContent: 'flex-start', flex: 1}}>
          <Slider
            style={{width: '100%', height: 40}}
            minimumValue={-1}
            maximumValue={1}
            value={styleValue}
            step={0.5}
            minimumTrackTintColor={color.appPrimary}
            maximumTrackTintColor={color.appPrimary}
            thumbTintColor={color.appPrimary}
            onSlidingComplete={num => {
              setStyleValue(num);
              if (num > 0) {
                setStyle('TASTINESS');
              } else if (num < 0) {
                setStyle('SIMPLICITY');
              } else {
                setStyle('ANY');
              }
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={onboardingStyles.sliderText}>Simplicity</Text>
            <Text style={onboardingStyles.sliderText}>Tastiness</Text>
          </View>
        </View>
        <Text style={onboardingStyles.promptText}>
          How experienced are you in the kitchen?
        </Text>
        <View style={{justifyContent: 'flex-start', flex: 1}}>
          <Slider
            style={{width: '100%', height: 40}}
            minimumValue={0}
            maximumValue={1}
            value={experience}
            minimumTrackTintColor={color.appPrimary}
            maximumTrackTintColor={color.appPrimaryLight}
            thumbTintColor={color.appPrimary}
            onSlidingComplete={num => {
              setExperience(num);
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={onboardingStyles.sliderText}>Beginner</Text>
            <Text style={onboardingStyles.sliderText}>Expert</Text>
          </View>
        </View>
      </View>
      {GoButton("Let's Cook!", () => {
        dispatch({
          type: PUT_USER,
          payload: {
            ...user,
            style,
            experience,
          },
        });
        dispatch({type: SET_ONBOARDING, onboarded: true});
        navigation.replace('MainTabs');
      })}
    </View>
  );
}
