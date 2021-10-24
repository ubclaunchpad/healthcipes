import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
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
      <NotificationStack.Screen name="Notification" component={Feed} />
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
      <CreateStack.Screen name="Create" component={Feed} />
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
      <PantryStack.Screen name="Pantry" component={Feed} />
    </PantryStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();
function Profile() {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen name="Profile" component={Feed} />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="FeedTab"
        component={FeedScreen}
        options={{
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="NotificationTab"
        component={NotificationScreen}
        options={{
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="CreateTab"
        component={CreateScreen}
        options={{
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="PantryTab"
        component={PantryScreen}
        options={{
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{
          tabBarLabel: '',
        }}
      />
    </Tab.Navigator>
  );
}

const SignUpLoginStack = createNativeStackNavigator();
const MasterStack = createNativeStackNavigator();

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

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
    <NavigationContainer>
      <MasterStack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerShown: false,
        }}>
        <MasterStack.Screen name="MainTabs" component={TabScreen} />
        <MasterStack.Screen name="ShoppingStyle" component={ShoppingStyle} />
        <MasterStack.Screen name="AboutYou" component={AboutYou} />
      </MasterStack.Navigator>
    </NavigationContainer>
  );
}
