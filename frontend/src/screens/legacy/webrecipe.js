// import React, { useEffect, useState } from 'react';
// import {
//   Text,
//   TextInput,
//   SafeAreaView,
//   TouchableOpacity,
//   Keyboard,
//   TouchableWithoutFeedback,
//   View,
//   Image,
// } from 'react-native';
// import webrecipeStyle from './webrecipeStyle';
// import auth from '@react-native-firebase/auth';
// import { useDispatch, useSelector } from 'react-redux';
// import GoButton from '../../components/goButton';
// import { GET_USER } from '../../actions/accountActions';
// import { FlatList } from 'react-native-gesture-handler';
// import { POST_RECIPE } from '../../actions/recipeActions';
// import { API_URL } from '@env';
// import axios from 'axios';
// import color from '../../styles/color';

// export default function WebRecipe({ navigation }) {
//   const dispatch = useDispatch();
//   const onboarded = useSelector(state => state.globalReducer.onboardReducer);
//   const [URL, setURL] = useState("");
//   const [recipe, setRecipe] = useState({});
//   const [steps, setSteps] = useState([]);
//   const [ingredients, setIngredients] = useState([]);
//   const [recipeName, setRecipeName] = useState("");
//   const [image, setImage] = useState(recipe.header_image);

//   useEffect(() => {
//     dispatch({ type: GET_USER, userID: auth().currentUser.uid });
//   }, [dispatch]);

//   useEffect(() => {
//     console.log(recipeName);
//   }, [recipeName]);

//   function getRecipeFromURL(URL) {
//     const apiConfig = {
//       method: 'post',
//       url: `${API_URL}/recipe/scrape-url?url=${URL}`,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };

//     axios(apiConfig)
//       .then(function (response) {
//         const result = response.data;
//         console.log(result);
//         console.log(result.data.ingredients);
//         console.log(result.data.recipe);
//         console.log(result.data.steps);
//         setRecipe(result.data.recipe);
//         setSteps(result.data.steps);
//         setIngredients(result.data.ingredients);
//         setRecipeName(result.data.recipe.name);
//         setImage(result.data.recipe.header_image);
//         console.log(recipe);
//         console.log(ingredients);
//         console.log(steps);
//         console.log(recipe.header_image);
//         console.log(recipeName);
//         console.log(typeof (image));
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }

//   if (!onboarded) {
//     navigation.replace('ShoppingStyle');
//   } else {
//     return (
//       <SafeAreaView>
//         <FlatList
//           showsVerticalScrollIndicator={false}
//           ListHeaderComponent={
//             <View>
//               <View style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 marginTop: 20
//               }}>
//                 <TouchableOpacity onPress={() => navigation.pop()}>
//                   <Image
//                     source={require("../../assets/Back.png")}
//                     style={{
//                       tintColor: 'black',
//                       height: 30,
//                       width: 30,
//                       resizeMode: 'contain',
//                       marginLeft: 18
//                     }}
//                   />
//                 </TouchableOpacity>
//                 <Text style={webrecipeStyle.Title}> New Recipe </Text>
//                 <TouchableOpacity
//                   onPress={() => console.log("NEXT")}>
//                   <Text style={webrecipeStyle.Next}> Next </Text>
//                 </TouchableOpacity>
//               </View>
//               <View style={{
//                 flexDirection: 'row'
//               }}>
//                 {/* <View style={webrecipeStyle.textBox}>
//                   <TouchableOpacity onPress={() => {
//                     console.log(URL);
//                     getRecipeFromURL(URL);
//                   }}>
//                     <Image
//                       source={require("../../assets/Search.png")}
//                       style={{
//                         height: 20,
//                         width: 20,
//                         resizeMode: 'contain',
//                       }}
//                     />
//                   </TouchableOpacity>
//                   <TextInput
//                     style={webrecipeStyle.textInput}
//                     placeholder="Search Web"
//                     onChangeText={(URL) => {
//                       setURL(URL);
//                     }} />
//                 </View> */}
//                 <View
//                   style={{
//                     marginTop: 30,
//                     backgroundColor: color.lightGray,
//                     height: 40,
//                     width: '85%',
//                     borderRadius: 20,
//                     paddingHorizontal: '5%',
//                     alignItems: 'center',
//                     flexDirection: 'row',
//                     marginLeft: 30,
//                   }}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       console.log(URL);
//                       getRecipeFromURL(URL);
//                     }}>
//                     <Image
//                       source={require('../../assets/Search.png')}
//                       style={{
//                         height: 20,
//                         width: 20,
//                         resizeMode: 'contain',
//                       }}
//                     />
//                   </TouchableOpacity>
//                   <TextInput
//                     style={{
//                       height: 40,
//                       paddingHorizontal: '5%',
//                       width: '100%',
//                     }}
//                     placeholder={"Search Web"}
//                     value={URL}
//                     onChangeText={(URL) => {
//                       console.log(URL);
//                       setURL(URL);
//                     }} />

//                 </View>
//                 {/* <TouchableOpacity onPress={() => console.log("FILTER")}>
//                   <Image
//                     source={require("../../assets/Filter.png")}
//                     style={{
//                       flex: 1,
//                       height: 40,
//                       width: 40,
//                       resizeMode: 'contain',
//                       marginTop: 30,
//                     }} />
//                 </TouchableOpacity> */}
//               </View>
//               {/* <TouchableOpacity>
//                 <Image
//                   style={{
//                     height: '50%',
//                     width: '50%',
//                     alignSelf: 'center',
//                     resizeMode: 'center',
//                   }}
//                   source={{ uri: image }} />
//               </TouchableOpacity> */}
//               <View>
//                 <View style={webrecipeStyle.textBox}>
//                   <TextInput
//                     style={webrecipeStyle.textInput}
//                     placeholder="Title"
//                     value={recipeName}
//                     onChangeText={(title) => {
//                       setRecipeName(title);
//                     }} />
//                 </View>
//                 <View style={webrecipeStyle.textBoxTall}>
//                   <TextInput
//                     style={webrecipeStyle.textInput}
//                     placeholder="Steps"
//                     value={steps}
//                     onChangeText={(steps) => {
//                       setSteps(steps);
//                     }} />
//                 </View>
//                 <View style={webrecipeStyle.textBoxTall}>
//                   <TextInput
//                     style={webrecipeStyle.textInput}
//                     placeholder="Ingredients"
//                     value={ingredients}
//                     onChangeText={(ingredients) => {
//                       setIngredients(ingredients);
//                     }} />
//                 </View>
//               </View>
//               <View style={{
//                 paddingHorizontal: 60,
//                 marginTop: 20,
//                 marginBottom: 100,
//               }}>
//                 {GoButton('Submit', () => {
//                   // save to DB
//                   console.log(recipe);
//                   console.log(steps);
//                   console.log(ingredients);
//                   dispatch({ type: POST_RECIPE, recipeObj: recipe, steps: steps, ingredients: ingredients });
//                 })}
//               </View>
//             </View>} />
//       </SafeAreaView >
//     );
//   }
//   return null;
// }
