import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {easyRequest} from '../../../utils/RequestUtils';
import apis from '../../../Apis/Apis';
import InfoStore from '../../../Store/InfoStore';
import IDomParser from 'advanced-html-parser';
import FastImage from 'react-native-fast-image';
import OIcon from 'react-native-vector-icons/Octicons';
import ListStore from '../../../Store/ListStore';
import Loading from '../../../Componet/Loading';
import {useNavigation} from '@react-navigation/native';

const _WIDTH = Dimensions.get('window').width;

const LastList = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const getComicList = async () => {
      try {
        let data = await easyRequest(
          apis.lastComic,
          {},
          {
            headers: {
              cookie: InfoStore.cookie,
            },
          },
        );
        const comicListData = [];
        if (data.data.includes('最新 Comics')) {
          let doc = IDomParser.parse(data.data);
          let list = doc.documentElement.querySelectorAll(
            '.p-b-15.p-l-5.p-r-5',
          );
          list.forEach((item, index) => {
            let _temp_img = item.querySelector('.lazy_img');
            let img =
              _temp_img.getAttribute('data-original') ||
              _temp_img.getAttribute('src');
            let title = item.querySelector('.title-truncate').text();
            let author = item.querySelector('.video-title + div > a').text();
            let tags = item.querySelectorAll('.title-truncate.tags > a');
            let id = item
              .querySelector('.thumb-overlay-albums a')
              .getAttribute('href');
            let tagsDo = Array.from(tags).map(tagsItem => {
              return tagsItem.text();
            });
            let category = item.querySelectorAll('.category-icon > div');
            let like = item.querySelector('.label-loveicon>a>span').text();
            let categorys = category.map(categoryItem => {
              return categoryItem.text();
            });
            comicListData.push({
              id,
              title,
              author,
              img,
              tagsDo,
              categorys,
              like,
              uri: img,
            });
          });
        }
        return comicListData;
      } catch (err) {
        return null;
      }
    };
    if (ListStore.LastListData.length > 0) {
      setListData(ListStore.LastListData);
    } else {
      getComicList().then(res => {
        res === null ? setListData([]) : setListData(res);
        ListStore.setLastListData(res);
      });
    }
  }, []);

  const [listData, setListData] = useState([]);
  const [viwerVisible, setViwerVisible] = useState(false);
  const [imgSource, setImgSource] = useState('');
  const [modalImg, setModalImg] = useState({width: 1, height: 1});
  const [modalShowLoading, setModalShowLoading] = useState(true);
  const renderItem = ({item, index}) => {
    const renderStyles = StyleSheet.create({
      main: {
        flexDirection: 'row',
        borderWidth: 1,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,
        overflow: 'hidden',
      },
      right: {
        flex: 1,
        flexDirection: 'column',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        paddingRight: 2,
      },
      introduce: {
        fontSize: 15,
        paddingBottom: 5,
      },
    });
    return (
      <View style={renderStyles.main}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPressOut={() => {
            setImgSource(item.img);
            setViwerVisible(true);
          }}>
          <FastImage
            source={{uri: item.img}}
            style={{width: 100, height: 150, marginRight: 5, borderRadius: 10}}
          />
        </TouchableOpacity>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Album', {...item});
          }}>
          <View style={renderStyles.right}>
            <Text style={renderStyles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={renderStyles.introduce}>作者：{item.author}</Text>
            <Text style={renderStyles.introduce} numberOfLines={2}>
              标签：{item.tagsDo.map(tagsDoItem => tagsDoItem + ' ')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                position: 'relative',
                paddingBottom: 3,
              }}>
              <OIcon name={'heart-fill'} color={'rgb(255,102,102)'} size={20} />
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 5,
                  color: 'rgb(255,102,102)',
                  position: 'absolute',
                  left: 20,
                  top: -1,
                }}>
                {item.like}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={item => item.img}
      />
      <Modal visible={viwerVisible} transparent={true} animationType={'fade'}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalShowLoading(true);
            setViwerVisible(false);
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            {modalShowLoading ? <Loading size={50} strokeWidth={7} /> : <></>}

            <Image
              source={{uri: imgSource}}
              onLoad={({nativeEvent}) => {
                setModalShowLoading(false);
                setModalImg({
                  width:
                    nativeEvent.source.width >= _WIDTH - 30
                      ? _WIDTH - 50
                      : nativeEvent.source.width,
                  height: '100%',
                });
              }}
              resizeMode={'contain'}
              style={[styles.modalImg, !modalShowLoading ? modalImg : {}]}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalImg: {
    width: 1,
    height: 1,
  },
  main: {
    width: '100%',
    flex: 1,
  },
});

export default LastList;
