import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

type Props = {
  status: 'SUCCESS' | 'FAIL';
};

const messageList: {
  SUCCESS: string;
  FAIL: string;
} = {
  SUCCESS: '등록에 성공하셨습니다.',
  FAIL: '등록에 실패하셨습니다.',
};

const ToastMessage = ({status}: Props) => {
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
      // transform: [{translateX: (-71 * position.value) / 100}],
    };
  });

  React.useEffect(() => {
    if (status === 'SUCCESS') {
      setIsMessageOn(prev => !prev);
    }
    handleToastMessageOn();

    // 컴포넌트가 마운트되었을 때 setTimeout을 통해 메시지 설정
    const timeoutId = setTimeout(() => {
      setIsMessageOn(prev => !prev);
      handleToastMessageOn();
    }, 2500); // 3초 후에 메시지 설정

    // cleanup 함수를 이용하여 컴포넌트가 언마운트될 때 setTimeout 정리
    return () => clearTimeout(timeoutId);
  }, [status]);

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
