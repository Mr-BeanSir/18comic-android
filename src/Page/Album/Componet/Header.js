import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AD from 'react-native-vector-icons/AntDesign';

const Header = ({navigation, title}) => {
  return (
    <View style={styles.main}>
      <AD name={'arrowleft'} size={23} onPress={() => navigation.goBack()} />
      <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 18,
    marginLeft: 5,
  },
  main: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
});
export default Header;
