import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import TodoListScreen from '../screens/TodoListScreen';

const AddStack = createStackNavigator();

const AddStackNavigator = () => {
  return (
    <AddStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="TodoList">
      <AddStack.Screen name="add" component={TodoListScreen} />
    </AddStack.Navigator>
  );
};

export default AddStackNavigator;

const styles = StyleSheet.create({});
