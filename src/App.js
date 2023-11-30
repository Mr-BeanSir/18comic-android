import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Page/Home/Home';
import Login from './Page/Login/Login';
import InfoStore from './Store/InfoStore';
import {observer} from 'mobx-react/src';
import Album from './Page/Album/Album';
import {useEffect} from 'react';
import NativeRNBootSplash from 'react-native-bootsplash/src/NativeRNBootSplash';
import {getStorage, storageUtils} from './utils/StorageUtils';

const App = observer(() => {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    console.log('show');
    if (InfoStore.login) {
      console.log('this');
      NativeRNBootSplash.hide(true);
      return;
    }
    storageUtils
      .load({
        key: 'islogin',
      })
      .then(data => {
        InfoStore.setLogin(data);
        InfoStore.setCookie(getStorage('ck'));
        NativeRNBootSplash.hide(true);
      })
      .catch(e => {
        NativeRNBootSplash.hide(true);
        console.log(e);
      });
  }, []);
  return (
    <NavigationContainer>
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
