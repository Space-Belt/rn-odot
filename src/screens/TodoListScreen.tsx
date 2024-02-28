import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';

import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TodoItem, WholeTodoList} from '../types/todos';
import MainHeader from '../components/Headers/MainHeader';
import {getStorageData} from '../lib/storage-helper';

const TodoListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const {selectedYear, selectedMonth, selectedDate} = route.params;

  const [odotList, setOdotList] = React.useState<TodoItem[]>([]);

  const [fullData, setFullData] = React.useState<WholeTodoList>({});

  const handlePlusClick = () => {
    navigation.navigate('AddTaskScreen', {
      selectedYear: selectedYear,
      selectedMonth: selectedMonth,
      selectedDate: selectedDate,
    });
  };

  const handleCheckTodoList = (i: number) => {
    let clonedFullData: WholeTodoList = fullData;
    let clonedOdotList: TodoItem[] = [...odotList];
    clonedOdotList[i].done = !clonedOdotList[i].done;
    setOdotList(clonedOdotList);
    clonedFullData[selectedYear][selectedMonth][selectedDate] = clonedOdotList;

    AsyncStorage.setItem('todos', JSON.stringify(clonedFullData));
  };

  const renderList = (todo: TodoItem, i: number) => {
    return (
      <TouchableOpacity onPress={() => handleCheckTodoList(i)}>
        <View
          style={[
            styles.todo,
            odotList.length - 1 === i ? {marginBottom: 10} : {},
          ]}>
          {todo.done !== undefined && todo.done !== false ? (
            <Image
              style={styles.checkImg}
              source={require('../assets/images/checked.png')}
            />
          ) : (
            <Image
              style={styles.checkImg}
              source={require('../assets/images/unchecked.png')}
            />
          )}
          <View style={{marginLeft: 5}}>
            <Text>{todo.todo}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const getDatas = async () => {
      let results = await getStorageData('todos');
      let todoList: TodoItem[] = [];
      if (results !== null) {
        if (results[selectedYear][selectedMonth][selectedDate]) {
          console.log('dfdfdfdf');
          results[selectedYear][selectedMonth][selectedDate].map(el => {
            todoList.push(el);
          });
        }
      }
      setFullData(results);
      setOdotList(todoList);
    };
    if (isFocused) {
      getDatas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const totalCount = odotList.length;
  const doneCount = odotList.filter(list => list.done).length;
  const percentage = (doneCount / totalCount) * 100;

  const percentStyle = [styles.percentage, {width: `${percentage}%`}];

  useEffect(() => {}, []);

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={{flex: 1}}>
        {/* 앱에서는 네비게이션이함 nav */}
        <MainHeader />
        {/* 입력부분 */}
        <View style={styles.textInputArea}>
          <Text style={{fontWeight: '600'}}>progress</Text>
          <View style={styles.percentageArea}>
            <View style={styles.emptyPercentage}>
              <View style={percentStyle} />
            </View>
          </View>
          <View>
            <Text
              style={styles.countText}>{`${doneCount} / ${totalCount}`}</Text>
          </View>
        </View>

        {/* 투두 부분 */}
        <ScrollView style={{paddingHorizontal: 25}}>
          {odotList.length > 0 ? (
            odotList.map((el: TodoItem, i: number) => renderList(el, i))
          ) : (
            <></>
          )}
        </ScrollView>
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
});
