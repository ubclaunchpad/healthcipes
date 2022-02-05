import React, {useEffect, useState} from 'react';
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
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import GoButton from '../../components/goButton';
import {GET_USER} from '../../actions/accountActions';

export default function Post({navigation}) {
  const dispatch = useDispatch();
  const onboarded = useSelector(state => state.globalReducer.onboardReducer);

  useEffect(() => {
    dispatch({type: GET_USER, userID: auth().currentUser.uid});
  }, [dispatch]);

  const [RecipeName, SetRecipeName] = useState('')
  const [URL, SetURL] = useState('')
  const [Description, SetDescription] = useState('')

  if (!onboarded) {
    navigation.replace('ShoppingStyle');
  } else {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{
            flexDirection: 'row'
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <TouchableOpacity 
                onPress={() => {navigation.pop()}}
            > 
                <Image
                    source={require("../../assets/Back.png")}
                    style={{
                        tintColor: 'black'
                    }}
                />
            </TouchableOpacity>
            <Text> New Recipe </Text>
            <Text> Next </Text>
        </View>
        <Image
            source={require("../../assets/BestSpaghettiInItaly.png")}
        />
      </SafeAreaView>
    );
  }

  return null;
}
