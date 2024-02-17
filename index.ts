/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
// 24.02.15
import 'react-native-gesture-handler';

// 앱 이름을 기준으로 App 컴포넌트 등록
AppRegistry.registerComponent(appName, () => App);
