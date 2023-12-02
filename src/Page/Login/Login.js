import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, ToastAndroid, View} from 'react-native';
import {Button} from '@rneui/base';
import {baseUrl} from '../../utils/RequestUtils';
import LoginBridge from '../../Bridge/LoginBridge';
import InfoStore from '../../Store/InfoStore';
import {storageUtils} from '../../utils/StorageUtils';

const Login = props => {
  const [tipsWidth, setTipsWidth] = useState(200);
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('xdoua');
  const [password, setPassword] = useState('D8cykVeX');

  const toLogin = () => {
    setIsLogin(true);
    const params = {
      username: username,
      password: password,
      login_remember: 'on',
      submit_login: '',
    };
    let data = '';
    for (let pKey in params) {
      data += pKey + '=' + params[pKey] + '&';
    }
    ToastAndroid.show('登录中...', ToastAndroid.SHORT);
    LoginBridge.getCookie(baseUrl + '/login', data)
      .then(async ck => {
        ToastAndroid.show(
          '登录提交成功，检验cookie是否正常',
          ToastAndroid.SHORT,
        );
        LoginBridge.testLogin(baseUrl + '/user', ck).then(() => {
          ToastAndroid.show('登录成功，获取用户信息', ToastAndroid.SHORT);
          storageUtils.save({
            key: 'islogin',
            data: true,
          });
          storageUtils.save({
            key: 'ck',
            data: ck,
          });
          InfoStore.setLogin(true);
          InfoStore.setCookie(ck);
          props.navigation.replace('Home');
        });
      })
      .catch(e => console.log(e))
      .finally(() => setIsLogin(false));
  };

  return (
    <View style={styles.root}>
      <Text style={styles.loginTitle}>登录</Text>
      <Text
        onLayout={event => {
          setTipsWidth(event.nativeEvent.layout.width);
        }}>
        因为部分色图要登录才能看到(lll￢ω￢)
      </Text>
      <View style={[styles.container, {width: tipsWidth}]}>
        <TextInput
          style={[styles.input]}
          placeholder="用户名"
          onChangeText={text => setUsername(text)}
          value={username}
        />
        <TextInput
          style={[styles.input]}
          placeholder="密码"
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <Button
          buttonStyle={styles.button}
          title={'登录'}
          onPress={toLogin}
          loading={isLogin}
          containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            height: 70,
          }}
          titleStyle={{
            color: 'black',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 3,
    width: '80%',
  },
  input: {
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 13,
    width: '100%',
    elevation: 3,
  },
  loginTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: -15,
  },
  root: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
