import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ParkingMap from '../components/ParkingMap';
import {SingleVehInparkingYard, parkingYards} from '../constants/Constants';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from '../utils';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Header from '../components/Header';

const MapViewScreen = ({navigation}) => {
  const [feeds, setFeeds] = useState([]);
  console.log('feedsfeeds>>', feeds);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://api.thingspeak.com/channels/2991877/feeds.json?api_key=K9LPDXZ35BKOYFDM&results=1',
      );
      const json = await response.json();
      setFeeds(json.feeds); // Set the 'feeds' array in state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <View style={{flex: 1}}>
      {/* <Header title="Home" backArrow={false} /> */}
      <Pressable
        style={styles.notificationIcon}
        onPress={() => navigation.navigate('NotificationScreen')}>
        <Fontisto name="bell" size={30} color="#000" />
      </Pressable>
      <ParkingMap
        parkingYards={parkingYards}
        single={true}
        // zoomIn={true}
      />
    </View>
  );
};

export default MapViewScreen;

const styles = StyleSheet.create({
  notificationIcon: {
    position: 'absolute',
    right: wp(5),
    top: hp(15),
    width: wp(15),
    height: wp(15),
    backgroundColor: 'white',
    zIndex: 999,
    borderRadius: 100,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
