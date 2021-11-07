import React, {useEffect, useRef, useMemo} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import BottomSheet from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {GET_USER, PUT_USER} from '../../actions/accountActions';
import {GET_FEED} from '../../actions/feedActions';
import color from '../../styles/color';
import feedStyle from './feedStyle';
import FilterChips from '../../components/filterChips';
import GoButton from '../../components/goButton';

export default function Recipe({navigation, route}) {
  const {recipe} = route.params;
  const dispatch = useDispatch();
  const onboarded = useSelector(state => state.globalReducer.onboardReducer);
  const user = useSelector(state => state.accountReducer.userInfoReducer);
  const featuredFeed = useSelector(
    state => state.recipeReducer.featureFeedReducer,
  );
  const forYouFeed = useSelector(
    state => state.recipeReducer.forYouFeedReducer,
  );
  const bottomSheetRef = useRef(null);
  const flatListRef = useRef(null);
  const snapPoints = useMemo(() => ['60%', '80%'], []);

  useEffect(() => {
    dispatch({type: GET_USER, userID: auth().currentUser.uid});
  }, [dispatch]);

  useEffect(() => {
    dispatch({type: GET_FEED, user: user});
  }, [dispatch, user]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
        source={{uri: recipe.header_image}}
        resizeMode="cover"
        style={{
          width: '100%',
          height: '70%',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          style={{flex: 1, width: 24, height: 24, margin: 20, marginTop: '15%'}}
          onPress={() => {
            navigation.pop();
          }}>
          <Image
            source={require('../../assets/Back.png')}
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
              tintColor: color.white,
            }}
          />
        </TouchableOpacity>
      </ImageBackground>
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <View style={{flex: 1, paddingHorizontal: '7%'}}>
          <Text style={feedStyle.filterTitle}>{recipe.name}</Text>
          <View style={{flex: 2}}>
            {GoButton('Save', () => {
              dispatch({
                type: PUT_USER,
                payload: {
                  ...user,
                },
              });
              bottomSheetRef.current.close();
            })}
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}
