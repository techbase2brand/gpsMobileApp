import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ParkingHistory from '../screens/ParkingHistory';


const Stack = createNativeStackNavigator();

export default function HistoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ParkingHistory" component={ParkingHistory} />
    </Stack.Navigator>
  );
}
