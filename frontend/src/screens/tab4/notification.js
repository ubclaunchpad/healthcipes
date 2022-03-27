import React, { useEffect } from 'react';
import {Text, View, SafeAreaView, SectionList, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { GET_NOTIFICATIONS } from '../../actions/profileActions';
import color from '../../styles/color';

export default function Notification({navigation}) {
  const dispatch = useDispatch();
  const notifications = useSelector(
    state => state.profileReducer.myNotificationReducer,
  );
  const user = useSelector(state => state.accountReducer.userInfoReducer);

  const numNotification = notifications.length;

  useEffect(() => {
    if (user && user.user_id !== '') {
      dispatch({type: GET_NOTIFICATIONS, user});
    }
  }, [user]);

  return numNotification ? (
    <SafeAreaView style={{flex: 1}}>
      <SectionList
        sections={notifications}
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
              }}
            >
              <View
                style={{
                  flex: 1,
                }}
              >
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
                  {item.name + ' liked your recipe '}
                  <Text
                    style={{fontWeight: 'bold', color: color.appPrimary}}
                    onPress={() => {
                      navigation.push('Recipe', {recipe_id: item.recipeid});
                    }}
                  >
                    {item.recipe}
                  </Text>
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
  ) : (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20}}>
        No Notifications Yet!
      </Text>
    </View>
  );
}
