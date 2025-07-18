import React from 'react';
import {
  createNativeStackNavigator,
  TransitionPresets,
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MapViewScreen from '../screens/MapViewScreen';
import AuthStack from './AuthStack';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // ...TransitionPresets?.SlideFromRightIOS,
      }} initialRouteName='HomeScreen'>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MapViewScreen" component={MapViewScreen} />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
      options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: {
              animation: 'timing',
              config: { duration: 500 },
            },
            close: {
              animation: 'timing',
              config: { duration: 500 },
            },
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-layouts.screen.height, 0], // 👈 top to normal
                    }),
                  },
                ],
              },
            };
          },
        }}
      />
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  );
}
