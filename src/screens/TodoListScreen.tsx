import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

import MainHeader from '../components/Headers/MainHeader';
import NewTaskBottomsheet from '../components/NewTask/NewTaskBottomsheet';

import TodoList from '../components/Todo/List/TodoList';
import ProgressBar from '../components/Todo/Progress/ProgressBar';
import {getStorageData} from '../lib/storage-helper';
import {useBottomSheet} from '../recoil/BottomSheetStore';
import {useToast} from '../recoil/ToastStore';
import {TodoItem, WholeTodoList} from '../types/todos';

const TodoListScreen = () => {
  const isFocused = useIsFocused();

  const {showBottomSheet} = useBottomSheet();

  const {isVisible} = useToast();

  const [thisYear, setThisYear] = useState<string>('');
  const [thisMonth, setThitMonth] = useState<string>('');
  const [thisDay, setThisDay] = useState<string>('');

  const [odotList, setOdotList] = React.useState<TodoItem[]>([]);

  const [fullData, setFullData] = React.useState<WholeTodoList>({});

  const handlePlusClick = () => {
    showBottomSheet(<NewTaskBottomsheet />);
  };

  const totalCount = odotList ? odotList.length : 1;
  const doneCount = odotList ? odotList.filter(list => list.done).length : 1;
  const percentageWidth = (doneCount / totalCount) * 100;

  const getDatas = async (y: string, m: string, d: string) => {
    let results = await getStorageData('todos');

    if (results === null) {
      return;
    }

    setFullData(results);
    setOdotList(results[y][m][d]);
  };

  useEffect(() => {
    const getData = async () => {
      let results = await getStorageData('date');
      console.log(results);
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
      getData();
    }
  }, [isFocused, isVisible]);

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={{flex: 1}}>
        {/* 앱에서는 네비게이션이함 nav */}
        <MainHeader />
        <View style={styles.dateWrapper}>
          <Text style={styles.dateText}>
            {thisYear}/{thisMonth}/{thisDay}
          </Text>
        </View>
        <ProgressBar
          percentageWidth={percentageWidth}
          doneCount={doneCount}
          totalCount={totalCount}
          odotList={odotList}
        />
        {odotList !== undefined && (
          <TodoList
            odotList={odotList}
            fullData={fullData}
            setOdotList={setOdotList}
            thisYear={thisYear}
            thisMonth={thisMonth}
            thisDay={thisDay}
          />
        )}
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
