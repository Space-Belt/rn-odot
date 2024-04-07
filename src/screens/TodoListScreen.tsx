import React, {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import moment from 'moment';

import MainHeader from '../components/Headers/MainHeader';
import NewTaskBottomsheet from '../components/NewTask/NewTaskBottomsheet';

import {useRecoilValue} from 'recoil';
import TodoList from '../components/Todo/List/TodoList';
import ProgressBar from '../components/Todo/Progress/ProgressBar';
import {getStorageData} from '../lib/storage-helper';

import {useBottomSheet} from '../recoil/BottomSheetStore';
import {useToast} from '../recoil/ToastStore';
import {todoList} from '../recoil/Todo';
import {IWholeTodoList} from '../types/todos';

import {TodoItem, WholeTodoList} from '../types/todos';

const defaultParams = {
  selectedYear: '',
  selectedMonth: '',
  selectedDate: '',
};


const TodoListScreen = () => {
  const isFocused = useIsFocused();

  const {showBottomSheet} = useBottomSheet();

  const {isVisible} = useToast();
  const todoItem = useRecoilValue(todoList);

  const [thisYear, thisMonth, thisDay] = todoItem.fullDate.split('/');

  const [fullData, setFullData] = React.useState<IWholeTodoList>({});

  const handlePlusClick = () => {
    showBottomSheet(<NewTaskBottomsheet />);
  };

  const totalCount = todoItem ? todoItem.todos.length : 1;
  const doneCount = todoItem
    ? todoItem.todos.filter(list => list.done).length
    : 1;
  const percentageWidth = (doneCount / totalCount) * 100;

  const getDatas = async () => {
    let results = await getStorageData('todos');

    if (results === null) {
      return;
    }

    setFullData(results);
  };

  useEffect(() => {

    const getData = async () => {
      let results = await getStorageData('date');

      if (results !== null) {
        setThisYear(results.year);
        setThitMonth(results.month);
        setThisDay(results.day);
      } else {
        setThisYear(moment().format('YYYY'));
        setThitMonth(moment().format('MM'));
        setThisDay(moment().format('DD'));
      }
      getDatas(results.year, results.month, results.day);
    };

    if (isFocused || isVisible === true) {
      getDatas();
    }
  }, [isFocused, isVisible]);

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={{flex: 1}}>
        {/* 앱에서는 네비게이션이함 nav */}
        <MainHeader />
        <View style={styles.dateWrapper}>
          <Text style={styles.dateText}>{todoItem.fullDate}</Text>
        </View>
        <ProgressBar
          percentageWidth={percentageWidth}
          doneCount={doneCount}
          totalCount={totalCount}
          odotList={todoItem.todos}
        />
        <TodoList
          odotList={todoItem.todos}
          fullData={fullData}
          thisYear={thisYear}
          thisMonth={thisMonth}
          thisDay={thisDay}
        />
        <TouchableHighlight
          onPress={handlePlusClick}
          style={styles.plusWrapper}
          underlayColor="transparent">
          <Image
            style={styles.plusBtn}
            source={require('../assets/images/plusButton.png')}
          />
        </TouchableHighlight>
      </SafeAreaView>
    </View>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: '100%',
    paddingVertical: 10,
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputArea: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#00000026',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 2,
    shadowRadius: 0,
    gap: 15,
    marginHorizontal: 20,
  },
  percentageArea: {
    height: 10,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: '#D9D9D9',
  },
  progressTextStyle: {fontWeight: '600'},
  emptyPercentage: {
    position: 'relative',
    width: '100%',
  },
  countText: {
    color: '#C4C4C4',
  },
  inputBox: {flex: 1},
  plusWrapper: {
    position: 'absolute',
    borderRadius: 50,
    width: 40,
    height: 40,
    right: 20,
    bottom: 10,
  },
  plusBtn: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 0,
  },
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
  todoStyle: {marginLeft: 5},
  scrollViewStyle: {flex: 1, paddingHorizontal: 25},

  checkImg: {
    width: 25,
    height: 25,
  },

  percentage: {
    position: 'absolute',
    width: '0%',
    height: 10,
    borderRadius: 10,
    backgroundColor: '#FF7461',
  },
  dateWrapper: {
    paddingHorizontal: 20,
    fontWeight: '700',
    alignItems: 'center',
  },
  dateText: {
    width: 110,
    color: '#333',
    textAlign: 'center',
    paddingVertical: 5,
    marginBottom: 5,
    fontWeight: '700',
    elevation: 5,
    // iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
  },
});
