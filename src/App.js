import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Page/Home/Home';
import Login from './Page/Login/Login';
import storageUtils from './utils/StorageUtils';
import NativeRNBootSplash from 'react-native-bootsplash/src/NativeRNBootSplash';

const App = () => {
  const Stack = createNativeStackNavigator();
  const [isLogin, setIsLogin] = useState(false);

  return (
    <NavigationContainer
      onReady={() => {
        storageUtils
          .load({
            key: 'islogin',
          })
          .then(data => {
            setIsLogin(data);
          })
          .catch(e => {
            console.log(e);
          })
          .finally(() => {
            NativeRNBootSplash.hide(true);
          });
      }}>
      <Stack.Navigator>
        {isLogin ? (
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
};

export default App;
