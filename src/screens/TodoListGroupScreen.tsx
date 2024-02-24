import {
  FlatList,
  Image,
  ScrollView,
  SectionList,
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
import TodoListScreen, {Todo} from './TodoListScreen';
import FlatListExample from '../components/TodoFlatList/FlatListExample';
import SectionListExample from '../components/TodoSectionList/SectionListExample';

// - 굳이 필요 없을 것 같아서 바텀탭은 안넣었음
// - 맨 오른쪽에 있는 TODOS 스크린은 빈 화면으로 구현하면 됨
// - 플러스 버튼 눌렀을 때는 우측에 있는 NEW TASKS 스크린으로 navigate 되어야 함(이 버튼은 항상 같은 위치에 플로팅 되는 버튼임)
// - todo 체크되면 -> progress bar가 퍼센티지만큼 채워져야 함(반대는 그만큼 퍼센티지 줄어듦)
export interface Item {
  id: number;
  title: string;
  date: string;
}

export interface ItemType {
  id: string;
  name: string;
}

export interface SectionType {
  title: string;
  data: ItemType[];
}

const TodoListGroupScreen = () => {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.goBack();
  };

  const handleBtn = (type: 'a' | 'b') => {
    if (type === 'a') {
      navigation.navigate('FlatListScreen');
    } else {
      navigation.navigate('SectionListScreen');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{borderRadius: 50, width: 25, height: 25}}
            // underlayColor="transparent"
            onPress={() => handleClick()}>
            <Image source={frame} style={styles.backImg} />
          </TouchableOpacity>

          <Text style={{fontWeight: '700'}}>Todos</Text>
          <View
            style={{
              width: 25,
              height: 25,
            }}></View>
        </View>
        {/* 영역 */}
        {/* <FlatListExample /> */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            onPress={() => handleBtn('a')}
            style={styles.centerBtn}>
            <Text style={styles.btnText}>섹션리스트</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleBtn('b')}
            style={styles.centerBtn}>
            <Text style={styles.btnText}>플랫리스트</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TodoListGroupScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 10,
  },
  header: {
    // height: '10%',
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  backImg: {
    width: 25,
    height: 25,
  },
  buttonWrapper: {
    // flex: 1,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerBtn: {
    padding: 10,
    backgroundColor: 'skyblue',
    borderRadius: 10,
  },
  btnText: {
    fontWeight: '800',
    fontSize: 18,
    color: 'white',
  },
});
