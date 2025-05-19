import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VinListScreen from '../screens/VinListScreen';
import ParkingDetailsScreen from '../screens/ParkingDetailsScreen';

const Stack = createNativeStackNavigator();

export default function VinListStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VinListScreen" component={VinListScreen}/>
      <Stack.Screen name="ParkingDetailsScreen" component={ParkingDetailsScreen} />

    </Stack.Navigator>
  );
}

