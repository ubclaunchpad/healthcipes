import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView, SectionList, Image} from 'react-native';

export default function Notification() {
  const [data, setData] = useState([]);
  const dayMap = {};
  const fakeData = [
    {
      name: 'Mike',
      recipe: 'Strawberry Cake',
      time: '10:26',
      img: require('../../assets/Profilepicture.png'),
    },
    {
      name: 'Mikey',
      recipe: 'Strawberry Cake',
      time: 'Today',
      img: require('../../assets/Profilepicture.png'),
    },
    {
      name: 'Miket',
      recipe: 'Strawberry Cake',
      time: 'Yesterday',
      img: require('../../assets/Profilepicture.png'),
    },
    {
      name: 'Mikeel',
      recipe: 'Strawberry Cake',
      time: 'Yesterday',
      img: require('../../assets/Profilepicture.png'),
    },
    {
      name: 'Miker',
      recipe: 'Strawberry Cake Bananas',
      time: 'Wednesday',
      img: require('../../assets/Profilepicture.png'),
    },
  ];

  useEffect(() => {
    const dataObj = [];
    fakeData.forEach(item => {
      if (dayMap[item.time]) {
        dayMap[item.time].push(item);
      } else {
        dayMap[item.time] = [item];
      }
    });
    Object.keys(dayMap).forEach(key => {
      dataObj.push({key: key, title: key, data: dayMap[key]});
    });
    setData(dataObj);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <SectionList
        sections={data}
        keyExtractor={item => item.name + item.recipe}
        contentContainerStyle={{paddingHorizontal: '5%', paddingBottom: '50%'}}
        stickySectionHeadersEnabled={false}
        ItemSeparatorComponent={() => (
          <View style={{height: 1, backgroundColor: '#CED0CE'}} />
        )}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  flex: 1,
                }}>
                <Image
                  source={item.img}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70,
                  }}
                />
              </View>
              <View style={{flex: 3}}>
                <Text style={{fontSize: 16}}>
                  {item.name + ' liked your recipe ' + item.recipe}
                </Text>
              </View>
            </View>
          );
        }}
        renderSectionHeader={({section: {title}}) => (
          <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20}}>
            {title}
          </Text>
        )}
      />
    </SafeAreaView>
  );
}
