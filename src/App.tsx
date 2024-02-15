/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import space from './assets/images/space.png';

interface Todo {
  name: string;
  check: boolean;
}

function App(): React.JSX.Element {
  // 이름
  const [myName, setMyName] = React.useState<string>('SpaceBelt');

  // 할일
  const [todo, setTodo] = React.useState<string>('');

  // 할일 리스트
  const [odotList, setOdotList] = React.useState<Todo[]>([]);

  const handleChangeValue = (text: string) => {
    setTodo(text);
  };

  const handlePlusClick = () => {
    let clonedOdotList: Todo[] = [...odotList];
    if (todo.length > 0) {
      clonedOdotList.push({
        check: false,
        name: todo,
      });
    }
    setOdotList(clonedOdotList);
    setTodo('');
  };

  const handleCheckTodoList = (i: number) => {
    let clonedOdotList: Todo[] = [...odotList];
    clonedOdotList[i].check = !clonedOdotList[i].check;
    setOdotList(clonedOdotList);
  };

  const renderList = (todo: Todo, i: number) => {
    return (
      <TouchableOpacity onPress={() => handleCheckTodoList(i)}>
        <View
          style={[
            styles.todo,
            odotList.length - 1 === i ? {marginBottom: 10} : {},
          ]}>
          {todo.check !== undefined && todo.check !== false ? (
            <Image
              style={styles.checkImg}
              source={require('./assets/images/checked.png')}
            />
          ) : (
            <Image
              style={styles.checkImg}
              source={require('./assets/images/unchecked.png')}
            />
          )}
          <View style={{marginLeft: 5}}>
            <Text>{todo.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={{flex: 1}}>
        {/* 상단 */}
        <View style={styles.header}>
          <View>
            <Text style={styles.nameText}>Hello! {myName} 🧞‍♂️</Text>
          </View>
          <View>
            <Image source={space} style={styles.profileImg} />
          </View>
        </View>
        {/* 입력부분 */}
        <View style={styles.textInputArea}>
          <View style={styles.inputBox}>
            <TextInput
              value={todo}
              onChangeText={text => handleChangeValue(text)}
              placeholder="tell me what you gonna do today!"
              style={styles.todoInput}
            />
          </View>
          <TouchableHighlight
            onPress={handlePlusClick}
            style={{borderRadius: 50, width: 40, height: 40}}
            underlayColor="transparent">
            <Image
              style={styles.plusBtn}
              source={require('./assets/images/plusButton.png')}
            />
          </TouchableHighlight>
        </View>
        {/* 투두 부분 */}
        <ScrollView style={{paddingHorizontal: 25}}>
          {odotList.length > 0 ? (
            odotList.map((el: Todo, i: number) => renderList(el, i))
          ) : (
            <></>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: '100%',
    paddingVertical: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  nameText: {
    fontSize: 20,
    fontWeight: '600',
  },
  profileImg: {
    width: 35,
    height: 35,
  },
  textInputArea: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    paddingHorizontal: 25,
  },
  inputBox: {flex: 1, marginRight: 20},
  todoInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    // 아래 다있어야함
    backgroundColor: '#ffffff',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1.95},
    shadowOpacity: 0.25,
    shadowRadius: 1.75,
    elevation: 5, // 안드로이드용
  },
  plusBtn: {
    width: 40,
    height: 40,
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
});

export default App;
