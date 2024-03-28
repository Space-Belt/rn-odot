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
import {getStorageData} from '../../lib/storage-helper';
import {useBottomSheet} from '../../recoil/BottomSheetStore';
import {useToast} from '../../recoil/ToastStore';
import {WholeTodoList} from '../../types/todos';

const NewTaskBottomsheet = () => {
  const {showToast} = useToast();
  const {hideBottomSheet} = useBottomSheet();

  const [thisYear, setThisYear] = React.useState<string>('');
  const [thisMonth, setThitMonth] = React.useState<string>('');
  const [thisDay, setThisDay] = React.useState<string>('');

  const [todoGroup, setTodoGroup] = React.useState<WholeTodoList>({});

  const [todo, setTodo] = React.useState<string>('');

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
          hideBottomSheet();
        } else {
          clonedData[thisYear][thisMonth][thisDay] = [
            {todo: todo, done: false},
          ];
          AsyncStorage.setItem('todos', JSON.stringify(clonedData));
          setTodo('');
          showToast('오늘 첫 할일 등록했습니다. 화이팅!!', 'success');
          hideBottomSheet();
        }
      } else {
        showToast('한글자 이상 부터 등록됩니다.', 'error');
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
      hideBottomSheet();
    }
  };

  const handleChangeValue = (text: string) => {
    setTodo(text);
  };

  React.useEffect(() => {
    const getData = async () => {
      let results = await getStorageData('todos');

      if (results === null) {
        setTodoGroup({});
      } else {
        setTodoGroup(results);
      }
    };

    getData();
  }, []);

  React.useEffect(() => {
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
