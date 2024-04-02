import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReusableHeader from '../components/Headers/ReusableHeader';
import {useLayout} from '../hooks/useLayout';
import {getStorageData} from '../lib/storage-helper';
import {useTodoList} from '../recoil/Todo';
import {ITodoItem} from '../types/todos';

export interface Item {
  id: number;
  title: string;
  date: string;
}

export interface IItemType {
  count: string;
  fullDate: string;
  todos: ITodoItem[];
}

export interface SectionType {
  title: string;
  data: IItemType[];
}

const TodoListGroupScreen = () => {
  const navigation = useNavigation();
  const {setTodos} = useTodoList();
  const [sections, setSections] = useState<SectionType[]>([]);

  const [layout, onLayout] = useLayout();

  const translateX = useSharedValue(0);
  const deleteBtnWidth = useSharedValue(0);
  const deleteBtnSize = useSharedValue<'none' | 'flex' | undefined>('none');

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

  const handleBackClick = () => {
    navigation.goBack();
  };

  const handleAddTask = () => {
    navigation.navigate('ListSwipeScreen');
  };

  const renderSectionHeader = ({section}: {section: any}) => {
    return (
      <View style={styles.sectionHeader}>
        <Text>{section.title}</Text>
      </View>
    );
  };
  const [clicked, setClicked] = useState<boolean>(false);

  const handleListClicked = (item: IItemType) => {
    setTodos(item.fullDate, item.todos);
    setClicked(true);
    navigation.navigate('TodoListScreen');
  };

  const keyExtractor = (item: IItemType) =>
    `section-list-item-=${item.fullDate}`;

  const animatedRef = useAnimatedRef();
  const tempDeleteBtnWidth = useSharedValue(0);

  const [svgWidth, setSvgWidth] = useState<boolean>(false);

  const svgSize = {display: svgWidth ? 'flex' : 'none'};

  const renderItem = ({item}: {item: IItemType}) => {
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
            ref={animatedRef}
            style={[styles.listBox, listAnimatedStyle]}>
            <TouchableOpacity
              onPress={() => handleListClicked(item)}
              activeOpacity={0.7}
              style={styles.listWrapper}>
              <Text style={styles.dateText}>
                {item.fullDate.slice(8, 10)}일 Todos
              </Text>
              <Text style={styles.countText}>{item.count}</Text>
            </TouchableOpacity>
          </Animated.View>
        </GestureDetector>
        <Animated.View style={[styles.deleteBtn, deleteBtnAnimatedStyle]}>
          {clicked && (
            <Animated.Image
              style={[styles.imgControl]}
              source={require('../assets/images/trashIcon.png')}
            />
          )}
        </Animated.View>
      </View>
    );
  };

  useEffect(() => {
    console.log(svgWidth);
  }, [svgWidth]);

  const createSections = (datas: IItemType[]): SectionType[] => {
    const nameObject: Record<string, IItemType[]> = {};

    datas.forEach(item => {
      const firstLetter = item.fullDate.slice(0, 7);

      if (!nameObject[firstLetter]) {
        nameObject[firstLetter] = [item];
      } else {
        nameObject[firstLetter]!.push(item);
      }
    });

    return Object.entries(nameObject).map(([title, data]) => ({
      title,
      data,
    }));
  };

  const getData = React.useCallback(async () => {
    let results = await getStorageData('todos');

    let processedData = [];
    if (results !== null) {
      for (const [tempYear, tempMonths] of Object.entries(results)) {
        for (const [tempMonth, tempDays] of Object.entries(
          tempMonths as {[key: string]: any},
        )) {
          for (const [todo, todos] of Object.entries(
            tempDays as {[key: string]: {done: boolean; todo: string}[]},
          )) {
            let dateInfo = `${tempYear}/${tempMonth}/${todo}`;
            let tempData: {done: boolean; todo: string}[] = todos;
            let doneCount = tempData.filter(
              tempEl => tempEl.done === true,
            ).length;

            processedData.push({
              fullDate: dateInfo,
              count: `${doneCount}/${tempData.length}`,
              todos: tempData,
            });
          }
        }
      }
    }

    setSections(createSections(processedData.reverse()));
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <ReusableHeader
        handleClick={handleBackClick}
        handleAddTask={handleAddTask}
        centerText={'Todos'}
      />

      <SectionList
        sections={sections}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.sectionStyle}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={true}
      />
    </SafeAreaView>
  );
};

export default TodoListGroupScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 10,
  },
  header: {
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
  },
  backImg: {
    width: 25,
    height: 25,
    resizeMode: 'center',
  },
  emptyView: {
    width: 25,
    height: 25,
  },
  buttonWrapper: {
    width: '100%',
    height: '100%',
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    width: 25,
    height: 25,
    resizeMode: 'center',
  },
  centerBtn: {
    padding: 10,
    backgroundColor: 'skyblue',
    borderRadius: 10,
  },
  btnText: {
    fontWeight: '800',
    fontSize: 18,
    color: 'white',
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
  listBox: {
    width: '100%',
    // position: 'absolute',
  },
  dateText: {
    fontWeight: '600',
    fontSize: 16,
  },
  sectionHeader: {
    backgroundColor: '#F2F2F2',
  },
  sectionStyle: {
    width: '100%',
    height: '100%',
    gap: 10,
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
  trashIcon: {
    opacity: 0,
  },
  imgControl: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
  },
});
