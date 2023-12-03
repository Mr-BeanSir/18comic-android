import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {baseUrl} from '../../utils/RequestUtils';
import Header from './Componet/Header';
import FastImage from 'react-native-fast-image';
import IDomParser from 'advanced-html-parser';
import LoadingModal from '../../Componet/LoadingModal';
import HomeBridge from '../../Bridge/HomeBridge';
import InfoStore from '../../Store/InfoStore';
import Chapter from './Componet/Chapter';
import NoChapter from './Componet/NoChapter';

const Album = ({navigation, route}) => {
  const data = route.params;
  const [infoData, setInfoData] = useState({});
  useEffect(() => {
    HomeBridge.getPageSource(baseUrl + data.id, InfoStore.cookie)
      .then(res => {
        const doc = IDomParser.parse(res);
        let parent = doc.documentElement.querySelector(
          '#wrapper > div.container > div:nth-child(4) > div > div.panel.panel-default.visible-lg.hidden-xs > div.panel-body > div > div.col-lg-7',
        );
        let 车牌号 = parent
          .querySelector('> div:nth-child(1) > div:nth-child(1)')
          .text()
          .split('：')[1];
        let 介绍 = parent
          .querySelector('> div:nth-child(1) > div:nth-child(8)')
          .text()
          .split('：')[1];
        let 最后更新时间 = parent
          .querySelector(
            '> div:nth-child(1) > div:nth-child(10) > span:nth-child(2)',
          )
          .getAttribute('content');
        let 页数 = parent
          .querySelector('> div:nth-child(1) > div:nth-child(9)')
          .text()
          .split('：')[1];
        let 观看数 = parent
          .querySelector(
            '> div:nth-child(1) > div:nth-child(10) > span:nth-child(3) > span > span',
          )
          .text();
        let 喜欢数 = parent
          .querySelector(
            '> div:nth-child(1) > div:nth-child(10) > span.p-t-5.p-b-5 > span:nth-child(1)',
          )
          .text();
        let 评论数 =
          parent
            .querySelector(
              '> div.p-t-5.p-b-5.read-block > a.forum-open.btn.btn-primary > div',
            )
            ?.text() || 0;
        let 临时章节 = parent.querySelectorAll(
          '> div:nth-child(3) > div > ul > a',
        );
        let _临时标签 = parent.querySelectorAll(
          '> div:nth-child(1) > div:nth-child(4) > span > a',
        );
        let _临时作者 = parent.querySelectorAll(
          '> div:nth-child(1) > div:nth-child(5) > span > a',
        );
        let 作者 = _临时作者.map(item => item.text());
        let 标签 = _临时标签.map(item => {
          return item.text();
        });
        let 开始阅读 = parent
          .querySelector('> div.p-t-5.p-b-5.read-block > a:nth-child(1)')
          ?.getAttribute('href');
        let 是否喜欢 = parent
          .querySelector('> div.p-t-5.p-b-5.read-block > a:nth-child(6) > i')
          .getAttribute('style');
        let 章节 = 临时章节.map(item => {
          item.isVisited = item
            .querySelector('> li')
            .getAttribute('class')
            ?.includes('visited_series');
          return item;
        });

        setInfoData({
          车牌号,
          介绍,
          最后更新时间,
          页数,
          观看数,
          喜欢数,
          评论数,
          章节,
          标签,
          作者,
          开始阅读,
        });
        setLoadingModalShow(false);
      })
      .catch(err => {
        console.log(err);
        ToastAndroid.show('获取信息异常', ToastAndroid.SHORT);
        navigation.goBack();
      });
  }, []);

  const [loadingModalShow, setLoadingModalShow] = useState(true);

  return (
    <View style={{height: '100%'}}>
      <LoadingModal show={loadingModalShow} />
      <Header navigation={navigation} title={data.title} />
      <View style={styles.content}>
        <View style={{flexDirection: 'row'}}>
          <FastImage
            source={{uri: data.img}}
            style={{height: 170, width: 113}}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.introduce}>
            <Text style={{marginBottom: 5, flex: 1}}>{data.title}</Text>
            <View>
              <View style={styles.tags}>
                <Text>作者 </Text>
                {infoData.作者?.map(author => (
                  <TouchableOpacity key={author} activeOpacity={0.5}>
                    <Text
                      style={[styles.button, {borderColor: 'rgb(56,118,191)'}]}>
                      {author}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.tags}>
                <Text>标签 </Text>
                {infoData.标签?.map(tag => (
                  <TouchableOpacity key={tag} activeOpacity={0.5}>
                    <Text style={styles.button}>{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <Text style={{fontSize: 12}}>观看：{infoData.观看数}</Text>
          <Text style={{fontSize: 12}}>喜欢：{infoData.喜欢数}</Text>
          <Text style={{fontSize: 12}}>评论：{infoData.评论数}</Text>
          <Text style={{fontSize: 12}}>最后更新：{infoData.最后更新时间}</Text>
        </View>
        {infoData.章节?.length > 0 ? (
          <Chapter navigation={navigation} data={infoData} />
        ) : (
          <NoChapter navigation={navigation} data={infoData} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    borderWidth: 1,
    borderColor: 'rgb(249,148,23)',
    borderRadius: 5,
    marginRight: 3,
    padding: 2,
    fontSize: 10,
    marginBottom: 2,
  },
  info: {
    flexDirection: 'row',
  },
  introduce: {
    marginLeft: 5,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flex: 1,
  },
});

export default Album;
