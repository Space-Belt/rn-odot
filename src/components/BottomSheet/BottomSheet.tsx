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
  const {hideBottomSheet} = useBottomSheet();

  const [isOn, setIsOn] = React.useState<boolean>(false);

  const translateY = useSharedValue(bottomSheetHeight);
  const sheetHeight = useSharedValue(bottomSheetHeight);

  const handleBackgroundClick = () => {
    hideBottomSheet();
  };

  const sheetAnimatedStyle = useAnimatedStyle(() => {
    if (bottomSheetHeight * 0.7 > sheetHeight.value) {
      runOnJS(setIsVisible)({isBottomSheetVisible: false});
      translateY.value = bottomSheetHeight;
      sheetHeight.value = bottomSheetHeight;
    }

    return {
      transform: [{translateY: translateY.value}],
      height: sheetHeight.value,
    };
  });

  const startHeight = useSharedValue(0);

  const panGestureEvent = Gesture.Pan()
    .onStart(() => {
      startHeight.value = sheetHeight.value;
    })
    .onUpdate(event => {
      sheetHeight.value = startHeight.value - event.translationY;
    });

  React.useEffect(() => {
    if (isVisible.isBottomSheetVisible) {
      setIsOn(true);
      translateY.value = withTiming(0, {
        duration: 200,
      });
    } else {
      translateY.value = withTiming(screenHeight, {
        duration: 200,
      });
      const timeout = setTimeout(() => {
        setIsOn(false);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [isVisible.isBottomSheetVisible]);

  React.useEffect(() => {
    console.log('dfdfdfdfdf');
    console.log(sheetHeight.value);
  }, [sheetHeight.value]);

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
            <View style={styles.gestureBarWrapper}>
              <View style={styles.gestureBar} />
            </View>
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
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 25,
    paddingVertical: 25,
    zIndex: 10,
  },
  gestureBarWrapper: {
    left: 25,
    width: '100%',
    height: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gestureBar: {
    width: 25,
    height: 5,
    backgroundColor: '#C1C1C1',
    borderRadius: 2,
  },
});
