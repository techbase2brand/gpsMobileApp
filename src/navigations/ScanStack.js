import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanScreen from '../screens/ScanScreen';
import ScannerScreen from '../screens/ScannerScreen';
import ParkingHistory from '../screens/ParkingHistory';


const Stack = createNativeStackNavigator();

export default function ScanStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}  initialRouteName="ScanScreen">
      <Stack.Screen name="ScanScreen" component={ScanScreen} />
      <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
        <Stack.Screen name="ParkingHistory" component={ParkingHistory} />
    </Stack.Navigator>
  );
}
