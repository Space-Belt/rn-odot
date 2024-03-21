import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import TodoListGroupScreen from '../screens/TodoListGroupScreen';
import TodoListScreen from '../screens/TodoListScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import FlatListScreen from '../screens/FlatListScreen';
import SectionListScreen from '../screens/SectionListScreen';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="TodoListScreen">
      <MainStack.Screen name="TodoListScreen" component={TodoListScreen} />
      <MainStack.Screen
        name="TodoListGroupScreen"
        component={TodoListGroupScreen}
      />
      <MainStack.Screen name="AddTaskScreen" component={AddTaskScreen} />
      <MainStack.Screen name="FlatListScreen" component={FlatListScreen} />
      <MainStack.Screen
        name="SectionListScreen"
        component={SectionListScreen}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({});
