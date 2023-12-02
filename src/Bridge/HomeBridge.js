import {NativeModules} from 'react-native';

class HomeBridge {
  HomeBridge = NativeModules.HomeFunction;
  getPageSource = (url, cookie) => {
    return this.HomeBridge.getPageSource(url, cookie);
  };
}
export default new HomeBridge();
