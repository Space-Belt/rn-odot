import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabStackNavigator from '../navigations/BottomTabStackNavigator';
import MainStackNavigator from '../navigations/MainStackNavigator';
import TodoStackNavigator from '../navigations/TodoStackNavigator';
import AddTaskScreen from './AddTaskScreen';

// 앱 네비게이션의 루트가 된다는 의미로 RootStack
const RootStack = createStackNavigator();

const MainScreen = () => {
  return (
    <RootStack.Navigator
      initialRouteName="MainStack"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="MainStack" component={MainStackNavigator} />
    </RootStack.Navigator>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
