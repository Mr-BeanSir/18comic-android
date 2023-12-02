import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Page/Home/Home';
import Login from './Page/Login/Login';
import InfoStore from './Store/InfoStore';
import {observer} from 'mobx-react/src';
import Album from './Page/Album/Album';
import {useEffect} from 'react';
import {ToastAndroid} from 'react-native';
import {getStorage} from './utils/StorageUtils';
import NativeRNBootSplash from 'react-native-bootsplash/src/NativeRNBootSplash';

const App = observer(() => {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    ToastAndroid.show('show', ToastAndroid.SHORT);
    const init = async () => {
      if (InfoStore.login) {
        return;
      }
      let islogin = await getStorage('islogin');
      if (islogin !== null) {
        let ck = await getStorage('ck');
        InfoStore.setLogin(islogin);
        InfoStore.setCookie(ck);
      }
    };
    init().finally(async () => {
      await NativeRNBootSplash.hide(true);
      console.log('splash hide');
    });
  }, []);
  return (
    <NavigationContainer onReady={() => {}}>
      <Stack.Navigator>
        {InfoStore.login ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={'Album'}
              component={Album}
              options={{
                animation: 'slide_from_right',
                headerShown: false,
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default App;
