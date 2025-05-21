import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './screens/LoginScreen';
import MapScreen from './screens/MapScreen';

const Stack = createNativeStackNavigator({
  initialRouteName: 'Login',
  screens: {
    Login: LoginScreen,
    Map: MapScreen
  }
});

const Navigation = createStaticNavigation(Stack)

export default function App() {
  return (
    <Navigation />
  );
}
