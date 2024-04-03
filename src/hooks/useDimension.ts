import {Dimensions} from 'react-native';

export const useDimension = () => {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  return {screenHeight, screenWidth};
};
