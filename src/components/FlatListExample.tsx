import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Item, ItemType} from '../screens/TodoListGroupScreen';

const FlatListExample = () => {
  const [itemList, setItemList] = useState<Item[]>([]);

  const renderItem = ({item}: {item: Item}) => {
    return (
      <View style={styles.listBox}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  const keyExtractor = (item: Item) => `flat-list-item-=${item.id}`;

  useEffect(() => {
    let clonedArr: Item[] = Array.from({length: 100}, (_, index) => ({
      id: index,
      title: `item-${index}`,
      date: '2023.12.15',
    }));

    setItemList(clonedArr);
  }, []);
  return (
    <FlatList
      data={itemList}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.wrapper}
      initialNumToRender={5}
    />
  );
};

export default FlatListExample;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  listBox: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5, // 안드로이드용
  },

  title: {
    fontWeight: '700',
    fontSize: 15,
  },
});
