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
};

const TodoGroupSectionList = ({item}: props) => {
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

  const deleteBtnSizeAnimatedStyle = useAnimatedStyle(() => {
    return {
      // width: deleteBtnSize.value,
      display: deleteBtnSize.value,
    };
  });
  const handleListClicked = (item: IItemType) => {
    setTodos(item.fullDate, item.todos);

    navigation.navigate('TodoListScreen');
  };

  const panGestureEvent = Gesture.Pan()
    .onStart(() => {
      tempDeleteBtnWidth.value = deleteBtnWidth.value;
    })
    .onUpdate(event => {
      // 1. 오른쪽으로는
      if (translateX.value === 0 && event.translationX > 0) {
        return;
      } else {
        if (translateX.value + event.translationX > 0) {
          deleteBtnWidth.value = withTiming(0, {}, () => {
            runOnJS(setClicked)(false);
          });
          translateX.value = withTiming(0, {}, () => {
            runOnJS(setClicked)(false);
          });
        } else {
          deleteBtnWidth.value = withTiming(-event.translationX, {}, () => {
            deleteBtnWidth.value > 30 && runOnJS(setClicked)(true);
          });
          translateX.value = withTiming(event.translationX);
        }
        // if (translateX.value < -20) {
        //   //   deleteBtnSize.value = withTiming('flex', {duration: 200});
        //   // deleteBtnSize.value = withTiming('flex');
        //   runOnJS(setClicked)(true);
        // } else if (translateX.value > -20) {
        //   console.log(translateX.value);
        //   runOnJS(setClicked)(false);
        //   // deleteBtnSize.value = withTiming('none');
        //   //   deleteBtnSize.value = withTiming('none', {duration: 200});
        // }
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
        {clicked && (
          <Animated.Image
            style={[styles.imgControl]}
            source={require('../../../assets/images/trashIcon.png')}
          />
        )}
      </Animated.View>
    </View>
  );
};

export default TodoGroupSectionList;

const styles = StyleSheet.create({
  listBox: {
    width: '100%',
    // position: 'absolute',
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
    // backgroundColor: 'red',
    flexWrap: 'nowrap',
  },
  imgControl: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
  },
});
