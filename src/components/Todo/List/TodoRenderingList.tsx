import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {
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
};

const TodoRenderingList = ({
  odotList,
  todo,
  index,
  handleCheckTodoList,
}: props) => {
  const tempDeleteBtnWidth = useSharedValue(0);
  const [layout, onLayout] = useLayout();

  const navigation = useNavigation();
  const {setTodos} = useTodoList();

  const translateX = useSharedValue(0);
  const deleteBtnWidth = useSharedValue(0);
  const deleteBtnSize = useSharedValue<'none' | 'flex' | undefined>('none');

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
    if (translateX.value > 0) {
      return {
        width: 0,
      };
    } else {
      return {
        width: deleteBtnWidth.value,
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
      if (translateX.value === 0 && event.translationX > 0) {
        return;
      } else {
        console.log(event.translationX);
        if (tempTranslateX.value + event.translationX > 0) {
          deleteBtnWidth.value = withTiming(0, {}, () => {
            runOnJS(setClicked)(false);
          });
          translateX.value = withTiming(0, {}, () => {
            runOnJS(setClicked)(false);
          });
        } else {
          deleteBtnWidth.value = withTiming(
            tempDeleteBtnWidth.value - event.translationX,
            {},
            () => {
              deleteBtnWidth.value > 40 && runOnJS(setClicked)(true);
            },
          );
          translateX.value = withTiming(
            tempTranslateX.value + event.translationX,
          );
          if (event.translationX > layout.width / 2) {
            runOnJS(setClicked)(false);
          }
        }
      }
    })
    .onEnd(event => {
      // if (event.absoluteX < 15) {
      //   runOnJS(handleDeleteItem)(item.fullDate);
      // }
    });

  return (
    <GestureDetector gesture={panGestureEvent}>
      <TouchableOpacity
        onPress={() => handleCheckTodoList(index)}
        key={`todos-${index}`}>
        <View
          style={[
            styles.todo,
            odotList.length - 1 === index ? {marginBottom: 10} : {},
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
        </View>
      </TouchableOpacity>
    </GestureDetector>
  );
};

export default TodoRenderingList;

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
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
});
