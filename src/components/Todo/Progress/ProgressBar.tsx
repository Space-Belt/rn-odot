import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {ITodoItem} from '../../../types/todos';

type Props = {
  percentageWidth: number;
  doneCount: number;
  totalCount: number;
  odotList: ITodoItem[];
};

const ProgressBar = ({
  percentageWidth,
  doneCount,
  totalCount,
  odotList,
}: Props) => {
  const percentWidth = useSharedValue<number>(0);

  const percentageBarStyle = useAnimatedStyle(() => {
    return {
      width: `${percentWidth.value}%`,
    };
  });

  React.useEffect(() => {
    percentWidth.value = withSpring(percentageWidth, {duration: 600});
  }, [percentageWidth]);

  return (
    <View style={styles.textInputArea}>
      <Text style={styles.progressTextStyle}>progress</Text>
      <View style={styles.percentageArea}>
        <View style={styles.emptyPercentage}>
          <Animated.View style={[styles.percentage, percentageBarStyle]} />
        </View>
      </View>
      <View>
        <Text style={styles.countText}>
          {odotList?.length > 0
            ? `${doneCount} / ${totalCount}`
            : '할일 등록 필요!'}
        </Text>
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  textInputArea: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#00000026',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 2,
    shadowRadius: 0,
    gap: 15,
    marginHorizontal: 20,
  },
  percentageArea: {
    height: 10,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: '#D9D9D9',
  },
  progressTextStyle: {fontWeight: '600'},
  emptyPercentage: {
    position: 'relative',
    width: '100%',
  },
  countText: {
    color: '#C4C4C4',
  },
  percentage: {
    position: 'absolute',
    width: '0%',
    height: 10,
    borderRadius: 10,
    backgroundColor: '#FF7461',
  },
});
