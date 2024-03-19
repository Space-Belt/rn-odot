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

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <MainScreen />
        <ToastMessage />
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
