import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Divider} from '@rneui/base';
import ADIcon from 'react-native-vector-icons/AntDesign';
import FAIcon from 'react-native-vector-icons/FontAwesome';

const Chapter = ({navigation, data}) => {
  console.log(data);
  const renderItem = ({item, index}) => {
    let uri = item.getAttribute('href');
    let title = item.querySelector('> li').text();
    let date = item.querySelector('> li > span.hidden-xs').text();
    title = title
      .replace(date, '')
      .replace(/(\n|\s+)/g, ' ')
      .replace(`第${index + 1}話`, '')
      .replace('最新', '');
    return (
      <View>
        <Button
          title={title}
          buttonStyle={{marginTop: index !== 0 && 7}}
          containerStyle={{padding: 0}}
          titleStyle={{fontSize: 10, flexWrap: 'wrap'}}
        />
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <View style={styles.view}>
        <FlatList
          data={data.章节}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Divider orientation={'vertical'} width={2} />
      <View style={styles.view}>
        <Button
          title={'开始阅读'}
          onPress={() => {
            navigation.navigate('Photo', {data: data});
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10,
          }}>
          <TouchableOpacity activeOpacity={0.8}>
            <ADIcon style={styles.icon} name={'heart'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <FAIcon style={styles.icon} name={'bookmark-o'} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '49%',
    height: '100%',
  },
  main: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 10,
  },
});

export default Chapter;
