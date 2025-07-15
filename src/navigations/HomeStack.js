import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MapViewScreen from '../screens/MapViewScreen';
import AuthStack from './AuthStack';
import LoginScreen from '../screens/LoginScreen';


const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MapViewScreen" component={MapViewScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  );
}
