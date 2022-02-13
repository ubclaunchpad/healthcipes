import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {v4 as uuidv4} from 'uuid';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../styles/color';
import {launchImageLibrary} from 'react-native-image-picker';
import newrecipeStyle from './newrecipeStyle';
import {REPLACE_RECIPE_STEP} from '../../actions/recipeActions';

export default function NewStep({navigation, route}) {
  const {index} = route.params;
  const dispatch = useDispatch();
  const steps = useSelector(state => state.recipeReducer.recipeStepsReducer);
  const [stepImage, setStepImage] = useState('');
  const [step, setStep] = useState('');
  const [time, setTime] = useState(0);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    console.log(index);
  }, [dispatch]);

  function save() {
    if (stepImage !== '') {
      const uploadUri =
        Platform.OS === 'ios'
          ? stepImage.uri.replace('file://', '')
          : stepImage.uri;

      const storageRef = storage()
        .ref()
        .child('Steps')
        .child(`${uuidv4()}.jpeg`);

      storageRef
        .putFile(uploadUri, {
          customMetadata: {
            Owner: auth().currentUser.uid,
          },
        })
        .then(() => {
          console.log('Uploaded');
          const stepObj = {
            step_index: index,
            step_image: storageRef.toString(),
            step_text: step,
            step_time: time,
            step_ingredients: ingredients,
            // image_cache: stepImage
          };
          dispatch({
            type: REPLACE_RECIPE_STEP,
            payload: {
              index: index,
              step: stepObj,
            },
          });
          navigation.pop();
        });
    } else {
      console.log('Image Cannot Be Empty');
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{paddingHorizontal: '5%'}}
        contentContainerStyle={{paddingBottom: '50%'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: 50,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              navigation.pop();
            }}>
            <Image
              source={require('../../assets/Back.png')}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
                tintColor: color.black,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              flex: 2,
              color: color.textGray,
              fontSize: 18,
              textAlign: 'center',
            }}>
            Step {index + 1}
          </Text>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'flex-end'}}
            onPress={() => {
              save();
            }}>
            <Text style={{fontSize: 20}}>Save</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              aspectRatio: 1,
              marginTop: '5%',
              width: '100%',
              backgroundColor: color.gray,
              borderRadius: 20,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              padding: stepImage !== '' ? 0 : 20,
            }}
            onPress={() => {
              launchImageLibrary({
                selectionLimit: 1,
                mediaType: 'photo',
                includeBase64: false,
              }).then(res => {
                setStepImage({uri: res?.assets[0].uri});
              });
            }}>
            <Image
              source={
                stepImage !== '' ? stepImage : require('../../assets/Logo.png')
              }
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 20,
                resizeMode: stepImage !== '' ? 'cover' : 'contain',
              }}
            />
            <Image
              source={require('../../assets/EditStep.png')}
              style={[
                newrecipeStyle.EditStepIcon,
                {
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 30}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Instruction</Text>
          <TextInput
            style={{
              marginTop: 10,
              minHeight: 100,
            }}
            value={step}
            onChangeText={text => {
              setStep(text);
            }}
            placeholder="Write the step here..."
            multiline
          />
        </View>
        <View
          style={{marginTop: 30, flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Time</Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: color.gray,
              width: 50,
              textAlign: 'center',
              marginLeft: 10,
              fontSize: 16,
            }}
            value={time.toString()}
            onChangeText={text => {
              setTime(Number(text));
            }}
            keyboardType="number-pad"
            placeholder="10"
            returnKeyType="done"
          />
          <Text
            style={{fontSize: 16, fontWeight: '600', color: color.textGray}}>
            mins
          </Text>
        </View>
        <View style={{marginTop: 30}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Ingredients</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
