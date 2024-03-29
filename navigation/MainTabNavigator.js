import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import CreatePostScreen from '../screens/CreatePostScreen'
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CommentScreen from '../screens/CommentScreen'
import TabBarIcon from '../components/TabBarIcon';
import LoginScreen from '../screens/LoginScreen';
import PhoneScreen from '../screens/PhoneScreen';
import UserScreen from '../screens/UserScreen';
import ChatScreen from '../screens/ChatScreen';
import SearchScreen from '../screens/SearchScreen';
import UserChatScreen from '../screens/UserChatScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});


const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config,

);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'md-contact' : 'md-contact'} />
  ),
};

ProfileStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';
const ChatStack = createStackNavigator(
  {
    Chat: ChatScreen,
  },
  config
);

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'md-chatbubbles' : 'md-chatbubbles'} />
  ),
};

ChatStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ProfileStack,
  SettingsStack,
  ChatStack
},
  {
    tabBarOptions: {
      activeBackgroundColor: '#555555',
      inactiveBackgroundColor: '#555555',
      activeTintColor: 'white',
      inactiveTintColor: 'black'
    },
    defaultNavigationOptions: {
    }
  });

tabNavigator.path = '';






export const Router = createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: tabNavigator,
      },
      Profile: {
        screen: ProfileScreen,
      },
      Settings: {
        screen: SettingsScreen,
      },
      CreatePost: {
        screen: CreatePostScreen,
      },
      Comment: {
        screen: CommentScreen,
      },
      Login: {
        screen: LoginScreen
      },
      Phone: {
        screen: PhoneScreen
      },
      User:{
        screen: UserScreen
      },
      Chat:{
        screen: ChatScreen
      },
      UserChat:{
        screen: UserChatScreen
      },
      Search:{
        screen: SearchScreen
      }
    },
    {
      headerMode: 'none',
      initialRouteName: 'Login',
    },
  ),
);

// export default tabNavigator;
