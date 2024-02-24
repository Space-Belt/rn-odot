import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SectionListExample from '../components/TodoSectionList/SectionListExample';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const SectionListScreen = () => {
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
      <View style={styles.sectionWrapper}>
        <SectionListExample />
      </View>
    </SafeAreaView>
  );
};

export default SectionListScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
