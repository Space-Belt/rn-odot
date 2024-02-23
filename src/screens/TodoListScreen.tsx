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
import React, {useEffect} from 'react';
import space from '../assets/images/space.png';
import hamburger from '../assets/images/hamburger.png';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TodoItem} from '../types/todos';

const TodoListScreen = ({route}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // 이름
  const [myName, setMyName] = React.useState<string>('SpaceBelt');

  // 할일
  const [todo, setTodo] = React.useState<string>('');

  // 할일 리스트
  const [odotList, setOdotList] = React.useState<TodoItem[]>([]);

  const handlePlusClick = () => {
    navigation.navigate('AddTaskScreen');
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

  const handleHamburgerBar = () => {
    navigation.navigate('TodoListGroupScreen');
  };

  const handleCheckTodoList = (i: number) => {
    let clonedOdotList: TodoItem[] = [...odotList];
    clonedOdotList[i].check = !clonedOdotList[i].check;
    setOdotList(clonedOdotList);
  };

  const renderList = (todo: TodoItem, i: number) => {
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
              source={require('../assets/images/checked.png')}
            />
          ) : (
            <Image
              style={styles.checkImg}
              source={require('../assets/images/unchecked.png')}
            />
          )}
          <View style={{marginLeft: 5}}>
            <Text>{todo.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  const totalCount = odotList.length;
  const doneCount = odotList.filter(list => list.check).length;
  const percentage = (doneCount / totalCount) * 100;

  const percentStyle = [styles.percentage, {width: `${percentage}%`}];

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={{flex: 1}}>
        {/* 상단 */}
        <View style={styles.header}>
          <View>
            <Image source={space} style={styles.profileImg} />
          </View>
          <View>
            <Image
              source={require('../assets/images/ODOT.png')}
              style={styles.logo}
            />
          </View>
          <TouchableOpacity onPress={handleHamburgerBar}>
            <View>
              <Image source={hamburger} style={styles.profileImg} />
            </View>
          </TouchableOpacity>
        </View>
        {/* 입력부분 */}
        <View
          style={{
            marginHorizontal: 20,
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
            backgroundColor: '#ffffff',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 1.95},
            shadowOpacity: 0.25,
            shadowRadius: 1.75,
            elevation: 5, // 안드로이드용
          }}>
          <Text>progress</Text>
          <View
            style={{
              height: 10,
              borderRadius: 10,
              marginVertical: 10,

              flexDirection: 'row',
              position: 'relative',
              backgroundColor: '#D9D9D9',
            }}>
            <View
              style={{
                position: 'relative',
                width: '100%',
                height: 10,
              }}>
              <View style={percentStyle} />
            </View>
          </View>
          <View>
            <Text
              style={{
                color: '#C4C4C4',
              }}>{`${doneCount} / ${totalCount}`}</Text>
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
          style={{
            position: 'absolute',
            borderRadius: 50,
            width: 40,
            height: 40,
            right: 10,
            bottom: 10,
          }}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  logo: {width: 41, height: 20, resizeMode: 'center'},
  nameText: {
    fontSize: 20,
    fontWeight: '600',
  },
  profileImg: {
    width: 25,
    height: 25,
  },
  textInputArea: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    paddingHorizontal: 25,
  },
  inputBox: {flex: 1},
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
