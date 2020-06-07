import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';

// COMPONENTS
import {
  AuthScreen,
  GamesScreen,
  NewsScreen,
  GamesArticleScreen,
  ArticleScreen
} from './components';

import Logo from './utils/logo';

// NAVIGATORS
const RootStack = createStackNavigator();
const NewsStack = createStackNavigator();
const GamesStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

// CUSTOM NAVS
const stackDefaultOptions = {
  headerStyle: {
    backgroundColor: '#001338'
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  headerTitle: Logo
}

const NewsNav = () => {
  return (
    <NewsStack.Navigator screenOptions={stackDefaultOptions}>
      <NewsStack.Screen name='News' component={NewsScreen} />
      <NewsStack.Screen name='Article' component={ArticleScreen} />
    </NewsStack.Navigator>
  )
}

const GamesNav = () => {
  return (
    <GamesStack.Navigator screenOptions={stackDefaultOptions}>
      <GamesStack.Screen name='Games' component={GamesScreen} />
      <GamesStack.Screen name='GamesArticle' component={GamesArticleScreen} />
    </GamesStack.Navigator>
  )
}

// TAB NAVIGATOR
const TabNav = () => {
  return (
    <BottomTab.Navigator tabBarOptions={{
      activeTintColor: 'white',
      showLabel: false,
      activeBackgroundColor: '#00194b',
      inactiveBackgroundColor: '#001338',
      style: {
        backgroundColor: '#001338'
      }
    }}>
      <BottomTab.Screen name='News' component={NewsNav} options={{ tabBarIcon: ({color}) => <Icon name='ios-basketball' size={25} color={color}/>  }} />
      <BottomTab.Screen name='Games' component={GamesNav} options={{ tabBarIcon: ({color}) => <Icon name='md-tv' size={25} color={color}/>}} />
    </BottomTab.Navigator>
  )
}

// ROOT NAVIGATOR
const RootNavigator = (props) => {
  return (
    <RootStack.Navigator >
      <RootStack.Screen
        options={{ headerShown: false }}
        name='Auth'
        component={AuthScreen}
      />
      <RootStack.Screen
        options={{ headerShown: false }}
        name='App'
        component={TabNav}
      />
    </RootStack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}