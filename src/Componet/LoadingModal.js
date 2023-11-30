import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import Loading from './Loading';

const LoadingModal = props => {
  return (
    <Modal transparent={true} visible={props.show}>
      <View style={styles.main}>
        <View style={styles.bg} />
        <Loading size={50} strokeWidth={7} />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  text: {
    marginTop: 3,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});

export default LoadingModal;
