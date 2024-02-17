/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import MainScreen from './screens/MainScreen';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <MainScreen />
    </NavigationContainer>
  );
}

export default App;
