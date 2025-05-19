import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ParkingYardStack from './ParkingYardStack';
import VinListStack from './VinListStack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // You can also use Ionicons, FontAwesome etc.
import { blackColor, whiteColor } from '../constants/Color';
import { heightPercentageToDP } from '../utils';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: whiteColor,  
        tabBarInactiveTintColor: blackColor, 
        tabBarStyle: {
          backgroundColor: '#FF5E62',
          height: heightPercentageToDP(8),
          alignItems: "center",
          justifyContent: 'center'
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Parking Yard') {
            iconName = focused ? 'car-parking-lights' : 'car-parking-lights'; 
          } else if (route.name === 'Vin List') {
            iconName = focused ? 'format-list-bulleted' : 'format-list-bulleted-type';
          }

          return <Icon name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Parking Yard" component={ParkingYardStack} />
      <Tab.Screen name="Vin List" component={VinListStack} />
    </Tab.Navigator>
  );
}


