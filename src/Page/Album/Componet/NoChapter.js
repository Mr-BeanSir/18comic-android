import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button} from '@rneui/base';
import ADIcon from 'react-native-vector-icons/AntDesign';
import FAIcon from 'react-native-vector-icons/FontAwesome';

const NoChapter = ({navigation, data}) => {
  return (
    <View style={styles.main}>
      <Button
        containerStyle={styles.button}
        title={'开始阅读'}
        onPress={() => navigation.goBack()}
      />
      <TouchableOpacity activeOpacity={0.8}>
        <ADIcon style={styles.icon} name={'heart'} size={30} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        <FAIcon style={styles.icon} name={'bookmark-o'} size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
  main: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NoChapter;
