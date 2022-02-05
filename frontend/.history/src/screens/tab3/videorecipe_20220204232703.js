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
import videorecipeStyle from './videorecipeStyle';

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
      <SafeAreaView style={{flex: 1, marginLeft: '5%'}}>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <TouchableOpacity 
                onPress={() => {navigation.pop()}}
            > 
                <Image
                    source={require("../../assets/Back.png")}
                    style={{
                        tintColor: 'black',
                        height: 25,
                        width: 25,
                        resizeMode: 'contain',
                        marginLeft: "10%"
                    }}
                />
            </TouchableOpacity>
            <Text style={videorecipeStyle.Title}> New Recipe </Text>
            <TouchableOpacity>
            <Text style={videorecipeStyle.Next}> Next </Text>
            </TouchableOpacity>
            
        </View>
        <View>
            <Image
                source={require("../../assets/BestSpaghettiInItaly.png")}
            />
        </View>
        <View>

        </View>
        
      </SafeAreaView>
    );
  }

  return null;
}
