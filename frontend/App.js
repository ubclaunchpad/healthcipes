import 'react-native-gesture-handler';
import React, {useState, useEffect, useRef, useMemo} from 'react';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from './src/screens/login/signup';
import Login from './src/screens/login/login';
import Forgot from './src/screens/login/forgot';
import ShoppingStyle from './src/screens/onboarding/shopping-style';
import AboutYou from './src/screens/onboarding/about-you';
import Feed from './src/screens/tab1/feed';
import Pantry from './src/screens/tab2/pantry';
import Post from './src/screens/tab3/post';
import Notification from './src/screens/tab4/notification';
import Profile from './src/screens/tab5/profile';
import Diet from './src/screens/onboarding/diet';
import TabsUI from './TabsUI';
import Search from './src/screens/tab1/search';
import Recipe from './src/screens/tab1/recipe';
import EditPantry from './src/screens/tab2/editPantry';

enableScreens();

const FeedStack = createNativeStackNavigator();
function FeedScreen() {
  return (
    <FeedStack.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
      }}>
      <FeedStack.Screen name="Feed" component={Feed} />
      <FeedStack.Screen name="Search" component={Search} />
      <FeedStack.Screen name="Recipe" component={Recipe} />
    </FeedStack.Navigator>
  );
}

const NotificationStack = createNativeStackNavigator();
function NotificationScreen() {
  return (
    <NotificationStack.Navigator
      initialRouteName="Notification"
      screenOptions={{
        headerShown: false,
      }}>
      <NotificationStack.Screen name="Notification" component={Notification} />
    </NotificationStack.Navigator>
  );
}

const CreateStack = createNativeStackNavigator();
function CreateScreen() {
  return (
    <CreateStack.Navigator
      initialRouteName="Create"
      screenOptions={{
        headerShown: false,
      }}>
      <CreateStack.Screen name="Create" component={Post} />
    </CreateStack.Navigator>
  );
}

const PantryStack = createNativeStackNavigator();
function PantryScreen() {
  return (
    <PantryStack.Navigator
      initialRouteName="Pantry"
      screenOptions={{
        headerShown: false,
      }}>
      <PantryStack.Screen name="Pantry" component={Pantry} />
      <PantryStack.Screen name="EditPantry" component={EditPantry} />
    </PantryStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();
function ProfileScreen() {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="EditProfile" component = {EditProfile} />
    </ProfileStack.Navigator>
  );
}

const SignUpLoginStack = createNativeStackNavigator();
const MasterStack = createNativeStackNavigator();

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const navigation = useRef();

  const tabs = useMemo(
    () => [
      {
        name: 'FeedTab',
        action: () =>
          navigation.current?.navigate('FeedTab', {route: 'FeedTab'}),
      },
      {
        name: 'PantryTab',
        action: () =>
          navigation.current?.navigate('PantryTab', {route: 'PantryTab'}),
      },
      {
        name: 'CreateTab',
        action: () =>
          navigation.current?.navigate('CreateTab', {route: 'CreateTab'}),
      },
      {
        name: 'NotificationTab',
        action: () =>
          navigation.current?.navigate('NotificationTab', {
            route: 'NotificationTab',
          }),
      },
      {
        name: 'ProfileTab',
        action: () =>
          navigation.current?.navigate('ProfileTab', {route: 'ProfileTab'}),
      },
    ],
    [],
  );

  const Tab = createBottomTabNavigator();
  function TabScreen() {
    return (
      <Tab.Navigator
        tabBar={props => <TabsUI {...{tabs, ...props}} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen name="FeedTab" component={FeedScreen} />
        <Tab.Screen name="PantryTab" component={PantryScreen} />
        <Tab.Screen name="CreateTab" component={CreateScreen} />
        <Tab.Screen name="NotificationTab" component={NotificationScreen} />
        <Tab.Screen name="ProfileTab" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }

  useEffect(() => {
    // Handle user state changes
    function onAuthStateChanged(newUser) {
      setUser(newUser);
      if (initializing) {
        setInitializing(false);
      }
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <NavigationContainer>
        <SignUpLoginStack.Navigator
          initialRouteName="SignUp"
          screenOptions={{headerShown: false}}>
          <SignUpLoginStack.Screen name="SignUp" component={SignUp} />
          <SignUpLoginStack.Screen name="Login" component={Login} />
          <SignUpLoginStack.Screen name="Forgot" component={Forgot} />
        </SignUpLoginStack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer ref={navigation}>
      <MasterStack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerShown: false,
        }}>
        <MasterStack.Screen name="MainTabs" component={TabScreen} />
        <MasterStack.Screen name="ShoppingStyle" component={ShoppingStyle} />
        <MasterStack.Screen name="Diet" component={Diet} />
        <MasterStack.Screen name="AboutYou" component={AboutYou} />
      </MasterStack.Navigator>
    </NavigationContainer>
  );
}
