import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import space from '../assets/images/space.png';
import ReusableHeader from '../components/Headers/ReusableHeader';

type AnimatedInterpolation = ReturnType<Animated.Value['interpolate']>;

interface IMockData {
  id: number;
  name: string;
  latestMessage: string;
  latestMessageDate: string;
}

const MOCK_DATA: IMockData[] = [
  {
    id: 1,
    name: 'David',
    latestMessage: 'Hi, How are ju',
    latestMessageDate: '2024.03.30',
  },
  {
    id: 2,
    name: 'Dan',
    latestMessage: 'Hi, How are su',
    latestMessageDate: '2024.03.31',
  },
  {
    id: 3,
    name: 'Deen',
    latestMessage: 'Hi, How are du',
    latestMessageDate: '2024.03.32',
  },
  {
    id: 4,
    name: 'Dinosour',
    latestMessage: 'Hi, How are u',
    latestMessageDate: '2024.03.33',
  },
];
const ListSwipeScreen = () => {
  const navigation = useNavigation();
  const [mock, setMock] = React.useState<IMockData[]>(MOCK_DATA);

  const handleClick = () => {
    navigation.goBack();
  };

  const deleteList = (id: number) => {
    let temp = mock.filter(el => el.id !== id);
    setMock(temp);
  };

  const renderRightAction = (
    progress: AnimatedInterpolation,
    dragValue: AnimatedInterpolation,
    id: number,
  ) => {
    // console.log(progress, dragValue);
    const opacity = dragValue.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
    });

    return (
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => {
          deleteList(id);
        }}>
        <Animated.Text style={[styles.deleteBtnText, {opacity: opacity}]}>
          Delete
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}: {item: IMockData}) => {
    return (
      <Swipeable
        renderRightActions={(progess, dragValue) =>
          renderRightAction(progess, dragValue, item.id)
        }>
        <View style={styles.chatBox}>
          <View style={styles.chatLeftSide}>
            <Image source={space} style={styles.profileImg} />
            <View>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.messageText}>{item.latestMessage}</Text>
            </View>
          </View>
          <Text style={styles.dateText}>{item.latestMessageDate}</Text>
        </View>
      </Swipeable>
    );
  };
  // const solution = (n: number) => {
  //   var answer = 0;
  //   let even = n % 2 === 0 ? true : false;
  //   if (even) {
  //     for (let i = 2; i <= n; i + 2) {
  //       if (n % i === 0) {
  //         answer += i * i;
  //       }
  //     }
  //   } else {
  //     for (let i = 1; i <= n; i + 2) {
  //       answer += i;
  //     }
  //   }
  //   console.log(answer);
  //   return answer;
  // };
  // React.useEffect(() => {
  //   console.log('dfdfdf');
  //   solution(7);
  // }, []);

  return (
    <SafeAreaView style={styles.safeWrapper}>
      <View style={styles.wrapper}>
        <ReusableHeader
          handleClick={handleClick}
          centerText={''}
          paddingHorizontal={20}
        />
        <Text style={styles.title}>ChatRoomsssss</Text>
        <FlatList data={mock} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
};

export default ListSwipeScreen;

const styles = StyleSheet.create({
  safeWrapper: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  chatBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F2F2F2',
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nameText: {
    fontSize: 17,
  },
  messageText: {
    fontSize: 15,
  },
  chatLeftSide: {
    flexDirection: 'row',
  },

  dateText: {
    fontSize: 12,
    color: '#c1c1c1',
    fontWeight: '600',
  },
  deleteBtn: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  deleteBtnText: {
    color: 'white',
    fontWeight: '500',
  },
});
