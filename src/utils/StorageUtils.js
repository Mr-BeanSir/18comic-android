import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageUtils = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});

const getStorage = async key => {
  try {
    return await storageUtils.load({key: key});
  } catch (err) {
    return null;
  }
};

export {storageUtils, getStorage};
