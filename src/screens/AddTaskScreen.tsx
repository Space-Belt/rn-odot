import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import arrow from '../assets/images/arrow.png';

import moment from 'moment';
import {TodoItem, WholeTodoList} from '../types/todos';
import AddTaskHeader from '../components/Headers/AddTaskHeader';
import {getAllKeys, getStorageData} from '../lib/storage-helper';
import {useToast} from '../recoil/ToastStore';
import ToastMessage from '../components/toastMessage/ToastMessage';

const AddTaskScreen = () => {
  const {showToast} = useToast();

  const navigation = useNavigation();
  const route = useRoute();

  const {selectedYear, selectedMonth, selectedDate} = route.params;

  const [dataExist, setDataExist] = useState<boolean>(false);

  const [todoGroup, setTodoGroup] = useState<WholeTodoList>({});

  const [todo, setTodo] = useState<string>('');
  const [todoList, setTodoList] = React.useState<TodoItem[]>([]);

  const addTodoList = () => {
    let clonedData: WholeTodoList = todoGroup;

    if (Object.keys(clonedData).length !== 0) {
      if (todo.length > 0) {
        if (clonedData[selectedYear] !== null) {
        } else {
          clonedData[selectedYear] = {};
        }

        if (clonedData[selectedYear][selectedMonth] !== undefined) {
        } else {
          clonedData[selectedYear][selectedMonth] = {};
        }

        if (
          clonedData[selectedYear][selectedMonth][selectedDate] !== undefined
        ) {
          clonedData[selectedYear][selectedMonth][selectedDate].push({
            todo: todo,
            done: false,
          });
          AsyncStorage.setItem('todos', JSON.stringify(clonedData));
          setTodo('');
          showToast('오늘할일을 꼭 마무리 하십쇼.', 'dkdk', 'success');
        } else {
          clonedData[selectedYear][selectedMonth][selectedDate] = [
            {todo: todo, done: false},
          ];
          AsyncStorage.setItem('todos', JSON.stringify(clonedData));
          setTodo('');
          showToast('오늘 첫 할일 등록했습니다. 화이팅!!', 'dkdk', 'success');
        }
      }
    } else {
      clonedData[selectedYear] = {};
      clonedData[selectedYear][selectedMonth] = {};
      clonedData[selectedYear][selectedMonth][selectedDate] = [
        {
          todo: todo,
          done: false,
        },
      ];
      AsyncStorage.setItem('todos', JSON.stringify(clonedData));
      setTodo('');
      showToast('할일 등록 성공!! 오늘도 화이팅', 'dkdk', 'success');
    }
  };

  const handleChangeValue = (text: string) => {
    setTodo(text);
  };

  useEffect(() => {
    const getData = async () => {
      let results = await getStorageData('todos');

      if (results === null) {
        setTodoGroup({});
      } else {
        setTodoGroup(results);
      }
    };

    getData();

    getAllKeys();
  }, []);

  return (
    <SafeAreaView style={styles.safeWrapper}>
      <View style={styles.wrapper}>
        <AddTaskHeader mb={20} title={'New Task'} />
        {/* 영역 */}
        <TextInput
          value={todo}
          onChangeText={(text: string) => handleChangeValue(text)}
          placeholder="tell me what you gonna do today!"
          style={styles.todoInput}
        />

        <View style={styles.arrowPhoto}>
          <Image source={arrow} style={styles.arrowImg} />
        </View>
        <TouchableOpacity onPress={addTodoList}>
          <View style={styles.buttonColor}>
            <Text style={styles.buttonText}>Add Task</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  safeWrapper: {flex: 1},
  wrapper: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textInputArea: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  inputBox: {width: '100%'},
  todoInput: {
    width: '100%',
    borderRadius: 50,
    height: 40,
    backgroundColor: '#ffffff',
    shadowColor: '#0000000D',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 2,
    shadowRadius: 0,
    paddingHorizontal: 17,
    fontWeight: '600',
    elevation: 5,
  },
  arrowPhoto: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowImg: {
    width: 100,
    height: 100,
  },
  buttonColor: {
    height: 45,
    backgroundColor: '#FF7461',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#efefef',
  },
});
