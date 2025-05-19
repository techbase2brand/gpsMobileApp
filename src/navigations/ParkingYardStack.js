import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ParkingYardScreen from '../screens/ParkingYardScreen';

const Stack = createNativeStackNavigator();

export default function ParkingYardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ParkingYardScreen" component={ParkingYardScreen}/>
    </Stack.Navigator>
  );
}