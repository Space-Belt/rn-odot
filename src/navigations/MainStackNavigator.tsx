import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Alert, BackHandler} from 'react-native';
import {navigationRef} from '../lib/navigation';
import AddTaskScreen from '../screens/AddTaskScreen';
import FlatListScreen from '../screens/FlatListScreen';
import SectionListScreen from '../screens/SectionListScreen';
import TodoListGroupScreen from '../screens/TodoListGroupScreen';
import TodoListScreen from '../screens/TodoListScreen';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  // 안드로이드,
  React.useEffect(() => {
    const handleBackPress = () => {
      if (navigationRef.getCurrentRoute()?.name === 'TodoListScreen') {
        Alert.alert('잠깐!!', '정말 앱을 종료하시겠어요?', [
          {
            text: '취소',
            onPress: () => null,
            style: 'cancel',
          },
          {text: '나가기', onPress: () => BackHandler.exitApp()},
        ]);
      } else {
        navigationRef.goBack();
      }

      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', () => handleBackPress());

    return BackHandler.removeEventListener('hardwareBackPress', () =>
      handleBackPress(),
    );
  }, []);

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
