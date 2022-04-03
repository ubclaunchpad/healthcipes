import React, {useEffect, useRef, useMemo, useState} from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import BottomSheet from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {GET_USER, PUT_USER} from '../../actions/accountActions';
import {SEARCH_FEED} from '../../actions/feedActions';
import color from '../../styles/color';
import feedStyle from './feedStyle';
import FilterChips from '../../components/filterChips';
import GoButton from '../../components/goButton';
import Alerts from '../../components/Alerts';

export default function Search({navigation}) {
  const [search, setSearch] = useState('');
  const [finalSearch, setFinalSearch] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.accountReducer.userInfoReducer);
  const alert = useSelector(state => state.globalReducer.alertReducer);
  const searchResult = useSelector(
    state => state.recipeReducer.searchResultReducer,
  );
  const bottomSheetRef = useRef(null);
  const flatListRef = useRef(null);
  const snapPoints = useMemo(() => ['80%'], []);

  useEffect(() => {
    dispatch({type: SEARCH_FEED, keyword: search, user: user});
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {Alerts(alert, "Search Error")}
      <FlatList
        ref={flatListRef}
        data={searchResult}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View
              style={{
                marginHorizontal: '5%',
                width: '90%',
                marginVertical: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: color.lightGray,
                  height: 40,
                  width: '85%',
                  borderRadius: 20,
                  paddingHorizontal: '5%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../../assets/Search.png')}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                  }}
                />
                <TextInput
                  style={{
                    height: 40,
                    paddingHorizontal: '5%',
                    width: '100%',
                  }}
                  value={search}
                  onChangeText={text => setSearch(text)}
                  onSubmitEditing={() => {
                    setFinalSearch(search);
                    dispatch({type: SEARCH_FEED, keyword: search, user: user});
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  bottomSheetRef.current.snapToIndex(0);
                }}>
                <Image
                  source={require('../../assets/Filter.png')}
                  style={{
                    height: 30,
                    width: 30,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text style={feedStyle.feedTitle}>
              {finalSearch === ''
                ? 'Popular Recipes'
                : `${searchResult.length} Results for "${finalSearch}"`}
            </Text>
          </View>
        }
        onResponderEnd={() => {
          bottomSheetRef.current.close();
        }}
        numColumns={2}
        contentContainerStyle={{paddingBottom: '40%'}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.push('Recipe', {recipe: item});
              }}
              style={{
                width: '44%',
                aspectRatio: 1,
                borderRadius: 20,
                marginBottom: 10,
                marginLeft: index % 2 === 0 ? '5%' : 0,
                marginRight: index % 2 === 0 ? 0 : '5%',
              }}>
              <ImageBackground
                source={{uri: item.header_image}}
                resizeMode="cover"
                borderRadius={20}
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'flex-end',
                }}>
                <View
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    height: '30%',
                    paddingHorizontal: '3%',
                    paddingVertical: 10,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                  }}>
                  <Text
                    style={{
                      color: color.white,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    {item.name}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.recipe_id}
      />
      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        index={-1}
        snapPoints={snapPoints}>
        <View style={{flex: 1, paddingHorizontal: '7%'}}>
          <Text style={feedStyle.filterTitle}>Refine Results</Text>
          {FilterChips()}
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
    </SafeAreaView>
  );
}
