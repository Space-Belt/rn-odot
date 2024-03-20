import {LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {toastContent, toastVisibility} from '../../recoil/ToastStore';
import {useRecoilValue} from 'recoil';
import Error from '../../assets/images/error.svg';
import Success from '../../assets/images/success.svg';

const DEFAULT_WIDTH = 350;

const ToastMessage = () => {
  const isToastOn = useRecoilValue(toastVisibility);
  const toastMessage = useRecoilValue(toastContent);

  const shadowStyle = {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  };

  return (
    <View style={[styles.wrapper, isToastOn ? shadowStyle : {}]}>
      {isToastOn && (
        <Animated.View
          style={[styles.toastWrapper]}
          entering={FadeIn}
          exiting={FadeOut}>
          <View style={styles.contentWrapper}>
            {toastMessage.type === 'success' ? <Success /> : <Error />}
            <Text style={styles.textWrapper} numberOfLines={1}>
              {toastMessage.message}
            </Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default ToastMessage;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 20,
    left: '50%',
    backgroundColor: '#fefefe',
    transform: [{translateX: -DEFAULT_WIDTH / 2}],
    borderRadius: 8,
  },
  toastWrapper: {
    width: DEFAULT_WIDTH,
    height: 45,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textWrapper: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: '500',
  },
});
