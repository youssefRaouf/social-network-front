import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import CreatePostScreen from '../screens/CreatePostScreen'
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CommentScreen from '../screens/CommentScreen'
import TabBarIcon from '../components/TabBarIcon';

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
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

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

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});

tabNavigator.path = '';



const TabsNav = () => {
  return createBottomTabNavigator({
    HomeStack,
    LinksStack,
    SettingsStack,
  });
};


export  const Router = createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: tabNavigator,
      },
      Links: {
        screen: LinksScreen,
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
    },
    { 
      headerMode: 'none',
      initialRouteName: 'Home',
    },
  ),
);

// export default tabNavigator;
