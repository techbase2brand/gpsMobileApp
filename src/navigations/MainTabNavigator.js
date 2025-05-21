import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ParkingYardStack from './ParkingYardStack';
import VinListStack from './VinListStack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // You can also use Ionicons, FontAwesome etc.
import { blackColor, whiteColor } from '../constants/Color';
import { heightPercentageToDP } from '../utils';
import { HOME_FOCUSED_IMAGE, HOME_UNFOCUSED_IMAGE, PARKING_FOCUSED_IMAGE, PARKING_UNFOCUSED_IMAGE, VIN_FOCUSED_IMAGE, VIN_UNFOCUSED_IMAGE } from '../assests/images';
import { Image, Text } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';
    const hideOnScreens = ['ParkingDetailsScreen'];
    if (hideOnScreens.includes(routeName)) {
      return 'none';
    }
    return 'flex';
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          // display: getTabBarVisibility(route),
          backgroundColor: '#FFF',
          alignItems: "center",
          justifyContent: 'center',
        },
        tabBarLabel: ({ focused }) => {
          let label = '';
          if (route.name === 'Home') label = 'Home';
          else if (route.name === 'Parking Yard') label = 'Parking Yard';
          else if (route.name === 'Search') label = 'Search VIN';

          return (
            <Text style={{
              color: focused ? '#FF6E63' : 'black',
              fontSize: 12,
              fontWeight: '600',
              marginTop: 10,
            }}>
              {label}
            </Text>
          );
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? HOME_FOCUSED_IMAGE : HOME_UNFOCUSED_IMAGE;
          } else if (route.name === 'Parking Yard') {
            iconName = focused ? PARKING_FOCUSED_IMAGE : PARKING_UNFOCUSED_IMAGE;
          } else if (route.name === 'Search') {
            iconName = focused ? VIN_FOCUSED_IMAGE : VIN_UNFOCUSED_IMAGE;
          }

          return (
            <Image
              source={iconName}
              style={{
                width: 28,
                height: 28,
                marginTop: 10,
                resizeMode: 'contain',
              }}
            />
          );
        },
      })}
    >

      <Tab.Screen name="Home" component={HomeStack}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            const state = navigation.getState();
            const currentRoute = state.routes.find(r => r.name === "Home");
            if (currentRoute?.state?.index > 0) {
              // Reset stack if not on first screen
              navigation.navigate("Home", {
                screen: "Home", // 👈 your initial screen name in HomeStack
              });
            }
          },
        })} />
      <Tab.Screen name="Parking Yard" component={ParkingYardStack}
        listeners={({ navigation }) => ({
          tabPress: e => {
            const state = navigation.getState();
            const currentRoute = state.routes.find(r => r.name === "History");
            if (currentRoute?.state?.index > 0) {
              navigation.navigate("Parking Yard", {
                screen: "Parking Yard", // 👈 initial screen of your JobHistoryStack
              });
            }
          },
        })} />
      <Tab.Screen name="Search" component={VinListStack}
        listeners={({ navigation }) => ({
          tabPress: e => {
            const state = navigation.getState();
            const currentRoute = state.routes.find(r => r.name === "Search");
            if (currentRoute?.state?.index > 0) {
              navigation.navigate("Search", {
                screen: "Search", // 👈 initial screen of your JobHistoryStack
              });
            }
          },
        })} />
    </Tab.Navigator>
  );
}


