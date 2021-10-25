import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PagerView from 'umami-pager-view';
import GoButton from '../../components/goButton';
import color from '../../styles/color';
import onboardingStyles from './onboardingStyles';
import {USER_INFO} from '../../actions/accountActions';

export default function ShoppingStyle({navigation}) {
  const dispatch = useDispatch();
  const [recipeDriven, setRecipeDriven] = useState(true);
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
      <Text style={onboardingStyles.onboardingTitle}>
        How do you pick a recipe?
      </Text>
      <PagerView
        style={{flex: 3, marginVertical: 30}}
        showPageIndicator={true}
        onPageSelected={page => {
          if (page.nativeEvent.position === 0) {
            setRecipeDriven(true);
          } else {
            setRecipeDriven(false);
          }
        }}
        initialPage={0}>
        <View key="1">
          <Image
            source={require('../../assets/RecipeDriven.png')}
            style={onboardingStyles.shoppingStyleImage}
          />
          <Text style={[onboardingStyles.promptText, {textAlign: 'center'}]}>
            I choose a recipe and then buy ingredients.
          </Text>
        </View>
        <View key="2">
          <Image
            source={require('../../assets/IngredientDriven.png')}
            style={onboardingStyles.shoppingStyleImage}
          />
          <Text style={[onboardingStyles.promptText, {textAlign: 'center'}]}>
            I look for a recipe based on ingredients I have.
          </Text>
        </View>
      </PagerView>
      {GoButton('Select', () => {
        dispatch({
          type: USER_INFO,
          payload: {
            ...user,
            recipe_driven: recipeDriven,
          },
        });
        navigation.push('Diet');
      })}
    </View>
  );
}
