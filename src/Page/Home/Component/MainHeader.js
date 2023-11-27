import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const MainHeader = () => {
  return (
    <View style={styles.main}>
      <Text>main</Text>
      <Text>main</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
  },
});

export default MainHeader;
