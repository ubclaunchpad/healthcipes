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
import DraggableFlatList from 'react-native-draggable-flatlist';
import {GET_USER} from '../../actions/accountActions';
import color from '../../styles/color';

const NUM_ITEMS = 4;
function getColor(i) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

const initialData = [...Array(NUM_ITEMS)].map((d, index) => {
  const backgroundColor = getColor(index);
  return {
    key: `item-${index}`,
    label: String(index) + '',
    height: 100,
    width: 60 + Math.random() * 40,
    backgroundColor,
  };
});

export default function Post({navigation}) {
  const dispatch = useDispatch();
  const [data, setData] = useState(initialData);
  const [recipeName, setRecipeName] = useState('');
  const onboarded = useSelector(state => state.globalReducer.onboardReducer);

  useEffect(() => {
    dispatch({type: GET_USER, userID: auth().currentUser.uid});
  }, [dispatch]);

  const renderItem = ({item, drag, isActive, index}) => {
    return (
      <TouchableOpacity
        onLongPress={drag}
        disabled={isActive}
        style={[
          {
            height: '100%',
            width: 200,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <View
          style={{
            backgroundColor: color.textGray,
            width: 20,
            height: 20,
            borderRadius: 20,
            position: 'absolute',
            zIndex: 2,
          }}
        />
        {index % 2 === 0 ? (
          <View style={{alignItems: 'center', marginBottom: '120%'}}>
            <View
              style={{
                backgroundColor: color.textGray,
                width: 150,
                height: 150,
                borderRadius: 20,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                zIndex: 2,
              }}>
              <Image
                source={require('../../assets/EditStep.png')}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  margin: 10,
                }}
              />
            </View>
            <Image
              source={require('../../assets/DashLine.png')}
              style={{
                height: 100,
                width: 3,
                resizeMode: 'cover',
              }}
            />
          </View>
        ) : (
          <View style={{alignItems: 'center', marginTop: '120%'}}>
            <Image
              source={require('../../assets/DashLine.png')}
              style={{
                height: 100,
                width: 3,
                resizeMode: 'cover',
              }}
            />
            <View
              style={{
                backgroundColor: color.textGray,
                width: 150,
                height: 150,
                borderRadius: 20,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                zIndex: 2,
              }}>
              <Image
                source={require('../../assets/EditStep.png')}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  margin: 10,
                }}
              />
            </View>
          </View>
        )}
        <View
          style={{
            backgroundColor: color.textGray,
            width: '100%',
            height: 3,
            position: 'absolute',
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingHorizontal: '5%', flex: 2}}>
        <TextInput
          placeholder="Recipe Name"
          autoCorrect={false}
          onChangeText={text => setRecipeName(text)}
          value={recipeName}
          style={{
            borderBottomColor: color.gray,
            borderBottomWidth: 1,
            height: '100%',
            paddingTop: 20,
          }}
          placeholderTextColor={color.gray}
        />
      </View>
      <DraggableFlatList
        data={data}
        onDragEnd={({data}) => setData(data)}
        horizontal
        keyExtractor={item => item.key}
        renderItem={renderItem}
        containerStyle={{flex: 18}}
        style={{height: '100%'}}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={() => (
          <TouchableOpacity
            style={[
              {
                height: '100%',
                width: 200,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Image
              source={require('../../assets/AddStep.png')}
              style={{
                backgroundColor: color.textGray,
                width: 40,
                height: 40,
                borderRadius: 40,
                position: 'absolute',
                zIndex: 2,
              }}
            />
            <View
              style={{
                backgroundColor: color.textGray,
                width: '50%',
                height: 3,
                alignSelf: 'flex-start',
              }}
            />
          </TouchableOpacity>
        )}
      />
      <View style={{flex: 2}} />
    </SafeAreaView>
  );
}
