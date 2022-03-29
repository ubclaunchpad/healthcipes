import React, { useEffect, useState } from 'react';
import {
    Text,
    SafeAreaView,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    SectionList,
    Swipeable,
    Button
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import SwitchSelector from 'react-native-switch-selector';
import color from '../../styles/color';
import { GET_GROCERY, GROCERY } from '../../actions/groceryListActions';
import { ADD_PANTRY_INGREDIENT } from '../../actions/pantryActions';



// This is the CRUD functionality of the groceryList 
import {
    // ADD_INGREDIENT,
    GET_ALL_INGREDIENTS,
    REMOVE_INGREDIENT,
    SEARCH_INGREDIENTS,
} from '../../actions/groceryListActions';

export default function GroceryList({ navigation }) {
    const dispatch = useDispatch();
    const grocerylist = useSelector(state => state.groceryListReducer.groceryListReducer);
    const pantrylist = useSelector(state => state.pantryReducer.pantryReducer);
    // console.log("THIS IS THE PANTRY ----> ", pantrylist);
    const [pantryIngredientIds, setpantryIngredientIds] = useState([]);
    const [pantryIds, setIds] = useState([]);
    var pnatryIds = [];
    const [refresh, setrefresh] = useState(true);
    const [search, setSearch] = useState('');
    const ingredients = useSelector(
        state => state.pantryReducer.ingredientReducer,
    );
    const sampleGroceryList = [
        {
            "title": "Dairy", "data": [{ "category": "Dairy", "id": "aaadced", "name": "Pinch of crushed red pepper" },
            { "category": "Seasoning", "id": "aadsvavcadwaad", "name": "Cinnamon Sticks" }]
        },

        {
            "title": "Fruits And Vegetables", "data": [{ "category": "Seasoning", "id": "acadaad", "name": "Cauliflower" },
            { "category": "Seasoning", "id": "aacasdcaad", "name": "Cabbage" },
            { "category": "Seasoning", "id": "aaacdcaad", "name": "Tomato" }]
        },
        { "title": "Meats and Fish", "data": [{ "category": "Seasoning", "id": "aaacadcadsd", "name": "Goldfish" }] },
        { "title": "Seasoning", "data": [] },
        { "title": "Other", "data": [{ "category": "Seasoning", "id": "aaaacdscadvd", "name": "Cookie Crumbs" }] }
    ];

    useEffect(() => {
        dispatch({ type: GET_GROCERY, userID: auth().currentUser.uid });
        console.log("DISPATCHING");
    }, [dispatch]);


    useEffect(() => {
        console.log("Doing the ingredient ids stage");
        const pantryIds = pantrylist.map(pantryItem => {
            const data = pantryItem.data;
            return data.map(ingredient => {
                return ingredient.id;
            });
        });
        setpantryIngredientIds(pantryIds.flat());

    }, [pantrylist]);
    // console.log("these are the ingredient ids ----> ", pantryIngredientIds);


    const groceryItemInPantry = item => {
        // console.log(item);
        const id = item.id;
        //   console.log("THIS IS THE ITEM ID ----->", id); 
        // console.log(pantryIngredientIds.includes(id)); 
        return pantryIngredientIds.includes(id);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                disabled={true}
                style={{
                    // borderBottomWidth: 2,
                    borderColor: color.black,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    flex: 1,
                    width: 250,
                    alignSelf: 'center',
                    marginTop: 20,
                    marginBottom: 25,

                }}>


                <Text
                    onPress={() => {
                        navigation.replace("Pantry")
                    }}
                    style={{
                        fontWeight: 'bold',
                        fontSize: 24,
                        paddingVertical: 10,
                        // textAlign: 'flex-end',
                        marginRight: 75,
                        color: color.black,
                    }}>
                    Pantry
                </Text>

                <View
                    style={{
                        borderBottomWidth: 2,
                        borderColor: color.black,

                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 24,
                            paddingVertical: 10,
                            // textAlign: 'flex-start',
                            marginLeft: 0,
                            color: color.black,
                            // textDecorationLine: "underline"

                        }}>
                        Grocery List
                    </Text>
                </View>
            </View>



            <View style={{ flex: 12, marginHorizontal: '5%', paddingBottom: 45, }}>
                <View
                    style={{
                        backgroundColor: color.lightGray,
                        height: 40,
                        width: '100%',
                        borderRadius: 20,
                        marginBottom: 20,

                        paddingHorizontal: '5%',
                        alignItems: 'center',
                        alignSelf: 'center',
                        flexDirection: 'row',
                    }}
                >
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
                            paddingVertical: '5%',
                            width: '100%',
                        }}
                        value={search}
                        placeholder="Search Grocery List"
                        onChangeText={text => setSearch(text)}
                        onSubmitEditing={() => {
                            if (search !== '') {
                                dispatch({
                                    type: SEARCH_INGREDIENTS,
                                    keyword: search,
                                });
                            } else {
                                dispatch({ type: GET_ALL_INGREDIENTS });
                            }
                        }}
                    />
                </View>
                {/* <Button title= "Add To Grocery">  </Button> */}

                <SectionList
                    stickySectionHeadersEnabled={false}
                    sections={grocerylist}
                    style={{ paddingLeft: '5%', marginRight: '5%' }}

                    renderSectionFooter={() => {
                        return (
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: color.black75,
                                    marginBottom: 20,
                                    marginTop: 2,

                                }}
                            />
                        );

                    }}

                    ItemSeparatorComponent={() => {
                        return (
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: color.black75,
                                }}
                            />
                        );
                    }}


                    renderItem={({ item }) => {
                        return (

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    flex: 1,
                                }}
                            >
                                <Text style={{ fontSize: 18, marginVertical: 20, }}>{item.name}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        // add the ingredient to the pantry if it is no
                                        console.log("DISPATCHING MANY MANY TIMES")
                                        if (!groceryItemInPantry(item)){
                                            dispatch({
                                                type: ADD_PANTRY_INGREDIENT,
                                                payload: { userID: auth().currentUser.uid, item: [item.id, item.name, item.category] },
                                            });
                                        }
                                    }}
                                >
                                    {!groceryItemInPantry(item) && (
                                        <Image
                                            source={require('../../assets/Plus.png')}
                                            style={{
                                                marginVertical: 20,
                                                width: 24,
                                                height: 24,
                                                resizeMode: 'contain',
                                                tintColor: color.gray,
                                            }}
                                        />
                                    )}

                                    {groceryItemInPantry(item) && (
                                        <Image
                                            source={require('../../assets/check.png')}
                                            style={{
                                                marginVertical: 20,
                                                marginRight: 5,
                                                width: 24,
                                                height: 24,
                                                resizeMode: 'contain',
                                            }}
                                        />
                                    )}
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                    contentContainerStyle={{ paddingBottom: '10%' }}
                    showsVerticalScrollIndicator={false}
                    SectionSeparatorComponent={() => {
                        return (
                            <View
                                style={{
                                    height: 1,
                                }}
                            />
                        );
                    }}
                    renderSectionHeader={({ section: { title } }) => {
                        return (
                            <View>
                                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                                    {title}
                                </Text>
                            </View>
                        );
                    }}
                    
                />
                

                


            </View>
        </SafeAreaView>
    );
}


