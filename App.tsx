import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainTabNavigator from './src/navigations/MainTabNavigator';
import {whiteColor} from './src/constants/Color';
import {BaseStyle} from './src/constants/Style';
import {SPLASH_IMAGE} from './src/assests/images';
import AuthStack from './src/navigations/AuthStack';
import AnimatedLottieView from 'lottie-react-native';

const {flex, alignItemsCenter, alignJustifyCenter} = BaseStyle;

function App(): React.JSX.Element {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 4000); // 3 seconds

    return () => clearTimeout(timeout); // cleanup
  }, []);

  return (
    <View style={styles.container}>
      {showSplash ? (
        <View style={styles.splashContainer}>
          <View style={styles.splashContainer}>
            <AnimatedLottieView
              source={require('./src/assets/welcome.json')} // 👈 your splash lottie file
              autoPlay
              loop // remove loop if you want it to play once
              style={styles.splashAnimation}
            />
          </View>
          {/* <Image
            source={SPLASH_IMAGE} // 👈 put your splash image here
            style={styles.splashImage}
            // resizeMode="cover"
          /> */}
        </View>
      ) : (
        <NavigationContainer>
          <AuthStack />
          {/* <MainTabNavigator /> */}
        </NavigationContainer>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteColor,
  },
  splashImage: {
    width: '100%',
    height: '100%',
  },
   splashAnimation: {
    width: 300, // adjust as per your design
    height: 300,
  },
});

export default App;
