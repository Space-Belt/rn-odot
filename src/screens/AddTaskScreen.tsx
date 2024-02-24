import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
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
import frame from '../assets/images/Frame.png';
import arrow from '../assets/images/arrow.png';

import moment from 'moment';
import {TodoItem, TodoList} from '../types/todos';
import AddTaskHeader from '../components/Headers/AddTaskHeader';

/**
 {
  2024: {
   01: {
     01: [
          {
           todo: "할일",
           done: true,
         },
         {
           todo: "할일",
           done: false,
         }
       ];
     },
   02: {
     01: [
          {
           todo: "할일",
           done: true,
         },
         {
           todo: "할일",
           done: false,
         }
       ];
     },
  }
 }
 */
const AddTaskScreen = () => {
  const navigation = useNavigation();

  const today = moment().format('YYYY/MM/DD');
  const year = today.slice(0, 5);
  const month = today.slice(5, 7);
  const day = today.slice(8, 10);

  const [dataExist, setDataExist] = useState<boolean>(false);

  const [todoGroup, setTodoGroup] = useState<any>();

  const [todo, setTodo] = useState<string>('');
  const [todoList, setTodoList] = React.useState<TodoItem[]>([]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('to-do');

      if (value !== null) {
        //   // value previously stored
        let temp = JSON.parse(value);
        //   console.log('실행됨');
        //   console.log(value);
        //   setTodoList(temp);

        if (temp[year] !== undefined) {
          if (temp[year][month] !== undefined) {
            if (temp[year][month][day] !== undefined) {
            } else {
            }
          } else {
          }
        } else {
        }

        if (
          temp &&
          temp[month] !== undefined &&
          temp[month][day].todos !== undefined &&
          temp[month][day].todos !== null
        ) {
          setTodoList(temp[month][day].todos);
        }
      }
    } catch (e) {
      // error reading value
    }
  };

  const addTodoList = async () => {
    if (todo.length > 0) {
      // let clonedData = [...todoList];
      // clonedData.push({
      //   name: todo,
      //   check: false,
      // });
      // let tempData = JSON.stringify(clonedData);
      // await AsyncStorage.setItem(, tempData);
      if (todoList.length > 0) {
        let clonedData = [...todoList];
      }

      navigation.goBack();
    }
  };

  const handleChangeValue = (text: string) => {
    setTodo(text);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.wrapper}>
        <AddTaskHeader mb={20} title={'New Task'} />
        {/* 영역 */}
        <TextInput
          value={todo}
          onChangeText={(text: string) => handleChangeValue(text)}
          placeholder="tell me what you gonna do today!"
          style={styles.todoInput}
        />

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={arrow}
            style={{
              width: 100,
              height: 100,
            }}
          />
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
    elevation: 5, // 안드로이드용
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
