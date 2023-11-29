import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Page/Home/Home';
import Login from './Page/Login/Login';
import NativeRNBootSplash from 'react-native-bootsplash/src/NativeRNBootSplash';
import InfoStore from './Store/InfoStore';
import {observer} from 'mobx-react/src';
import storageUtils from './utils/StorageUtils';

const App = observer(() => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer
      onReady={() => {
        if (InfoStore.login) {
          NativeRNBootSplash.hide(true);
          return;
        }
        storageUtils
          .load({
            key: 'islogin',
          })
          .then(data => {
            InfoStore.setLogin(data);
          })
          .catch(e => {
            console.log(e);
          })
          .finally(() => {
            NativeRNBootSplash.hide(true);
          });
      }}>
      <Stack.Navigator>
        {InfoStore.login ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default App;
