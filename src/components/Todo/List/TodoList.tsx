import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {TodoItem, WholeTodoList} from '../../../types/todos';
import AsyncStorage from '@react-native-async-storage/async-storage';

type props = {
  odotList: TodoItem[];
  setOdotList: Dispatch<SetStateAction<TodoItem[]>>;
  fullData: WholeTodoList;
  thisYear: string;
  thisMonth: string;
  thisDay: string;
};

const TodoList = ({
  odotList,
  fullData,
  setOdotList,
  thisYear,
  thisMonth,
  thisDay,
}: props) => {
  const handleCheckTodoList = (i: number) => {
    let clonedFullData: WholeTodoList = fullData;
    let clonedOdotList: TodoItem[] = [...odotList];
    clonedOdotList[i].done = !clonedOdotList[i].done;
    setOdotList(clonedOdotList);
    clonedFullData[thisYear][thisMonth][thisDay] = clonedOdotList;
    AsyncStorage.setItem('todos', JSON.stringify(clonedFullData));
  };

  return (
    <ScrollView style={styles.scrollViewStyle}>
      {odotList.map((todo, i) => (
        <TouchableOpacity
          onPress={() => handleCheckTodoList(i)}
          key={`todos-${i}`}>
          <View
            style={[
              styles.todo,
              odotList.length - 1 === i ? {marginBottom: 10} : {},
            ]}>
            {todo.done !== undefined && todo.done !== false ? (
              <Image
                style={styles.checkImg}
                source={require('../../../assets/images/checked.png')}
              />
            ) : (
              <Image
                style={styles.checkImg}
                source={require('../../../assets/images/unchecked.png')}
              />
            )}
            <View style={styles.todoStyle}>
              <Text>{todo.todo}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default TodoList;

const styles = StyleSheet.create({
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
  todoStyle: {marginLeft: 5},
  scrollViewStyle: {flex: 1, paddingHorizontal: 25},
});
