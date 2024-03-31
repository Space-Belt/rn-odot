import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import frame from '../../assets/images/Frame.png';

type props = {
  handleClick?: () => void;
  handleAddTask?: () => void;
  rightBtnElement?: React.ReactElement;
  leftBtnElement?: React.ReactElement;
  centerText: string;
  paddingHorizontal?: number;
};

const ReusableHeader = ({
  handleClick,
  handleAddTask,
  rightBtnElement,
  leftBtnElement,
  centerText,
  paddingHorizontal,
}: props) => {
  return (
    <View
      style={[
        styles.header,
        paddingHorizontal !== undefined
          ? {paddingHorizontal: paddingHorizontal}
          : {},
      ]}>
      {handleClick !== undefined ? (
        <TouchableOpacity
          onPress={handleClick !== undefined ? handleClick : () => {}}>
          <Image source={frame} style={styles.backImg} />
        </TouchableOpacity>
      ) : leftBtnElement !== undefined ? (
        leftBtnElement
      ) : (
        <View />
      )}
      <Text style={styles.headerText}>{centerText}</Text>
      {handleAddTask !== undefined ? (
        <TouchableOpacity
          onPress={handleAddTask !== undefined ? handleAddTask : () => {}}>
          <Image
            source={require('../../assets/images/plusButton.png')}
            style={styles.addBtn}
          />
        </TouchableOpacity>
      ) : rightBtnElement !== undefined ? (
        rightBtnElement
      ) : (
        <View />
      )}
    </View>
  );
};

export default ReusableHeader;

const styles = StyleSheet.create({
  header: {
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
    resizeMode: 'center',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
  },
  addBtn: {
    width: 25,
    height: 25,
    resizeMode: 'center',
  },
});
