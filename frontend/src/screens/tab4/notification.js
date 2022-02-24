import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  SectionList, 
  StatusBar, 
  Image,
  FlatList } from "react-native";

export const dummyData = [
  {
    /*name: "Mike",
    recipe: "Strawberry Cake",
    time: "10:26",*/
    title: "Today",
    data: [
      "Mike",
      "Strawberry Cake",
      "10:26",
    ]
  },
  {
    title: "Today",
    data: [
      "Mike",
      "Pasta",
      "10:26",
    ]
  },
  {
    title: "Tommorow",
    data: [
      "Sarah",
      "Strawberry Cake",
      "10:26",
    ]
  },
  {
    title: "Wednesday",
    data: [
      "Mike",
      "Lasagna",
      "10:20",
    ]
  },
];

const DATA = dummyData.map((data, key) => {
    return {
        key: key,
        title: data.title,
        /*name: data.data[0],
        recipe: data.data[1],
        time: data.data[2],*/ 
        data: data.data,
    };
});

export default function notification() {
  return (
    <SafeAreaView style = {{flex: 1}}>
      <View
        style = {{
          flex: 0.5,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}  
      >
      </View>
      <View>
        <SectionList
          sections = {DATA}
          keyExtractor = {item => item.key}
          renderItem = {({item, index}) => {
            return (
              <View 
                style = {{
                  flexDirection: 'row',
                  padding: 20,
                  }}>
              <Image
                source = {require('../../assets/Profilepicture.png')}
                style = {{
                  width: 70,
                  height: 70,
                  borderRadius: 70,
                }}
              >
              </Image>
              <View>
                <Text>{item + " liked your recipe"}</Text>
                
              </View>
            </View>
            )}}
          renderSectionHeader={({ section: { title} }) => (
            <Text style={{fontSize:32}}>{title}</Text>
          )}
          
        >

        </SectionList>
      </View>


    </SafeAreaView>
  )

}