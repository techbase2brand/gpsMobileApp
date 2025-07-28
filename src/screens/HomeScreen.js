import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  ACTIVE,
  BATTERY,
  INACTIVE,
  MAP_ICON,
  MAP_IMAGE,
  NOTIFICATION,
  VEHICLE_REG,
} from '../assests/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DrawerMenu from '../components/DrawerMenu';
import ParkingMap from '../components/ParkingMap';
import {parkingYards} from '../constants/Constants';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../utils';
import {useFocusEffect} from '@react-navigation/native';

const cardData = [
  {
    id: 1,
    icon: VEHICLE_REG,
    text: 'Vehicles Registered',
    showRedDot: true,
    backgroundColor: '#613EEA',
    count: 40,
  },
  {
    id: 2,
    icon: ACTIVE,
    text: 'Active Chips',
    showRedDot: false,
    backgroundColor: '#F2893D',
    count: 30,
  },
  {
    id: 3,
    icon: INACTIVE,
    text: 'In-Active Chips',
    showRedDot: false,
    backgroundColor: '#F24369',
    count: 10,
  },
  {
    id: 4,
    icon: BATTERY,
    text: 'Low Battery Chips',
    showRedDot: false,
    backgroundColor: '#45C64F',
    count: 5,
  },
];
export default function HomeScreen({navigation, setCheckUser}) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const handlePress = item => {
    setDrawerOpen(true);

    // Hide tab bar when modal opens
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
  };

  const closeModal = () => {
    setDrawerOpen(false);

    // Show tab bar again
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
  };
  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
    }, []),
  );
  return (
    <ScrollView style={[styles.container]}>
      {/* Top Map and Menu */}
      <View
        style={[
          styles.header,
          {position: 'absolute', top: 30, width: '100%', zIndex: 999999},
        ]}>
        <TouchableOpacity onPress={handlePress}>
          <DrawerMenu
            isOpen={isDrawerOpen}
            onClose={closeModal}
            navigation={navigation}
            setCheckUser={setCheckUser}
          />
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('NotificationScreen')}>
          <Image
            source={NOTIFICATION}
            style={{
              height: 36,
              width: 36,
            }}
          />
        </TouchableOpacity>
      </View>

      {/* <View style={isDrawerOpen && styles.drawer}> */}
      {/* <View style={styles.topContainer}>
          <View style={styles.mapPlaceholder}>
            <Image source={MAP_IMAGE} style={[styles.mapImage]} />
            <TouchableOpacity
              onPress={() => navigation.navigate('MapViewScreen')}>
              <Image
                source={MAP_ICON}
                style={{
                  height: 70,
                  width: 70,
                  position: 'absolute',
                  top: -50,
                  right: 140,
                }}
              />
            </TouchableOpacity>
          </View>
        </View> */}

      <View style={{height: hp(45)}}>
        <ParkingMap
          parkingYards={parkingYards}
          homeScreen={true}
          zoomIn={true}
          home={true}
          // selectedCar={selectedCar}
        />
      </View>

      {/* Security Details */}
      {/* <View style={styles.detailsContainer}>
          <Text style={styles.locationText}>
            Lekki Gardens Car Park A Security
          </Text>
          <View style={styles.profileContainer}>
            <View>
              <Image
                source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
                style={styles.profileImage}
              />
           
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={styles.name}>Mark Evans</Text>
              <Text style={styles.role}>Security Guard</Text>
              <Text style={styles.badge}>Badge number - SG911</Text>
            </View>
          </View>
        </View> */}

      {/* Options Cards */}
      <View style={styles.cardsContainer}>
        {cardData?.map(item => (
          <TouchableOpacity
            key={item?.id}
            style={[
              styles.card,
              {marginLeft: 0, backgroundColor: item.backgroundColor},
            ]}>
            <Text style={styles.cardText}>{item.text}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // height:heightPercentageToDP(12),
              }}>
              <Text style={[styles.cardText, {fontSize: 22}]}>
                {item.count}
              </Text>
              <Image
                source={item?.icon}
                style={{
                  height: 40,
                  width: 40,
                }}
              />
            </View>

            {/* <Ionicons name={item.icon} size={32} color="purple" /> */}
          </TouchableOpacity>
        ))}
        {/* <TouchableOpacity style={styles.card}>
          <Ionicons name="notifications" size={32} color="purple" />
          <View style={styles.redDot}></View>
          <Text style={styles.cardText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="person" size={32} color="purple" />
          <Text style={styles.cardText}>View Incoming Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="globe" size={32} color="purple" />
          <Text style={styles.cardText}>Parking History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="help" size={32} color="purple" />
          <Text style={styles.cardText}>Contact Police</Text>
        </TouchableOpacity> */}
      </View>
      {/* </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  drawer: {
    position: 'absolute',
    right: -100,
    top: 100,
  },
  headerTitle: {fontWeight: 'bold', fontSize: 16},
  topContainer: {backgroundColor: 'white'},
  mapPlaceholder: {position: 'relative', alignItems: 'flex-end'},
  mapImage: {
    width: '80%',
    height: 160,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
  },
  floatingBtn: {
    position: 'absolute',
    bottom: -20,
    backgroundColor: 'purple',
    borderRadius: 20,
    padding: 8,
    elevation: 4,
  },
  detailsContainer: {marginTop: 40},
  locationText: {fontWeight: 'bold', fontSize: 18, textAlign: 'center'},
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    paddingLeft: 16,
  },
  profileImage: {width: 60, height: 60, borderRadius: 30},
  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'green',
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 2,
    borderColor: 'white',
  },
  name: {fontWeight: 'bold', fontSize: 16},
  role: {color: 'gray'},
  badge: {color: 'gray'},
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  card: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '44%',
    height: 140,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    marginBottom: 20,
    elevation: 4,
    // Bottom shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardText: {marginTop: 8, fontWeight: 600, fontSize: 15, color: '#fff'},
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    position: 'absolute',
    top: 10,
    right: 30,
  },
});
