import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import React, {useState, useEffect, useRef, useMemo} from 'react';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch } from 'react-redux';
import SignUp from './src/screens/login/signup';
import Login from './src/screens/login/login';
import Forgot from './src/screens/login/forgot';
import ShoppingStyle from './src/screens/onboarding/shopping-style';
import AboutYou from './src/screens/onboarding/about-you';
import Feed from './src/screens/tab1/feed';
import Pantry from './src/screens/tab2/pantry';
import Post from './src/screens/tab3/post';
import NewRecipe from './src/screens/tab3/newrecipe'
import VideoRecipe from './src/screens/tab3/videorecipe'
import WebRecipe from './src/screens/tab3/webrecipe'
import Notification from './src/screens/tab4/notification';
import Profile from './src/screens/tab5/profile';
import Diet from './src/screens/onboarding/diet';
import TabsUI from './TabsUI';
import Search from './src/screens/tab1/search';
import Recipe from './src/screens/tab1/recipe';
import EditPantry from './src/screens/tab2/editPantry';
import EditProfile from './src/screens/tab5/editprofile';
import NewStep from './src/screens/tab3/newStep';
import groceryList from './src/screens/tab2/groceryList'
import { GET_USER, POST_USER_TOKEN } from './src/actions/accountActions';

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
      <CreateStack.Screen name="NewRecipe" component={NewRecipe} />
      <CreateStack.Screen name="NewStep" component={NewStep} />
      <CreateStack.Screen name="VideoRecipe" component={VideoRecipe} />
      <CreateStack.Screen name="WebRecipe" component={WebRecipe} />
    </CreateStack.Navigator>
  );
}

const PantryStack = createNativeStackNavigator();
function PantryScreen() {
  return (
    <PantryStack.Navigator
      initialRouteName="Grocery"
      screenOptions={{
        headerShown: false,
      }}>
      <PantryStack.Screen name="Pantry" component={Pantry} />
      <PantryStack.Screen name="EditPantry" component={EditPantry} />
      <PantryStack.Screen name="Grocery" component={groceryList} />
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
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
    </ProfileStack.Navigator>
  );
}

const SignUpLoginStack = createNativeStackNavigator();
const MasterStack = createNativeStackNavigator();


// useEffect so recipe id that is taking in will navigate?
// parse recipe id into recipe object (look at other examples)
//    - done in recipe.js wherre it checks if param is id or object, if id then find object
//    - navigation.push('Recipe', {recipe: item});

const linking = {
  prefixes: ["umami://"],
  config: {
    screens: {
      MainTabs: {
        screens: {
          FeedTab: {
            path: 'feed',
            screens: {
              Recipe: {
                path: 'recipe/:recipe_id?',
                parse: {
                  id: (id) => `${id}`
                }
            }
          }
          },
          PantryTab: 'pantry',
          CreateTab: 'create',
          NotificationTab: 'noti',
          ProfileTab: 'profile',
        }
      }
    }
  }
}

export default function App() {
  const dispatch = useDispatch();
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

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await messaging()
        .getToken()
        .then(token => {
          dispatch({
            type: POST_USER_TOKEN,
            payload: {
              userID: auth().currentUser.uid,
              token: token,
            },
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    SplashScreen.hide();
    // Handle user state changes
    function onAuthStateChanged(newUser) {
      setUser(newUser);
      if (initializing) {
        setInitializing(false);
        if (newUser) {
          dispatch({type: GET_USER, userID: auth().currentUser.uid});
          requestUserPermission();
        }
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
    <NavigationContainer ref={navigation} linking={linking}>
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
