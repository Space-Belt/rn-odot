import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import TodoListGroupScreen from '../screens/TodoListGroupScreen';
import TodoListScreen from '../screens/TodoListScreen';

const TodoStack = createStackNavigator();

const TodoStackNavigator = () => {
  return (
    <TodoStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="TodoList">
      <TodoStack.Screen name="TodoList" component={TodoListScreen} />
    </TodoStack.Navigator>
  );
};

export default TodoStackNavigator;

const styles = StyleSheet.create({});
