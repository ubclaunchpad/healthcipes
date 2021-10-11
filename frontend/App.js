import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from './src/screens/login/signup';
import Login from './src/screens/login/login';

enableScreens();

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

const HomeStack = createNativeStackNavigator();
function Home() {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
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
      <NotificationStack.Screen name="Notification" component={HomeScreen} />
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
      <CreateStack.Screen name="Create" component={HomeScreen} />
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
      <PantryStack.Screen name="Pantry" component={HomeScreen} />
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
      <ProfileStack.Screen name="Profile" component={HomeScreen} />
    </ProfileStack.Navigator>
  );
}

const SignUpLoginStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

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
          <SignUpLoginStack.Screen name="LogIn" component={Login} />
        </SignUpLoginStack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: '',
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarLabel: '',
          }}
        />
        <Tab.Screen
          name="Create"
          component={CreateScreen}
          options={{
            tabBarLabel: '',
          }}
        />
        <Tab.Screen
          name="Pantry"
          component={PantryScreen}
          options={{
            tabBarLabel: '',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: '',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
