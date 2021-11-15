import React, {useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Chip} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../styles/color';
import {GET_PANTRY} from '../../actions/pantryActions';

export default function Pantry({navigation}) {
  const dispatch = useDispatch();
  const pantry = useSelector(state => state.pantryReducer.pantryReducer);

  useEffect(() => {
    dispatch({type: GET_PANTRY, userID: auth().currentUser.uid});
  }, [dispatch]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity
        disabled={true}
        style={{
          borderBottomWidth: 2,
          borderColor: color.black,
          flex: 1,
          width: 100,
          alignSelf: 'center',
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            paddingVertical: 10,
            textAlign: 'center',
            color: color.black,
          }}>
          Pantry
        </Text>
      </TouchableOpacity>
      <View style={{flex: 1.5, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: color.black75,
            padding: 10,
            paddingHorizontal: 20,
            borderRadius: 29,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.push('EditPantry');
          }}>
          <Text
            style={{
              color: color.white,
              fontSize: 18,
              fontWeight: '400',
              marginRight: 5,
            }}>
            Edit
          </Text>
          <Image
            source={require('../../assets/Edit.png')}
            style={{
              width: 16,
              height: 16,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 12, marginHorizontal: '5%', paddingBottom: 45}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {pantry.map(({title, data, chipColor}) => {
            return (
              <View style={{flex: 10}} key={title}>
                <Text
                  style={{
                    color: color.black,
                    fontSize: 18,
                    fontWeight: '500',
                    marginBottom: 20,
                  }}>
                  {title}
                </Text>
                <View
                  style={{
                    flexWrap: 'wrap',
                    marginHorizontal: 10,
                    flexDirection: 'row',
                  }}>
                  {data.map(chip => {
                    return (
                      <Chip
                        key={chip.id}
                        style={[
                          {
                            backgroundColor: chipColor,
                            marginRight: 10,
                            marginBottom: 10,
                            borderRadius: 50,
                          },
                        ]}
                        textStyle={[
                          {
                            color: color.white,
                            fontSize: 18,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                          },
                        ]}>
                        {chip.name}
                      </Chip>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
