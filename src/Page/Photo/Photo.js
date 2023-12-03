import React, {useEffect, useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import HomeBridge from '../../Bridge/HomeBridge';
import {baseUrl} from '../../utils/RequestUtils';
import InfoStore from '../../Store/InfoStore';
import IDomParser from 'advanced-html-parser';

const Photo = ({navigation, route}) => {
  const data = route.params.data;
  const [, set] = useState();
  useEffect(() => {
    HomeBridge.getPageSource(baseUrl + data.开始阅读, InfoStore.cookie)
      .then(res => {
        const doc = IDomParser.parse(res.data);
        let list = doc.querySelectorAll(
          '#wrapper > div:nth-child(20) > div:nth-child(3) > div > div > div.panel-body > div > div',
        );
      })
      .catch(err => {
        ToastAndroid.show('获取数据失败，请重试', ToastAndroid.SHORT);
        navigation.goBack();
      });
  }, []);

  return <View />;
};

export default Photo;
