import {SectionList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ItemType, SectionType} from '../screens/TodoListGroupScreen';

const sectionItem: ItemType[] = [
  {id: '1', name: 'a1'},
  {id: '2', name: 'a2'},
  {id: '3', name: 'a3'},
  {id: '4', name: 'a4'},
  {id: '5', name: 'a5'},
  {id: '6', name: 'b1'},
  {id: '7', name: 'b2'},
  {id: '8', name: 'b3'},
  {id: '9', name: 'b4'},
  {id: '10', name: 'b5'},
  {id: '11', name: 'c1'},
  {id: '12', name: 'c2'},
  {id: '13', name: 'c3'},
  {id: '14', name: 'c4'},
  {id: '15', name: 'c5'},
  {id: '16', name: 'd1'},
  {id: '17', name: 'd2'},
  {id: '18', name: 'd3'},
  {id: '19', name: 'd4'},
  {id: '20', name: 'd5'},
  {id: '21', name: 'e1'},
  {id: '22', name: 'e2'},
  {id: '23', name: 'e3'},
  {id: '24', name: 'e4'},
  {id: '25', name: 'e5'},
];

/**
 *
 * {
 * 2024.02: {
 *  01: [
 *      {
 *        todo: "할일",
 *        done: true,
 *      },
 *      {
 *        todo: "할일",
 *        done: false,
 *      }
 *  ];
 * }
 *
 * }
 */

const SectionListExample = () => {
  const renderItem = ({item}: {item: ItemType}) => {
    return (
      <View style={styles.listBox}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
    );
  };

  const sections: SectionType[] = React.useMemo(() => {
    const nameObject: Record<string, ItemType[]> = {};

    sectionItem.forEach(item => {
      const firstLetter = item.name[0];

      if (!firstLetter) return;

      if (!nameObject[firstLetter]) {
        nameObject[firstLetter] = [item];
      } else {
        nameObject[firstLetter]!.push(item);
      }
    });

    return Object.entries(nameObject).map(([title, data]) => ({
      title,
      data,
    }));
  }, []);

  const keyExtractor = (item: Item) => `section-list-item-=${item.id}`;

  const renderSectionHeader = ({section}: {section: any}) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </View>
    );
  };

  return (
    <SectionList
      sections={sections}
      contentContainerStyle={{gap: 10}}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      style={styles.wrapper}
      stickySectionHeadersEnabled={true}
    />
  );
};

export default SectionListExample;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  listBox: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5, // 안드로이드용
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
  },
  sectionHeader: {
    backgroundColor: '#F2F2F2',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: 'red',
  },
});
