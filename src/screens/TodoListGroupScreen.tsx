import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReusableHeader from '../components/Headers/ReusableHeader';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import frame from '../assets/images/Frame.png';

import {getStorageData} from '../lib/storage-helper';
import {useTodoList} from '../recoil/Todo';
import {ITodoItem} from '../types/todos';

export interface Item {
  id: number;
  title: string;
  date: string;
}

export interface IItemType {
  count: string;
  fullDate: string;
  todos: ITodoItem[];
}

export interface SectionType {
  title: string;
  data: IItemType[];
}

const TodoListGroupScreen = () => {
  const navigation = useNavigation();

  const {setTodos} = useTodoList();

  const [sections, setSections] = useState<SectionType[]>([]);

  const handleClick = () => {
    navigation.goBack();
  };

  const handleAddTask = () => {
    navigation.navigate('ListSwipeScreen');
  };

  const renderSectionHeader = ({section}: {section: any}) => {
    return (
      <View style={styles.sectionHeader}>
        <Text>{section.title}</Text>
      </View>
    );
  };

  const handleListClicked = (item: IItemType) => {
    setTodos(item.fullDate, item.todos);
    navigation.navigate('TodoListScreen');
  };

  const keyExtractor = (item: IItemType) =>
    `section-list-item-=${item.fullDate}`;

  const renderItem = ({item}: {item: IItemType}) => {
    return (
      <TouchableOpacity
        onPress={() => handleListClicked(item)}
        activeOpacity={0.7}
        style={styles.listWrapper}>
        <Text style={styles.dateText}>
          {item.fullDate.slice(8, 10)}일 Todos
        </Text>
        <Text style={styles.countText}>{item.count}</Text>
      </TouchableOpacity>
    );
  };

  const createSections = (datas: IItemType[]): SectionType[] => {
    const nameObject: Record<string, IItemType[]> = {};

    datas.forEach(item => {
      const firstLetter = item.fullDate.slice(0, 7);
      console.log(firstLetter);

      if (!nameObject[firstLetter]) {
        nameObject[firstLetter] = [item];
      } else {
        nameObject[firstLetter]!.push(item);
      }
    });
    console.log(nameObject);

    return Object.entries(nameObject).map(([title, data]) => ({
      title,
      data,
    }));
  };

  const getData = React.useCallback(async () => {
    let results = await getStorageData('todos');

    let processedData = [];
    if (results !== null) {
      for (const [tempYear, tempMonths] of Object.entries(results)) {
        for (const [tempMonth, tempDays] of Object.entries(
          tempMonths as {[key: string]: any},
        )) {
          for (const [todo, todos] of Object.entries(
            tempDays as {[key: string]: {done: boolean; todo: string}[]},

//       let processedData = [];
//       if (results !== null) {
//         for (const [tempYear, tempMonths] of Object.entries(results)) {
//           for (const [tempMonth, tempDays] of Object.entries(
//             tempMonths as Object,

          )) {
            let dateInfo = `${tempYear}/${tempMonth}/${todo}`;
            let tempData: {done: boolean; todo: string}[] = todos;
            let doneCount = tempData.filter(
              tempEl => tempEl.done === true,
            ).length;

            processedData.push({
              fullDate: dateInfo,
              count: `${doneCount}/${tempData.length}`,
              todos: tempData,
            });
          }
        }
      }
    }

    setSections(createSections(processedData.reverse()));
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <ReusableHeader
        handleClick={handleClick}
        handleAddTask={handleAddTask}
        centerText={'Todos'}
      />

      <SectionList
        sections={sections}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.sectionStyle}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={true}
      />
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
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
  },
  backImg: {
    width: 25,
    height: 25,
    resizeMode: 'center',
  },
  emptyView: {
    width: 25,
    height: 25,
  },
  buttonWrapper: {
    width: '100%',
    height: '100%',
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    width: 25,
    height: 25,
    resizeMode: 'center',
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
  listWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  dateText: {
    fontWeight: '600',
    fontSize: 16,
  },
  sectionHeader: {
    backgroundColor: '#F2F2F2',
  },
  sectionStyle: {
    width: '100%',
    height: '100%',
    gap: 10,
  },
  countText: {
    color: '#C4C4C4',
  },
});
