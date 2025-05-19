import React from 'react';
import { SafeAreaView, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from './src/navigations/MainTabNavigator';
import { heightPercentageToDP } from './src/utils';
import { whiteColor } from './src/constants/Color';
import { BaseStyle } from './src/constants/Style';
const { flex, alignItemsCenter, alignJustifyCenter } = BaseStyle;

function App(): React.JSX.Element {

  return (
    // <SafeAreaView style={[flex, { backgroundColor: whiteColor }]}>
      <NavigationContainer>
        <MainTabNavigator />
      </NavigationContainer>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default App;
