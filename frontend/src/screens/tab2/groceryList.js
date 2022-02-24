import React, { useEffect, useState } from 'react';
import {
    Text,
    SafeAreaView,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    TextInput,
    FlatList,
    SectionList,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Swipeable from 'react-native-swipeable';
import SwitchSelector from 'react-native-switch-selector';
import { Chip } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import color from '../../styles/color';
import { GET_PANTRY } from '../../actions/pantryActions';

// This is the CRUD functionality of the groceryList 
import {
    ADD_INGREDIENT,
    GET_ALL_INGREDIENTS,
    REMOVE_INGREDIENT,
    SEARCH_INGREDIENTS,
} from '../../actions/pantryActions';



export default function groceryList({ navigation }) {
    const dispatch = useDispatch();
    const grocerylist = useSelector(state => state.pantryReducer.pantryReducer);
    const [ingredientIds, setingredientIds] = useState([]);
    console.log(grocerylist);
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
        console.log("Got the grocery list stage ")
        console.log(grocerylist);
        const pantryIds = grocerylist.map(pantryItem => {
            const data = pantryItem.data;
            return data.map(ingredient => {
                return ingredient.id;
            });
        });
        setingredientIds(pantryIds.flat());
        console.log("here is the ingredient IDS -> ", ingredientIds);
    }, [grocerylist]);

    // Asking if the ingredient is in the pantry
    const itemInPantry = item => {
        return true;
    };

    console.log(grocerylist)
    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                    Grocery
                </Text>
            </TouchableOpacity>



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


