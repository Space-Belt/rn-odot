import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {WholeTodoList} from '../types/todos';
import AddTaskHeader from '../components/Headers/AddTaskHeader';
import {getAllKeys, getStorageData} from '../lib/storage-helper';
import {useToast} from '../recoil/ToastStore';

const AddTaskScreen = () => {
  const {showToast} = useToast();

  const [thisYear, setThisYear] = useState<string>('');
  const [thisMonth, setThitMonth] = useState<string>('');
  const [thisDay, setThisDay] = useState<string>('');

  const [todoGroup, setTodoGroup] = useState<WholeTodoList>({});

  const [todo, setTodo] = useState<string>('');

  const addTodoList = () => {
    let clonedData: WholeTodoList = todoGroup;

    if (Object.keys(clonedData).length !== 0) {
      if (todo.length > 0) {
        if (clonedData[thisYear] !== null) {
        } else {
          clonedData[thisYear] = {};
        }

        if (clonedData[thisYear][thisMonth] !== undefined) {
        } else {
          clonedData[thisYear][thisMonth] = {};
        }

        if (clonedData[thisYear][thisMonth][thisDay] !== undefined) {
          clonedData[thisYear][thisMonth][thisDay].push({
            todo: todo,
            done: false,
          });
          AsyncStorage.setItem('todos', JSON.stringify(clonedData));
          setTodo('');
          showToast('오늘할일을 꼭 마무리 하십쇼.', 'success');
        } else {
          clonedData[thisYear][thisMonth][thisDay] = [
            {todo: todo, done: false},
          ];
          AsyncStorage.setItem('todos', JSON.stringify(clonedData));
          setTodo('');
          showToast('오늘 첫 할일 등록했습니다. 화이팅!!', 'success');
        }
      }
    } else {
      clonedData[thisYear] = {};
      clonedData[thisYear][thisMonth] = {};
      clonedData[thisYear][thisMonth][thisDay] = [
        {
          todo: todo,
          done: false,
        },
      ];
      AsyncStorage.setItem('todos', JSON.stringify(clonedData));
      setTodo('');
      showToast('할일 등록 성공!! 오늘도 화이팅', 'success');
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
    };

    getData();
  }, []);

  return (
    <SafeAreaView style={styles.safeWrapper}>
      <View style={styles.wrapper}>
        <AddTaskHeader mb={20} title={'New Task'} />

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
