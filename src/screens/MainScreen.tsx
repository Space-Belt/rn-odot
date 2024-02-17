import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabStackNavigator from '../navigations/BottomTabStackNavigator';
import MainStackNavigator from '../navigations/MainStackNavigator';

// 앱 네비게이션의 루트가 된다는 의미로 RootStack
const RootStack = createStackNavigator();

const MainScreen = () => {
  return (
    <RootStack.Navigator
      initialRouteName="BottomTabStack"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen
        name="BottomTabStack"
        component={BottomTabStackNavigator}
      />
      <RootStack.Screen name="MainStack" component={MainStackNavigator} />
    </RootStack.Navigator>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
