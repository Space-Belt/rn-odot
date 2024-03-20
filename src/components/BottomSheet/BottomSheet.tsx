import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {useRecoilValue} from 'recoil';
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

const screenHeight = Dimensions.get('window').height;
const bottomSheetHeight = screenHeight * 0.4;

const BottomSheet = () => {
  const content = useRecoilValue(bottomSheetContent);
  const isVisible = useRecoilValue(bottomSheetVisibleState);

  const [isOn, setIsOn] = React.useState<boolean>(false);

  // const bottom = useSharedValue(0);
  const top = useSharedValue(screenHeight);

  const {hideBottomSheet} = useBottomSheet();

  const handleBackgroundClick = () => {
    hideBottomSheet();
  };

  React.useEffect(() => {
    if (isVisible.isBottomSheetVisible) {
      setIsOn(true);
      top.value = withTiming(screenHeight - bottomSheetHeight, {
        duration: 400,
      });
      // setIsOn(true);
      // bottom.value = withTiming(bottomSheetHeight, {
      //   duration: 700,
      // });
    } else {
      // bottom.value = withTiming(0, {
      //   duration: 700,
      // });
      top.value = withTiming(screenHeight, {
        duration: 400,
      });
      const timeout = setTimeout(() => {
        setIsOn(false);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [isVisible.isBottomSheetVisible]);

  //
  const sheetAnimatedStyle = useAnimatedStyle(() => {
    // return {
    //   height: bottom.value,
    //   paddingHorizontal: 10,
    //   paddingVertical: 10,
    // };
    return {
      top: top.value,
    };
  });

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
});
