import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import MainHeader from './Component/MainHeader';

const list = [
  {
    title: '美仁枣300g',
    imageUrl:
      'https://a.vpimg4.com/upload/merchandise/pdcvis/602520/2018/0611/93/7f380e8c-627e-4162-b68c-a16ad98f9609_5t.jpg',
    price: 38,
  },
  {
    title: '2件起售】香蕉干90g',
    imageUrl:
      'https://a.vpimg2.com/upload/merchandise/pdcvis/610789/2018/0420/114/54c7ae6a-1b94-44d9-bd38-0d46326aa683_t.jpg',
    price: 19,
  },
  {
    title: '【2件起售】七彩葡萄干420g',
    imageUrl:
      'https://a.vpimg3.com/upload/merchandise/pdcvis/602520/2018/0611/81/faf4abe6-e212-4347-9369-118028bec2fe_5t.jpg',
    price: 27,
  },
  {
    title: '优你康罐装牛奶双味棒棒糖720g',
    imageUrl:
      'https://a.vpimg3.com/upload/merchandise/pdcvis/605346/2018/0509/184/5a1c29d8-b127-40c5-b239-4b0c5b5b1e1b.jpg',
    price: 128,
  },
  {
    title: '滇园南枣核桃糕148g*2福建特产小吃休闲糖果零食软糖喜糖',
    imageUrl:
      'https://a.vpimg4.com/upload/merchandise/pdcvis/606282/2018/0424/132/5bf877ba-9a13-4f85-a67c-2ea2fbbe13f9_t.jpg',
    price: 59,
  },
  {
    title: '【2件起售】自然派榴莲糖200g',
    imageUrl:
      'https://a.vpimg2.com/upload/merchandise/pdcvis/605222/2018/0320/1/9edf6130-35f1-4af8-9034-bf37a617c82a.jpg',
    price: 22,
  },
  {
    title: '【乐奈】8口味速融巧克力408g',
    imageUrl:
      'https://a.vpimg3.com/upload/merchandise/pdcvis/131932/2018/0530/137/083642ef-5fef-446c-b279-7a3047ba058e_5t.jpg',
    price: 39,
  },
  {
    title: '【BK】魔彩巧克力礼盒250g',
    imageUrl:
      'https://a.vpimg3.com/upload/merchandise/pdcvis/600876/2018/0324/158/b3fed03e-3cd8-40c7-b53d-19630adb2d31_t.jpg',
    price: 86,
  },
  {
    title: '【2件起售】乐奈烤巧克力72g',
    imageUrl:
      'https://a.vpimg3.com/upload/merchandise/pdcvis/131932/2017/1223/15/060b8ff9-674e-4869-9845-a8aee1f435a9_t.jpg',
    price: 22,
  },
  {
    title: '每日坚果A款混合果仁果干孕妇零食坚果小礼盒175克',
    imageUrl:
      'https://a.vpimg4.com/upload/merchandise/pdcvis/602656/2018/0313/108/924c4a5b-7315-40bd-9d5f-84fb2fd489a2.jpg',
    price: 39,
  },
  {
    title: '每日坚果A款混合果仁果干孕妇零食坚果礼盒750克',
    imageUrl:
      'https://a.vpimg2.com/upload/merchandise/pdcvis/2018/04/25/144/2a6462ca-bc0a-4ffb-9f43-d1e6fae63baf_235x297_90.jpg',
    price: 199,
  },
  {
    title: '鹰嘴豆250g',
    imageUrl:
      'https://a.vpimg3.com/upload/merchandise/pdcvis/602520/2018/0611/195/11f3c35b-12dc-4263-ad80-f2fa9a5b5c37_5t.jpg',
    price: 16,
  },
  {
    title: '【2件起售】蔓越莓干核桃仁118g',
    imageUrl:
      'https://a.vpimg3.com/upload/merchandise/pdcvis/602520/2018/0611/74/5b521a8e-2b51-41a4-b120-3e06e799be1b_5t.jpg',
    price: 28,
  },
];

const Home = () => {
  return (
    <View style={styles.main}>
      <MainHeader />
      <FlatList
        data={list}
        renderItem={(item, index) => {
          <Text>{item.title}</Text>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
});

export default Home;
