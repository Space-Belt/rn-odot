import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import space from '../../assets/images/space.png';
import hamburger from '../../assets/images/hamburger.png';
import {useNavigation} from '@react-navigation/native';

const MainHeader = () => {
  const navigation = useNavigation();
  const handleHamburgerBar = () => {
    navigation.navigate('TodoListGroupScreen');
  };

  return (
    <View style={styles.header}>
      <View>
        <Image source={space} style={styles.profileImg} />
      </View>
      <View>
        <Image
          source={require('../../assets/images/ODOT.png')}
          style={styles.logo}
        />
      </View>
      <TouchableOpacity onPress={handleHamburgerBar}>
        <View>
          <Image source={hamburger} style={styles.profileImg} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  logo: {width: 41, height: 20, resizeMode: 'center'},
  nameText: {
    fontSize: 20,
    fontWeight: '600',
  },
  profileImg: {
    width: 25,
    height: 25,
  },
});
