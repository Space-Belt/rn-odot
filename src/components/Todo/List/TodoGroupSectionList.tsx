import {useNavigation} from '@react-navigation/native';

import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useLayout} from '../../../hooks/useLayout';
import {useTodoList} from '../../../recoil/Todo';
import {IItemType} from '../../../screens/TodoListGroupScreen';

type props = {
  item: IItemType;
  handleDeleteItem: (args: string) => void;
};

const TodoGroupSectionList = ({item, handleDeleteItem}: props) => {
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

  const handleListClicked = (items: IItemType) => {
    setTodos(items.fullDate, items.todos);
    navigation.navigate('TodoListScreen');
  };

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
            {duration: 100},
            () => {
              deleteBtnWidth.value > 40 && runOnJS(setClicked)(true);
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
        runOnJS(handleDeleteItem)(item.fullDate);
      }
    });

  return (
    <View>
      <GestureDetector gesture={panGestureEvent}>
        <Animated.View
          onLayout={onLayout}
          style={[styles.listBox, listAnimatedStyle]}>
          <TouchableOpacity
            onPress={() => handleListClicked(item)}
            activeOpacity={0.7}
            style={styles.listWrapper}>
            <Text style={styles.dateText}>
              {item?.fullDate.slice(8, 10)}일 Todos
            </Text>
            <Text style={styles.countText}>{item?.count}</Text>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
      <Animated.View style={[styles.deleteBtn, deleteBtnAnimatedStyle]}>
        <TouchableOpacity onPress={() => handleDeleteItem(item.fullDate)}>
          {clicked && (
            <Animated.Image
              style={[styles.imgControl]}
              source={require('../../../assets/images/trashIcon.png')}
            />
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default TodoGroupSectionList;

const styles = StyleSheet.create({
  listBox: {
    width: '100%',
  },
  listWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  dateText: {
    fontWeight: '600',
    fontSize: 16,
  },
  countText: {
    color: '#C4C4C4',
  },
  deleteBtn: {
    position: 'absolute',
    zIndex: 10,
    width: 0,
    height: '100%',
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
