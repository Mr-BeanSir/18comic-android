import React from 'react';
import {StyleSheet, View} from 'react-native';
import MainHeader from './Component/MainHeader';
import LastList from './Component/LastList';

const Home = () => {
  return (
    <View style={styles.main}>
      <MainHeader />
      <LastList />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
});

export default Home;
