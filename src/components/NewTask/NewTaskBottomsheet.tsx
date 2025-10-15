import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {getStorageData} from '../../lib/storage-helper';

import {useBottomSheet} from '../../recoil/BottomSheetStore';
import {useToast} from '../../recoil/ToastStore';
import {todoList} from '../../recoil/Todo';
import {ITodoItem, IWholeTodoList} from '../../types/todos';

const NewTaskBottomsheet = () => {
  const {showToast} = useToast();
  const {hideBottomSheet} = useBottomSheet();
  const [recoilTodo, setRecoilTodo] = useRecoilState(todoList);

  const [todoItem, setTodoItem] = useRecoilState(todoList);

  const [thisYear, thisMonth, thisDay] =
    todoItem.fullDate !== ''
      ? todoItem.fullDate.split('/')
      : [moment().format('YYYY'), moment().format('MM'), moment().format('DD')];

  const [todoGroup, setTodoGroup] = React.useState<IWholeTodoList>({});

  const [todo, setTodo] = React.useState<string>('');

  const addTodoList = () => {
    let clonedData: IWholeTodoList = todoGroup;

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
          let tempRecoilTodo: ITodoItem[] =
            recoilTodo.todos !== undefined ? [...recoilTodo.todos] : [];
          tempRecoilTodo.push({
            todo: todo,
            done: false,
          });

          setRecoilTodo({
            fullDate: `${thisYear}/${thisMonth}/${thisDay}`,
            todos: tempRecoilTodo,
          });

          clonedData[thisYear][thisMonth][thisDay].push({
            todo: todo,
            done: false,
          });
          AsyncStorage.setItem('todos', JSON.stringify(clonedData));
          setTodo('');
          showToast('오늘할일을 꼭 마무리 하십쇼.', 'success');
          hideBottomSheet();
        } else {
          let tempRecoilTodo: ITodoItem[] =
            recoilTodo.todos !== undefined ? [...recoilTodo.todos] : [];

          clonedData[thisYear][thisMonth][thisDay] = [
            {todo: todo, done: false},
          ];
          tempRecoilTodo.push({
            todo: todo,
            done: false,
          });
          AsyncStorage.setItem('todos', JSON.stringify(clonedData));
          setTodo('');
          showToast('오늘 첫 할일 등록했습니다. 화이팅!!', 'success');
          hideBottomSheet();

          setRecoilTodo({
            fullDate: `${thisYear}/${thisMonth}/${thisDay}`,
            todos: tempRecoilTodo,
          });
        }
      } else {
        showToast('한글자 이상 부터 등록됩니다.', 'error');

        // showToast('오늘 첫 할일 등록했습니다. 화이팅!!', 'success');
        hideBottomSheet();

        // setRecoilTodo({
        //   fullDate: `${thisYear}/${thisMonth}/${thisDay}`,
        //   todos: tempRecoilTodo,
        // });
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
      let tempRecoilTodo: ITodoItem[] =
        recoilTodo.todos !== undefined ? [...recoilTodo.todos] : [];
      tempRecoilTodo.push({
        todo: todo,
        done: false,
      });
      AsyncStorage.setItem('todos', JSON.stringify(clonedData));
      setRecoilTodo({
        fullDate: `${thisYear}/${thisMonth}/${thisDay}`,
        todos: tempRecoilTodo,
      });
      setTodo('');
      showToast('할일 등록 성공!! 오늘도 화이팅', 'success');
      hideBottomSheet();
    }
  };

  const handleChangeValue = (text: string) => {
    setTodo(text);
  };

  React.useEffect(() => {
    const getData = async () => {
      let results = await getStorageData('todos');

      if (results === null || results === undefined) {
        setTodoGroup({});
      } else {
        setTodoGroup(results);
      }
    };

    getData();
  }, []);

  // React.useEffect(() => {
  //   console.log(recoilTodo);
  //   if (recoilTodo.fullDate !== '') {
  //     let [y, m, d] = recoilTodo.fullDate.split('/');
  //     setThisYear(y);
  //     setThisMonth(m);
  //     setThisDay(d);
  //   } else {
  //     setThisMonth(moment().format('MM'));
  //     setThisYear(moment().format('YYYY'));
  //     setThisDay(moment().format('DD'));
  //   }
  // }, [recoilTodo]);

  React.useEffect(() => {
    console.log(thisDay, thisMonth, thisYear);
  }, [thisDay, thisMonth, thisYear]);

  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.topText}>NewTask</Text>
        <TextInput
          multiline={true}
          value={todo}
          onChangeText={handleChangeValue}
          placeholder={'tell me what you gonna do today!'}
          autoFocus
          textAlignVertical={Platform.OS === 'android' ? 'top' : 'center'}
        />
      </View>
      <TouchableHighlight style={styles.addTask} onPress={addTodoList}>
        <Text style={styles.addText}>Add Task</Text>
      </TouchableHighlight>
    </View>
  );
};

export default NewTaskBottomsheet;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  taskInput: {
    textAlignVertical: 'top',
    borderWidth: 0,
    fontSize: 14,
    fontWeight: '600',
  },
  addTask: {
    width: '100%',
    backgroundColor: '#FF7461',
    paddingVertical: 12,
    borderRadius: 12,
  },
  addText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
