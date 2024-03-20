/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import MainScreen from './screens/MainScreen';
import {RecoilRoot} from 'recoil';
import ToastMessage from './components/toastMessage/ToastMessage';
import HorizontalMove from './components/HorizontalMove';
import BottomSheet from './components/BottomSheet/BottomSheet';

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <MainScreen />
        <ToastMessage />
        <BottomSheet />
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
