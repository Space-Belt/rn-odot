import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

import { ScrollView, StyleSheet } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { useTodoList } from '../../../recoil/Todo';

import { ITodoItem, IWholeTodoList } from '../../../types/todos';
import TodoRenderingList from './TodoRenderingList';


import React from 'react';

type props = {
  odotList: ITodoItem[];
  setOdotList: Dispatch<SetStateAction<ITodoItem[]>>;
  fullData: IWholeTodoList;
  thisYear: string;
  thisMonth: string;
  thisDay: string;
};

const TodoList = ({
  setOdotList,
  odotList,
  fullData,
  thisYear,
  thisMonth,
  thisDay,
}: props) => {
  const {setTodos} = useTodoList();

  const handleCheckTodoList = (i: number) => {
    let clonedFullData: IWholeTodoList = fullData;
    let clonedOdotList: ITodoItem[] = [...odotList];

    clonedOdotList[i].done = !clonedOdotList[i].done;
    setOdotList(clonedOdotList);
  const {setTodos} = useTodoList();

  const handleCheckTodoList = (i: number) => {
    let clonedFullData: IWholeTodoList = fullData;
    let clonedOdotList: ITodoItem[] = [...odotList];
    clonedOdotList[i] = {
      done: !clonedOdotList[i].done,
      todo: clonedOdotList[i].todo,
    };
    setTodos(`${thisYear}/${thisMonth}/${thisDay}`, clonedOdotList);
    clonedFullData[thisYear][thisMonth][thisDay] = clonedOdotList;
    AsyncStorage.setItem('todos', JSON.stringify(clonedFullData));
  };

  const handleDeleteTodoList = (listIndex: number) => {
    let clonedData = [...odotList];
    clonedData.splice(listIndex, 1);
    let clonedFullData: IWholeTodoList = fullData;
    
    setOdotList({
      fullDate: `${thisYear}/${thisMonth}/${thisDay}`,
      todos: clonedData,
    });

    if (clonedFullData[thisYear][thisMonth][thisDay].length < 2) {
      delete clonedFullData[thisYear][thisMonth][thisDay];
      AsyncStorage.setItem('todos', JSON.stringify(clonedFullData));
    } else {
      clonedFullData[thisYear][thisMonth][thisDay] = [...clonedData];
      AsyncStorage.setItem('todos', JSON.stringify(clonedFullData));
    }
  };

  const swipeGestureEvent = Gesture.Pan()
    .onStart(() => {
      
    })
    .onUpdate(event => {
      
    });

  // return (
  //   <ScrollView style={styles.scrollViewStyle}>

  //     {odotList.map((todo, i) => (
  //       <TouchableOpacity
  //         onPress={() => handleCheckTodoList(i)}
  //         key={`todos-${i}`}>
  //         <View
  //           style={[
  //             styles.todo,
  //             odotList.length - 1 === i ? {marginBottom: 10} : {},
  //           ]}>
  //           {todo.done !== undefined && todo.done !== false ? (
  //             <Image
  //               style={styles.checkImg}
  //               source={require('../../../assets/images/checked.png')}
  //             />
  //           ) : (
  //             <Image
  //               style={styles.checkImg}
  //               source={require('../../../assets/images/unchecked.png')}
  //             />
  //           )}
  //           <View style={styles.todoStyle}>
  //             <Text>{todo.todo}</Text>
  //           </View>
  //         </View>
  //       </TouchableOpacity>
        
  const handleDeleteTodoList = (listIndex: number) => {
    let clonedData = [...odotList];
    clonedData.splice(listIndex, 1);
    let clonedFullData: IWholeTodoList = fullData;

    setOdotList({
      fullDate: `${thisYear}/${thisMonth}/${thisDay}`,
      todos: clonedData,
    });

    if (clonedFullData[thisYear][thisMonth][thisDay].length < 2) {
      delete clonedFullData[thisYear][thisMonth][thisDay];
      AsyncStorage.setItem('todos', JSON.stringify(clonedFullData));
    } else {
      clonedFullData[thisYear][thisMonth][thisDay] = [...clonedData];
      AsyncStorage.setItem('todos', JSON.stringify(clonedFullData));
    }
  };

  const swipeGestureEvent = Gesture.Pan()
    .onStart(() => {})
    .onUpdate(event => {});

  return (
    <ScrollView style={styles.scrollViewStyle}>

      {odotList?.map((todo, i) => (
        <TodoRenderingList
          key={i}
          handleDeleteTodoList={handleDeleteTodoList}
          odotList={odotList}
          todo={todo}
          index={i}
          handleCheckTodoList={handleCheckTodoList}
        />
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
