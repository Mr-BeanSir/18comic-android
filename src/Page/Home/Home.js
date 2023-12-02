import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MainHeader from './Component/MainHeader';
import LastList from './Component/LastList';
import homeBridge from '../../Bridge/HomeBridge';
import {baseUrl} from '../../utils/RequestUtils';
import InfoStore from '../../Store/InfoStore';

const Home = () => {
  useEffect(() => {
    homeBridge
      .getPageSource(baseUrl + '/user', InfoStore.cookie)
      .then(res => console.log(res));
  }, []);
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
