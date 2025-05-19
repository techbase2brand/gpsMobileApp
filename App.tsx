import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from './src/navigations/MainTabNavigator';
import { whiteColor } from './src/constants/Color';
import { BaseStyle } from './src/constants/Style';
import { SPLASH_IMAGE } from './src/assests/images';

const { flex, alignItemsCenter, alignJustifyCenter } = BaseStyle;

function App(): React.JSX.Element {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // 3 seconds

    return () => clearTimeout(timeout); // cleanup
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {showSplash ? (
        <View style={styles.splashContainer}>
          <Image
            source={SPLASH_IMAGE} // 👈 put your splash image here
            // style={styles.splashImage}
            // resizeMode="contain"
          />
        </View>
      ) : (
        <NavigationContainer>
          <MainTabNavigator />
        </NavigationContainer>
      )}
    </SafeAreaView>
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
    width: 200,
    height: 200,
  },
});

export default App;
