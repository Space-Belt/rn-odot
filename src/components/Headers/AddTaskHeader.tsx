import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import frame from '../../assets/images/Frame.png';

type Props = {
  title: string;
  mb?: number;
};

const AddTaskHeader = (props: Props) => {
  const navigation = useNavigation();
  const handleClick = () => {
    navigation.goBack();
  };

  const marginStyle =
    props.mb !== undefined
      ? [styles.header, {marginBottom: props.mb}]
      : styles.header;

  return (
    <View style={marginStyle}>
      <TouchableOpacity style={styles.backBtn} onPress={() => handleClick()}>
        <Image source={frame} style={styles.backImg} />
      </TouchableOpacity>

      <Text style={styles.centerText}>{props.title}</Text>
      <View style={styles.empty} />
    </View>
  );
};

export default AddTaskHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    marginBottom: 10,
  },
  backImg: {
    width: 25,
    height: 25,
  },
  backBtn: {borderRadius: 50, width: 25, height: 25},
  centerText: {fontWeight: '700'},
  empty: {width: 25, height: 25},
});
