/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import { store } from './store/store'

import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GalleryComponent } from './components/GalleryComponent';
import UserGallery from './screens/UserGallery';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: "#D3D3D3",
  };

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="UserGallery" screenOptions={{headerShown: false}}>
          <Stack.Screen name="UserGallery" component={UserGallery} />
          <Stack.Screen name="GalleryComponent" component={GalleryComponent} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
