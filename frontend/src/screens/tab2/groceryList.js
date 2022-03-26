import React, { useEffect, useState } from 'react';
import {
    Text,
    SafeAreaView,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    SectionList,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import color from '../../styles/color';
import {GET_GROCERY}  from '../../actions/groceryListActions';

// This is the CRUD functionality of the groceryList 
import {
    ADD_INGREDIENT,
    GET_ALL_INGREDIENTS,
    REMOVE_INGREDIENT,
    SEARCH_INGREDIENTS,
} from '../../actions/pantryActions';

export default function GroceryList({navigation}) {
    const dispatch = useDispatch();
    const grocerylist = useSelector(state => state.groceryListReducer.groceryListReducer);
    const [ingredientIds, setingredientIds] = useState([]);
    // console.log(grocerylist);
    const [addState, setAddState] = useState(true);
    const [search, setSearch] = useState('');
    const ingredients = useSelector(
        state => state.pantryReducer.ingredientReducer,
    );
    const sampleGroceryList = [
        {
            "title": "Dairy", "data": [{ "category": "Dairy", "id": "aaadced", "name": "Pinch of crushed red pepper" },
            { "category": "Seasoning", "id": "aadsvavcadwaad", "name": "Cinnamon Sticks" }]
        },

        { "title": "Fruits And Vegetables", "data": [{ "category": "Seasoning", "id": "acadaad", "name": "Cauliflower" },
        { "category": "Seasoning", "id": "aacasdcaad", "name": "Cabbage" },
        { "category": "Seasoning", "id": "aaacdcaad", "name": "Tomato" }]},
        { "title": "Meats and Fish", "data": [{ "category": "Seasoning", "id": "aaacadcadsd", "name": "Goldfish" }] },
        { "title": "Seasoning", "data": [] },
        { "title": "Other", "data": [{ "category": "Seasoning", "id": "aaaacdscadvd", "name": "Cookie Crumbs" }] }
    ];

    useEffect(() => {
        dispatch({type: GET_GROCERY, userID: auth().currentUser.uid});
        console.log("DISPATCHING")
      }, [dispatch]);

    useEffect(() => {
        console.log("Got the grocery list stage ")
        // console.log(grocerylist);
        const pantryIds = grocerylist.map(pantryItem => {
            const data = pantryItem.data;
            return data.map(ingredient => {
                return ingredient.id;
            });
        });
        setingredientIds(pantryIds.flat());
        // console.log("here is the ingredient IDS -> ", ingredientIds);
    }, [grocerylist]);

    // Asking if the ingredient is in the pantry
    const itemInPantry = item => {
        return true;
    };

    // console.log(grocerylist)
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
                    onPress ={()=>{
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

                <SectionList
                    stickySectionHeadersEnabled={false}
                    sections={sampleGroceryList}
                    style={{ paddingLeft: '5%', marginRight: '5%' }}

                    renderSectionFooter = {() => {
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
                                        dispatch({
                                            type: ADD_INGREDIENT,
                                            payload: { userID: auth().currentUser.uid, item: item },
                                        });
                                    }}
                                >
                                    {!itemInPantry(item) && (
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

                                    {itemInPantry(item) && (
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
                    contentContainerStyle={{ paddingBottom: '30%' }}
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


