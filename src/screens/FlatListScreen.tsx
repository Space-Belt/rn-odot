import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FlatListExample from '../components/TodoFlatList/FlatListExample';
import {useNavigation} from '@react-navigation/native';

const FlatListScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../assets/images/Frame.png')}
            style={styles.backBtn}
          />
        </TouchableOpacity>
      </View>
      <FlatListExample />
    </SafeAreaView>
  );
};

export default FlatListScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  backBtn: {
    width: 20,
    height: 20,
  },
  sectionWrapper: {
    flex: 1,
  },
});
