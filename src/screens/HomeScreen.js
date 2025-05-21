import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ParkingMap from '../components/ParkingMap'
import { parkingYards } from '../constants/Constants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../utils'
import Fontisto from 'react-native-vector-icons/Fontisto'

const HomeScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1 }}>
      <Pressable style={styles.notificationIcon} onPress={()=>navigation.navigate("NotificationScreen")}>
        <Fontisto name="bell" size={30} color="#000" />
      </Pressable>
      <ParkingMap parkingYards={parkingYards} />
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  notificationIcon: {
    position: "absolute",
    right: wp(5), 
    top: hp(15),
    width: wp(15),
    height: wp(15),
    backgroundColor: 'white', zIndex: 999,
    borderRadius: 100, borderWidth: 1,
    alignItems: "center", justifyContent: "center"
  }
})
