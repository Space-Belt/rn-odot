import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Alert, BackHandler} from 'react-native';
import {useRecoilState} from 'recoil';
import {navigationRef} from '../lib/navigation';
import {bottomSheetVisibleState} from '../recoil/BottomSheetStore';
import FlatListScreen from '../screens/FlatListScreen';
import ListSwipeScreen from '../screens/ListSwipeScreen';
import SectionListScreen from '../screens/SectionListScreen';
import TodoListGroupScreen from '../screens/TodoListGroupScreen';
import TodoListScreen from '../screens/TodoListScreen';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  const [isVisible, setIsVisible] = useRecoilState(bottomSheetVisibleState);
  // 안드로이드,
  React.useEffect(() => {
    const handleBackPress = () => {
      if (navigationRef.getCurrentRoute()?.name === 'TodoListScreen') {
        if (isVisible.isBottomSheetVisible === true) {
          setIsVisible({isBottomSheetVisible: false});
        } else if (isVisible.isBottomSheetVisible === false) {
          Alert.alert('잠깐!!', '정말 앱을 종료하시겠어요?', [
            {
              text: '취소',
              onPress: () => null,
              style: 'cancel',
            },
            {text: '나가기', onPress: () => BackHandler.exitApp()},
          ]);
        }
      } else {
        navigationRef.goBack();
      }

      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', () => handleBackPress());

    return BackHandler.removeEventListener('hardwareBackPress', () =>
      handleBackPress(),
    );
  }, [isVisible.isBottomSheetVisible]);

  return (
    <MainStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="TodoListScreen">
      <MainStack.Screen name="TodoListScreen" component={TodoListScreen} />
      <MainStack.Screen
        name="TodoListGroupScreen"
        component={TodoListGroupScreen}
      />
      <MainStack.Screen name="ListSwipeScreen" component={ListSwipeScreen} />
      {/* <MainStack.Screen name="AddTaskScreen" component={AddTaskScreen} /> */}
      <MainStack.Screen name="FlatListScreen" component={FlatListScreen} />
      <MainStack.Screen
        name="SectionListScreen"
        component={SectionListScreen}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
