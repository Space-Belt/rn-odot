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
import {Todo} from './TodoListScreen';

const AddTaskScreen = () => {
  const navigation = useNavigation();

  const [todo, setTodo] = useState<string>('');
  const [odotList, setOdotList] = React.useState<Todo[]>([]);

  const handleClick = () => {
    navigation.goBack();
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('to-do');
      if (value !== null) {
        // value previously stored
        let temp = JSON.parse(value);
        console.log('실행됨');
        console.log(value);
        setOdotList(temp);
        // setTodoGroups(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const addTodoList = async () => {
    let clonedData = [...odotList];
    clonedData.push({
      name: todo,
      check: false,
    });
    let tempData = JSON.stringify(clonedData);
    await AsyncStorage.setItem('to-do', tempData);

    navigation.goBack();
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
        <View style={styles.header}>
          <View
            style={{
              width: 25,
              height: 25,
            }}>
            <TouchableOpacity
              style={{borderRadius: 50, width: 25, height: 25}}
              // underlayColor="transparent"
              onPress={() => handleClick()}>
              <Image source={frame} style={styles.backImg} />
            </TouchableOpacity>
          </View>
          <Text style={{fontWeight: '700'}}>AddTask</Text>
          <View style={{width: 25, height: 25}}></View>
        </View>
        {/* 영역 */}
        <View style={styles.textInputArea}>
          <TextInput
            value={todo}
            onChangeText={(text: string) => handleChangeValue(text)}
            placeholder="tell me what you gonna do today!"
            style={styles.todoInput}
          />
        </View>
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
          <View
            style={{
              height: 40,
              backgroundColor: 'green',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
            }}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 20,
                color: '#efefef',
              }}>
              Add Task
            </Text>
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
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  header: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  backImg: {
    width: 25,
    height: 25,
  },
  contentArea: {
    flex: 1,
    height: '80%',
  },
  textInputArea: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    paddingHorizontal: 20,
  },
  inputBox: {width: '100%'},
  todoInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%',
    // 아래 다있어야함
    backgroundColor: '#ffffff',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1.95},
    shadowOpacity: 0.25,
    shadowRadius: 1.75,
    elevation: 5, // 안드로이드용
  },
});
