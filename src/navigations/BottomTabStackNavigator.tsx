import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TodoListScreen from '../screens/TodoListScreen';
import MyScreen from '../screens/MyScreen';

const BottomTab = createBottomTabNavigator();

const BottomTabStackNavigator = () => {
  return (
    <BottomTab.Navigator screenOptions={{headerShown: false}}>
      <BottomTab.Screen
        name="TodoListTab"
        component={TodoListScreen}
        options={{tabBarLabel: '리스트'}}
      />
      <BottomTab.Screen
        name="MyTab"
        component={MyScreen}
        options={{tabBarLabel: '마이'}}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabStackNavigator;

const styles = StyleSheet.create({});
