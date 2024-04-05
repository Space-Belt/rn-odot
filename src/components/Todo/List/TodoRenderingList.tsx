import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useLayout} from '../../../hooks/useLayout';
import {useTodoList} from '../../../recoil/Todo';
import {ITodoItem} from '../../../types/todos';

type props = {
  odotList: ITodoItem[];
  todo: ITodoItem;
  index: number;
  handleCheckTodoList: (args: number) => void;
  handleDeleteTodoList: (args: number) => void;
};

const TodoRenderingList = ({
  odotList,
  todo,
  index,
  handleCheckTodoList,
  handleDeleteTodoList,
}: props) => {
  const tempDeleteBtnWidth = useSharedValue(0);
  const deletBtnOpacity = useSharedValue(0);
  const [layout, onLayout] = useLayout();

  const navigation = useNavigation();
  const {setTodos} = useTodoList();

  const translateX = useSharedValue(0);
  const deleteBtnWidth = useSharedValue(0);

  const [clicked, setClicked] = useState<boolean>(false);

  const listAnimatedStyle = useAnimatedStyle(() => {
    if (translateX.value > 0) {
      return {
        transform: [{translateX: 0}],
      };
    } else {
      return {
        transform: [{translateX: translateX.value}],
      };
    }
  });

  const deleteBtnAnimatedStyle = useAnimatedStyle(() => {
    if (translateX.value > -10) {
      return {
        width: 0,
        opacity: 0,
      };
    } else {
      return {
        width: deleteBtnWidth.value,
        opacity: deletBtnOpacity.value,
      };
    }
  });

  const deleteBtnOpacityAnimatedStyle = useAnimatedStyle(() => {
    if (translateX.value < -30) {
      return {
        opacity: deletBtnOpacity.value,
      };
    } else {
      return {
        opacity: 0,
      };
    }
  });
  const tempTranslateX = useSharedValue(0);

  const panGestureEvent = Gesture.Pan()
    .onStart(() => {
      tempDeleteBtnWidth.value = deleteBtnWidth.value;
      tempTranslateX.value = translateX.value;
    })
    .onUpdate(event => {
      if (tempTranslateX.value === 0 && event.translationX > 0) {
        return;
      } else {
        console.log(event.translationX);
        if (tempTranslateX.value + event.translationX >= 0) {
          deleteBtnWidth.value = withTiming(0, {}, () => {
            runOnJS(setClicked)(false);
          });
          translateX.value = withTiming(0, {}, () => {
            runOnJS(setClicked)(false);
          });
        } else {
          deleteBtnWidth.value = withTiming(
            tempDeleteBtnWidth.value - event.translationX,
            {duration: 100},
            () => {
              deleteBtnWidth.value > 40 && runOnJS(setClicked)(true);
              deletBtnOpacity.value = withTiming(1, {duration: 200});
            },
          );
          translateX.value = withTiming(
            tempTranslateX.value + event.translationX,
            {duration: 100},
          );
          if (event.translationX > layout.width / 2) {
            runOnJS(setClicked)(false);
          }
        }
      }
    })
    .onEnd(event => {
      if (event.absoluteX < 15) {
        translateX.value = withTiming(-1000);
        tempDeleteBtnWidth.value = 0;
        deletBtnOpacity.value = 0;
        deleteBtnWidth.value = 0;
        runOnJS(handleDeleteTodoList)(index);
      }
      //  else {
      //   tempDeleteBtnWidth.value = 0;
      //   deletBtnOpacity.value = 1;
      //   translateX.value = -100;
      //   deleteBtnWidth.value = 100;
      // }
    });

  const isFocus = useIsFocused();
  React.useEffect(() => {
    tempDeleteBtnWidth.value = 0;
    deletBtnOpacity.value = 0;
    translateX.value = 0;
    deleteBtnWidth.value = 0;
  }, [isFocus]);

  return (
    <GestureDetector gesture={panGestureEvent}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => handleCheckTodoList(index)}
          key={`todos-${index}`}>
          <Animated.View
            style={[
              styles.todo,
              odotList.length - 1 === index ? {marginBottom: 10} : {},
              listAnimatedStyle,
            ]}>
            {todo.done !== undefined && todo.done !== false ? (
              <Image
                style={styles.checkImg}
                source={require('../../../assets/images/checked.png')}
              />
            ) : (
              <Image
                style={styles.checkImg}
                source={require('../../../assets/images/unchecked.png')}
              />
            )}
            <View style={styles.todoStyle}>
              <Text>{todo.todo}</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
        {/* {clicked && ( */}
        <Animated.View style={[styles.deleteBtn, deleteBtnAnimatedStyle]}>
          <TouchableOpacity
            onPress={() => {
              handleDeleteTodoList(index);
            }}>
            <Animated.Image
              style={[styles.imgControl, deleteBtnOpacityAnimatedStyle]}
              source={require('../../../assets/images/trashIcon.png')}
            />
          </TouchableOpacity>
        </Animated.View>
        {/* )} */}
      </View>
    </GestureDetector>
  );
};

export default TodoRenderingList;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 15,
    paddingHorizontal: 10,
    height: 45,
    borderRadius: 10,
    shadowColor: '#000',
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    marginTop: 15,
  },

  checkImg: {
    width: 25,
    height: 25,
  },
  todoStyle: {marginLeft: 5},
  deleteBtn: {
    top: 15,
    position: 'absolute',
    zIndex: 10,
    width: 0,
    height: 45,
    paddingVertical: 13,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    opacity: 100,
    borderRadius: 10,
    backgroundColor: 'red',
    flexWrap: 'nowrap',
  },
  imgControl: {
    width: 30,
    height: 30,
  },
});
