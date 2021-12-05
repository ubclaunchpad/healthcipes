import React, {useEffect, useRef, useMemo, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import moment from 'moment';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../styles/color';
import feedStyle from './feedStyle';
import AccordionItem from '../../components/accordionItem';
import recipeStyle from './recipeStyle';
import axios from 'axios';
import {API_URL} from '@env';
import {
  GET_RECIPE,
  POST_RECIPE_LIKE,
  POST_RECIPE_VIEW,
} from '../../actions/recipeActions';
import auth from '@react-native-firebase/auth';

export default function Recipe({navigation, route}) {
  const {recipe} = route.params;
  const dispatch = useDispatch();
  const [page, setPage] = useState('Info');
  const [image, setImage] = useState(
    require('../../assets/defaultProfile.png'),
  );
  const [ingredients, setIngredients] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [steps, setSteps] = useState([]);
  const recipeInfo = useSelector(state => state.recipeReducer.recipeReducer);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['60%', '88%'], []);

  function checkLike(ID) {
    const apiConfig = {
      method: 'get',
      url: `${API_URL}/user_activity/like_status?userID=${
        auth().currentUser.uid
      }&recipeID=${ID}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(apiConfig)
      .then(function (response) {
        const res = response.data;
        if (res[0].length > 0) {
          setIsLiked(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    const apiConfig2 = {
      method: 'get',
      url: `${API_URL}/user_activity/like_count?recipeID=${ID}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(apiConfig2)
      .then(function (response) {
        const res = response.data[0][0];
        if (res) {
          setLikeCount(Number(res));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function deleteLike(ID) {
    const apiConfig = {
      method: 'delete',
      url: `${API_URL}/user_activity/like?userID=${
        auth().currentUser.uid
      }&recipeID=${ID}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(apiConfig)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    storage()
      .refFromURL(`gs://umami-2021.appspot.com/Users/${recipe.user_id}.jpg`)
      .getDownloadURL()
      .then(res => {
        setImage({uri: res});
      })
      .catch(e => {
        console.log('No User Image: ' + e);
      });
  }, [recipe]);

  useEffect(() => {
    dispatch({type: GET_RECIPE, recipe_id: recipe.recipe_id});
    dispatch({
      type: POST_RECIPE_VIEW,
      user_id: auth().currentUser.uid,
      recipe_id: recipe.recipe_id,
    });
    checkLike(recipe.recipe_id);
  }, [dispatch, recipe]);

  useEffect(() => {
    setIngredients(recipeInfo.ingredients);
    setSteps(recipeInfo.steps);
  }, [recipeInfo]);

  function recipeTab(tab) {
    return (
      <TouchableOpacity
        onPress={() => {
          setPage(tab);
        }}
        style={{
          borderBottomWidth: page === tab ? 2 : 0,
          borderColor: color.appPrimary,
          flex: 1,
        }}>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 16,
            padding: 10,
            textAlign: 'center',
            color: page === tab ? color.appPrimary : color.textGray,
          }}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  }

  function nutrition() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 30,
        }}>
        <View
          style={[
            recipeStyle.nutritionStyle,
            {
              borderColor: color.appPrimary,
            },
          ]}>
          <Text>{recipe.calories ?? '0'}</Text>
          <Text style={{fontSize: 10}}>Calories</Text>
        </View>
        <View
          style={[
            recipeStyle.nutritionStyle,
            {
              borderColor: color.lightGreen,
            },
          ]}>
          <Text>{recipe.protein ?? '0'}g</Text>
          <Text style={{fontSize: 10}}>Protein</Text>
        </View>
        <View
          style={[
            recipeStyle.nutritionStyle,
            {
              borderColor: color.orange,
            },
          ]}>
          <Text>{recipe.fiber ?? '0'}g</Text>
          <Text style={{fontSize: 10}}>Fiber</Text>
        </View>
        <View
          style={[
            recipeStyle.nutritionStyle,
            {
              borderColor: color.red,
            },
          ]}>
          <Text>{recipe.fat ?? '0'}g</Text>
          <Text style={{fontSize: 10}}>Fat</Text>
        </View>
      </View>
    );
  }

  function infoTab(liked, count) {
    const img = liked
      ? require('../../assets/LikeFilled.png')
      : require('../../assets/Like.png');
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={feedStyle.recipeTitle}>{recipe.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                if (liked) {
                  deleteLike(recipe.recipe_id);
                  setIsLiked(false);
                  setLikeCount(count - 1);
                } else {
                  dispatch({
                    type: POST_RECIPE_LIKE,
                    user_id: auth().currentUser.uid,
                    recipe_like_id: recipe.recipe_id,
                  });
                  setIsLiked(true);
                  setLikeCount(count + 1);
                }
              }}>
              <Image
                source={img}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  marginRight: 5,
                  tintColor: color.red,
                }}
              />
            </TouchableOpacity>
            <Text>{count}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={image}
              style={{
                width: 36,
                height: 36,
                resizeMode: 'cover',
                marginRight: 5,
                borderRadius: 36,
              }}
            />
            <View style={{flexDirection: 'column'}}>
              <Text numberOfLines={1} style={{width: 80}}>
                {recipe.creator_username}
              </Text>
              <Text style={{fontSize: 10}}>
                {moment(new Date(recipe.created_time)).format('D MMM YYYY')}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/Time.png')}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
                marginRight: 2,
              }}
            />
            <Text>{recipe.cooking_time} mins</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/Serving.png')}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
                marginRight: 2,
              }}
            />
            <Text>{recipe.servings} Servings</Text>
          </View>
        </View>
        {nutrition()}
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
            About this Recipe
          </Text>
          <Text>{recipe.recipe_description}</Text>
        </View>
      </View>
    );
  }

  function ingredientTab() {
    return (
      <BottomSheetFlatList
        contentContainerStyle={{paddingTop: 20}}
        data={ingredients}
        keyExtractor={item => item.ingredient_id}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/Plus.png')}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
              />
              <Text style={{fontSize: 18}}>{item.ingredient_name}</Text>
            </View>
          );
        }}
      />
    );
  }

  function stepTab() {
    return (
      <BottomSheetFlatList
        contentContainerStyle={{paddingTop: 20, paddingBottom: '30%'}}
        data={steps}
        keyExtractor={item => item.step_id}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                padding: 20,
                borderColor: color.appPrimary,
                borderWidth: 1,
                borderRadius: 20,
                marginBottom: 20,
              }}>
              <AccordionItem title={`Step ${index + 1}`}>
                <Text>{item.description}</Text>
              </AccordionItem>
            </View>
          );
        }}
      />
    );
  }

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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {recipeTab('Info')}
            {recipeTab('Ingredients')}
            {recipeTab('Steps')}
          </View>
          {page === 'Info' && infoTab(isLiked, likeCount)}
          {page === 'Ingredients' && ingredientTab()}
          {page === 'Steps' && stepTab()}
        </View>
      </BottomSheet>
    </View>
  );
}
