import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

type Props = {
  status: 'SUCCESS' | 'FAIL';
  isVisible: boolean;
};

const messageList: {
  SUCCESS: string;
  FAIL: string;
} = {
  SUCCESS: '등록에 성공하셨습니다.',
  FAIL: '등록에 실패하셨습니다.',
};

const ToastMessage = ({status, isVisible}: Props) => {
  const position = useSharedValue<number>(200);
  const [isMessageOn, setIsMessageOn] = React.useState<boolean>(false);

  const handleToastMessageOn = () => {
    if (isMessageOn) {
      position.value = 10;
    } else if (!isMessageOn) {
      position.value = -100;
    }
  };

  const moveAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: `${position.value}%`,
    };
  });

  React.useEffect(() => {
    if (isVisible) {
      setIsMessageOn(true);
      position.value = 10;
    } else {
      setIsMessageOn(false);
      position.value = -100;
    }
  }, [isVisible]);

  React.useEffect(() => {}, []);

  return (
    <Animated.View style={[styles.wrapper, moveAnimatedStyle]}>
      <Text>toastMessage</Text>
    </Animated.View>
  );
};

export default ToastMessage;

const styles = StyleSheet.create({
  wrapper: {},
});
