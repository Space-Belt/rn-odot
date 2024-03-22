import {
  BackHandler,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  bottomSheetContent,
  bottomSheetVisibleState,
  useBottomSheet,
} from '../../recoil/BottomSheetStore';
import Animated, {
  BounceIn,
  BounceInUp,
  BounceOut,
  EntryExitTransition,
  FadeIn,
  FadeOut,
  JumpingTransition,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height;
const bottomSheetHeight = screenHeight * 0.4;

const BottomSheet = () => {
  const content = useRecoilValue(bottomSheetContent);
  const [isVisible, setIsVisible] = useRecoilState(bottomSheetVisibleState);

  const [isOn, setIsOn] = React.useState<boolean>(false);

  // const bottom = useSharedValue(0);
  const top = useSharedValue(screenHeight);
  const sheetHeight = useSharedValue(bottomSheetHeight);

  const {hideBottomSheet} = useBottomSheet();

  const handleBackgroundClick = () => {
    hideBottomSheet();
  };

  const sheetAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
      height: sheetHeight.value,
    };
  });

  const startHeight = useSharedValue(0);
  const startY = useSharedValue(0);

  const panGestureEvent = Gesture.Pan()
    .onStart(() => {
      startHeight.value = sheetHeight.value;
      startY.value = top.value;
    })
    .onUpdate(event => {
      console.log(event.translationY);
      sheetHeight.value = withTiming(startHeight.value + -event.translationY, {
        duration: 1,
      });
      top.value = withTiming(startY.value + event.translationY, {
        duration: 1,
      });
    });

  React.useEffect(() => {
    if (isVisible.isBottomSheetVisible) {
      setIsOn(true);
      top.value = withTiming(screenHeight - bottomSheetHeight, {
        duration: 400,
      });
    } else {
      top.value = withTiming(screenHeight, {
        duration: 400,
      });
      const timeout = setTimeout(() => {
        setIsOn(false);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [isVisible.isBottomSheetVisible]);

  React.useEffect(() => {
    const handlePressBackButton = () => {
      setIsVisible({isBottomSheetVisible: false});
      return false;
    };
    BackHandler.addEventListener('hardwareBackPress', () =>
      handlePressBackButton(),
    );

    return BackHandler.removeEventListener('hardwareBackPress', () =>
      handlePressBackButton(),
    );
  }, []);

  return (
    <>
      {isVisible.isBottomSheetVisible && (
        <Animated.View
          entering={FadeIn.duration(1000)}
          exiting={FadeOut.duration(1000)}
          style={styles.backgroundWrapper}>
          <TouchableWithoutFeedback onPress={handleBackgroundClick}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
        </Animated.View>
      )}
      {isOn && (
        <Animated.View style={[styles.bottomSheetWrapper, sheetAnimatedStyle]}>
          <GestureDetector gesture={panGestureEvent}>
            <View style={styles.gestureBar} />
          </GestureDetector>
          {content.content}
        </Animated.View>
      )}
    </>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  backgroundWrapper: {
    height: '100%',
    width: '100%',
    flex: 1,
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheetWrapper: {
    height: bottomSheetHeight,
    width: '100%',
    position: 'absolute',
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 25,
    paddingVertical: 25,
    zIndex: 10,
  },
  gestureBar: {
    width: 25,
    height: 10,
    backgroundColor: '#C1C1C1',
    borderRadius: 2,
    position: 'absolute',
    top: 2,
    left: '50%',
    transform: [{translateX: 25 / 2}],
  },
});
