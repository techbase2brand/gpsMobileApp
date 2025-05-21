import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotificationScreen from '../screens/NotificationScreen';
import LoginScreen from '../screens/LoginScreen';
import MainTabNavigator from './MainTabNavigator';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="mainscreens" component={MainTabNavigator} />
    </Stack.Navigator>
  );
}
