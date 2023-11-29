import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from '@rneui/base';
import InfoStore from '../../../Store/InfoStore';
import {observer} from 'mobx-react/src';

const MainHeader = observer(() => {
  return (
    <View style={styles.main}>
      <TouchableOpacity>
        <Icon name="bookmarks" style={{transform: [{scaleX: -1}]}} />
      </TouchableOpacity>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => InfoStore.setActiveType(0)}
          style={styles.titleTouch}>
          <Text
            style={[
              styles.title,
              InfoStore.activeType === 0 && styles.titleActive,
            ]}>
            最新
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => InfoStore.setActiveType(1)}
          style={styles.titleTouch}>
          <Text
            style={[
              styles.title,
              InfoStore.activeType === 1 && styles.titleActive,
            ]}>
            推荐
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => InfoStore.setActiveType(2)}
          style={styles.titleTouch}>
          <Text
            style={[
              styles.title,
              InfoStore.activeType === 2 && styles.titleActive,
            ]}>
            动漫
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Icon name={'search'} size={26} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  titleTouch: {
    paddingHorizontal: 10,
  },
  titleActive: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  title: {
    fontSize: 16,
  },
  main: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
  },
});

export default MainHeader;
