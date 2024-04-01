import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
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
import {getStorageData} from '../lib/storage-helper';

export interface Item {
  id: number;
  title: string;
  date: string;
}

export interface ItemType {
  count: string;
  fullDate: string;
}

export interface SectionType {
  title: string;
  data: ItemType[];
}

// const DUMMY_SECTION_DATA: SectionType[] = [
//   {title: '2024/03/31', data: [{count: '10', fullDate: 'asdfasdf'}]},
//   {title: '2024/04/01', data: [{count: '10', fullDate: 'asdfasdf123'}]},
//   {title: '2024/04/32', data: [{count: '10', fullDate: 'asdfasdf456'}]},
//   {
//     title: '2024/04/32',
//     data: [
//       {count: '10', fullDate: 'asdfasdf456'},
//       {count: '10', fullDate: '미ㅏ얼먇'},
//       {count: '10', fullDate: 'asldifjawlidfjv'},
//       {count: '10', fullDate: 'eibvalsoiem'},
//       {count: '10', fullDate: 'asldifjawlidawdf'},
//       {count: '10', fullDate: 'a9188vh8d'},
//     ],
//   },
// ];

const TodoListGroupScreen = () => {
  const navigation = useNavigation();

  const today = moment().format('YYYY/MM/DD');
  const [year, month, date] = today.split('/');

  const [sections, setSections] = useState<SectionType[]>([]);

  const handleClick = () => {
    navigation.goBack();
  };

  const handleAddTask = () => {
    // AsyncStorage.setItem(
    //   'date',
    //   JSON.stringify({
    //     year: year,
    //     month: month,
    //     day: date,
    //   }),
    // );
    // navigation.navigate('AddTaskScreen');
    navigation.navigate('ListSwipeScreen');
  };

  const renderSectionHeader = ({section}: {section: any}) => {
    return (
      <View style={styles.sectionHeader}>
        <Text>{section.title}</Text>
      </View>
    );
  };

  const handleListClicked = ({item}: {item: ItemType}) => {
    let [clickedYear, clickedMonth, clickedDate] = date.split('/');
    AsyncStorage.setItem(
      'date',
      JSON.stringify({
        year: clickedYear,
        month: clickedMonth,
        day: clickedDate,
      }),
    );

    navigation.navigate('TodoListScreen');
  };

  const keyExtractor = (item: ItemType) =>
    `section-list-item-=${item.fullDate}`;

  const renderItem = ({item}: {item: ItemType}) => {
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

  const createSections = (data: ItemType[]): SectionType[] => {
    const nameObject: Record<string, ItemType[]> = {};
    console.log(data);

    data.forEach(item => {
      const firstLetter = item.fullDate.slice(0, 7);
      console.log(firstLetter);
      // if (!firstLetter) return;

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
          )) {
            let dateInfo = `${tempYear}/${tempMonth}/${todo}`;
            let tempData: {done: boolean; todo: string}[] = todos;
            let doneCount = tempData.filter(
              tempEl => tempEl.done === true,
            ).length;

            processedData.push({
              fullDate: dateInfo,
              count: `${doneCount}/${tempData.length}`,
            });
          }
        }
      }
      console.log('여기');
      console.log(processedData.reverse());
    }

    setSections(createSections(processedData));
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
