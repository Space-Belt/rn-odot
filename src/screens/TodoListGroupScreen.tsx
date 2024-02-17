import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import frame from '../assets/images/Frame.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoListScreen from './TodoListScreen';

// - 굳이 필요 없을 것 같아서 바텀탭은 안넣었음
// - 맨 오른쪽에 있는 TODOS 스크린은 빈 화면으로 구현하면 됨
// - 플러스 버튼 눌렀을 때는 우측에 있는 NEW TASKS 스크린으로 navigate 되어야 함(이 버튼은 항상 같은 위치에 플로팅 되는 버튼임)
// - todo 체크되면 -> progress bar가 퍼센티지만큼 채워져야 함(반대는 그만큼 퍼센티지 줄어듦)

const TodoListGroupScreen = () => {
  // const localStorage = useAsyncStorage();
  const navigation = useNavigation();

  const [todoGroups, setTodoGroups] = useState<any>([]);

  const handleClick = () => {
    navigation.goBack();
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('my-key');
      if (value !== null) {
        // value previously stored
        let temp = JSON.parse(value);
        setTodoGroups(temp);
        // setTodoGroups(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const addTodoList = () => {
    navigation.navigate('TodoList');
    let clonedData = [...todoGroups];
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
              position: 'absolute',
              top: 10,
              left: 10,
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
          <Text style={{top: 15, fontWeight: '700'}}>Todos</Text>
        </View>
        {/* 영역 */}
        <ScrollView style={{flex: 1}}>
          <View style={styles.contentArea}></View>
        </ScrollView>
        <TouchableOpacity onPress={addTodoList}>
          <View
            style={{
              height: 60,
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
  {
  }
};

export default TodoListGroupScreen;

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
    // alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backImg: {
    width: 25,
    height: 25,
  },
  contentArea: {
    flex: 1,

    backgroundColor: 'red',
  },
  addTodoBtn: {
    flex: 1,
    backgroundColor: 'blue',
    height: '10%',
  },
});
