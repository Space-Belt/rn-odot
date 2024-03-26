/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {RecoilRoot} from 'recoil';
import BottomSheet from './components/BottomSheet/BottomSheet';
import ToastMessage from './components/toastMessage/ToastMessage';
import {navigationRef} from './lib/navigation';
import MainScreen from './screens/MainScreen';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView, StyleSheet} from 'react-native';
function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <RecoilRoot>
        <NavigationContainer ref={navigationRef}>
          <MainScreen />
          <ToastMessage />
          <BottomSheet />
        </NavigationContainer>
      </RecoilRoot>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
