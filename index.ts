/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

//앱의 이름과
AppRegistry.registerComponent(appName, () => App);
