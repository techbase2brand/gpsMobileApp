// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   FlatList,
//   SafeAreaView,
//   Pressable,
// } from 'react-native';
// import React, {useState} from 'react';
// import {heightPercentageToDP} from '../utils';
// import ParkingMap from '../components/ParkingMap';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {parkingYard, parkingYards} from '../constants/Constants';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import {heightPercentageToDP as hp, widthPercentageToDP as wp} from '../utils';

const vinList = [
  {
    id: '1',
    vin: 'VIN-100001',
    parkingYard: 1,
  },
  {
    id: '2',
    vin: 'VIN-100002',
    parkingYard: 1,
  },
  {
    id: '3',
    vin: 'VIN-100003',
    parkingYard: 1,
  },
  {
    id: '4',
    vin: 'VIN-100004',
    parkingYard: 1,
  },
  {
    id: '5',
    vin: 'VIN-100005',
    parkingYard: 1,
  },
  {
    id: '6',
    vin: 'VIN-100006',
    parkingYard: 1,
  },
  {
    id: '7',
    vin: 'VIN-100007',
    parkingYard: 1,
  },
  {
    id: '8',
    vin: 'VIN-100008',
    parkingYard: 1,
  },

  {
    id: '9',
    vin: 'VIN-100009',
    parkingYard: 1,
  },
  {
    id: '10',
    vin: 'VIN-1000010',
    parkingYard: 1,
  },
  {
    id: '11',
    vin: 'VIN-1000011',
    parkingYard: 1,
  },
  {
    id: '12',
    vin: 'VIN-1000012',
    parkingYard: 1,
  },
  {
    id: '13',
    vin: 'VIN-1000013',
    parkingYard: 1,
  },
  {
    id: '14',
    vin: 'VIN-1000014',
    parkingYard: 1,
  },
  {
    id: '15',
    vin: 'VIN-1000015',
    parkingYard: 1,
  },
  {
    id: '16',
    vin: 'VIN-1000016',
    parkingYard: 1,
  },
  {
    id: '17',
    vin: 'VIN-1000017',
    parkingYard: 1,
  },
  {
    id: '18',
    vin: 'VIN-1000018',
    parkingYard: 1,
  },
  {
    id: '19',
    vin: 'VIN-1000019',
    parkingYard: 1,
  },
  {
    id: '20',
    vin: 'VIN-1000020',
    parkingYard: 1,
  },

  {
    id: '21',
    vin: 'VIN-1000021',
    parkingYard: 2,
  },

  {
    id: '22',
    vin: 'VIN-1000022',
    parkingYard: 2,
  },

  {
    id: '23',
    vin: 'VIN-1000023',
    parkingYard: 2,
  },
  {
    id: '24',
    vin: 'VIN-1000024',
    parkingYard: 2,
  },
  {
    id: '25',
    vin: 'VIN-1000025',
    parkingYard: 2,
  },
  {
    id: '26',
    vin: 'VIN-1000026',
    parkingYard: 2,
  },
  {
    id: '27',
    vin: 'VIN-1000027',
    parkingYard: 2,
  },
  {
    id: '28',
    vin: 'VIN-1000028',
    parkingYard: 2,
  },
  {
    id: '29',
    vin: 'VIN-1000029',
    parkingYard: 2,
  },
  {
    id: '30',
    vin: 'VIN-1000030',
    parkingYard: 2,
  },
  {
    id: '31',
    vin: 'VIN-1000031',
    parkingYard: 2,
  },
  {
    id: '32',
    vin: 'VIN-1000032',
    parkingYard: 3,
  },
  {
    id: '33',
    vin: 'VIN-1000033',
    parkingYard: 3,
  },
  {
    id: '34',
    vin: 'VIN-1000034',
    parkingYard: 3,
  },
  {
    id: '35',
    vin: 'VIN-1000035',
    parkingYard: 3,
  },

  {
    id: '36',
    vin: 'VIN-1000036',
    parkingYard: 3,
  },
  {
    id: '37',
    vin: 'VIN-1000037',
    parkingYard: 3,
  },
  {
    id: '38',
    vin: 'VIN-1000038',
    parkingYard: 3,
  },
  {
    id: '39',
    vin: 'VIN-1000039',
    parkingYard: 3,
  },
  {
    id: '40',
    vin: 'VIN-1000040',
    parkingYard: 3,
  },
  {
    id: '41',
    vin: 'VIN-1000041',
    parkingYard: 3,
  },
  {
    id: '42',
    vin: 'VIN-1000042',
    parkingYard: 3,
  },

  {
    id: '43',
    vin: 'VIN-1000043',
    parkingYard: 3,
  },
  {
    id: '44',
    vin: 'VIN-1000044',
    parkingYard: 3,
  },
  {
    id: '45',
    vin: 'VIN-1000045',
    parkingYard: 3,
  },
  {
    id: '46',
    vin: 'VIN-1000046',
    parkingYard: 3,
  },
  {
    id: '47',
    vin: 'VIN-1000047',
    parkingYard: 3,
  },
  {
    id: '48',
    vin: 'VIN-1000048',
    parkingYard: 3,
  },
  {
    id: '49',
    vin: 'VIN-1000049',
    parkingYard: 3,
  },
  {
    id: '50',
    vin: 'VIN-1000050',
    parkingYard: 3,
  },
  {
    id: '51',
    vin: 'VIN-1000051',
    parkingYard: 3,
  },
];
// const YardDetailsScreen = ({navigation, route}) => {
//   const [selectedCar, setSelectedCar] = useState(null);
//   const {isSelected} = route?.params;
//   console.log('selectedYardselectedYard>>', isSelected, route?.params);
//   const parking_yard = parkingYards?.filter(yard => yard?.id == isSelected);
//   console.log('parking_yardparking_yard>>', parking_yard);
//   const filteredVinList = vinList?.filter(v => v?.parkingYard === isSelected);

//   const handleVinPress = item => {
//     setSelectedCar(item);
//   };

//   const renderItem = ({item, index}) => {
//     const isEven = index % 2 === 0;
//     const isSelectedVin = item?.id == selectedCar?.id;
//     return (
//       <TouchableOpacity
//         style={[
//           styles.itemContainer,
//           {
//             backgroundColor: isSelectedVin
//               ? '#613EEA'
//               : isEven
//               ? '#F9F9F9'
//               : '#FFFFFF',
//           },
//         ]}
//         onPress={() => handleVinPress(item)}
//         // onPress={
//         //   () =>
//         //     navigation.navigate('ParkingDetailsScreen', {
//         //       vin: item.vin,
//         //       yard: item.yard,
//         //     }) }
//       >
//         <View style={styles.row}>
//           <Text
//             style={isSelectedVin ? styles.vinLabelFocused : styles.vinLabel}>
//             {item.vin}
//           </Text>
//           <Text style={isSelectedVin ? styles.quantityFOuced : styles.quantity}>
//             {item.parkingYard}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={styles.wrapper}>
//         <View style={styles.headerRow1}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={28} color="#000" />
//           </TouchableOpacity>
//         </View>
//         <Pressable
//           style={styles.notificationIcon}
//           onPress={() => navigation.navigate('Search')}>
//           {/* <Fontisto name="search" size={20} color="#000" /> */}
//         </Pressable>
//         <View style={{height: heightPercentageToDP(40)}}>
//           <ParkingMap
//             parkingYards={parking_yard}
//             zoomIn={true}
//             selectedCar={selectedCar}
//           />
//         </View>
//         <View style={styles.headerRow}>
//           <Text style={styles.headerText}>VIN List</Text>
//           <Text style={[styles.headerText, {alignItems: 'flex-end'}]}>
//             Parking Yard
//           </Text>
//         </View>
//         <FlatList
//           data={filteredVinList}
//           keyExtractor={item => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={{paddingBottom: 20}}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default YardDetailsScreen;

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   headerRow1: {
//     position: 'absolute',
//     top: 10,
//     left: 10,
//     zIndex: 99999,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#F3F3F3',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   headerText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: '#000',
//     textAlign: 'left',
//   },
//   itemContainer: {
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   vinLabel: {
//     color: '#000',
//     fontWeight: '500',
//     fontSize: 15,
//     flex: 1,
//   },
//   vinLabelFocused: {
//     color: '#fff',
//     fontWeight: '500',
//     fontSize: 15,
//     flex: 1,
//   },
//   quantity: {
//     color: '#000',
//     fontWeight: '500',
//     fontSize: 15,
//     flex: 1,
//     textAlign: 'right',
//   },
//   quantityFOuced: {
//     color: '#fff',
//     fontWeight: '500',
//     fontSize: 15,
//     flex: 1,
//     textAlign: 'right',
//   },
//   notificationIcon: {
//     // position: 'absolute',
//     // right: wp(5),
//     // top: hp(0),
//     // width: wp(12),
//     // height: wp(12),
//     // backgroundColor: 'white',
//     // zIndex: 999,
//     // borderRadius: 100,
//     // borderWidth: 1,
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
// });

import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Modal from 'react-native-modal';
import {useFocusEffect} from '@react-navigation/native';
import {parkingYards} from '../constants/Constants';
import ParkingMap from '../components/ParkingMap';
import {heightPercentageToDP, widthPercentageToDP} from '../utils';

const {height} = Dimensions.get('window');
const YardDetailsScreen = ({navigation, route}) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const {isSelected} = route?.params;

  const parking_yard = parkingYards?.filter(yard => yard?.id == isSelected);
  const filteredVinList = vinList?.filter(v => v?.parkingYard === isSelected);

  const handleVinPress = item => {
    setSelectedCar({
      ...item,
      activities: [
        // Dummy activities, replace with your real data
        ` moved from slot 3 to 20`,
        ` inspected by John`,
        ` cleaned`,
        ` moved from slot 3 to 20`,
        // `${item.vin} inspected by John`,
        // `${item.vin} cleaned`,
      ],
    });
    setModalVisible(true);

    // Hide tab bar when modal opens
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
  };

  const closeModal = () => {
    setModalVisible(false);

    // Show tab bar again
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
  };

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
    }, []),
  );

  const renderItem = ({item, index}) => {
    const isEven = index % 2 === 0;
    const isSelectedVin = item?.id == selectedCar?.id;

    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          {
            backgroundColor: isSelectedVin
              ? '#613EEA'
              : isEven
              ? '#F9F9F9'
              : '#FFFFFF',
          },
        ]}
        onPress={() => handleVinPress(item)}>
        <View style={styles.row}>
          <Text
            style={isSelectedVin ? styles.vinLabelFocused : styles.vinLabel}>
            {item.vin}
          </Text>
          <Text style={isSelectedVin ? styles.quantityFOuced : styles.quantity}>
            {item.parkingYard}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.wrapper}>
        <View style={styles.headerRow1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>
        </View>
        <Pressable
          style={styles.notificationIcon}
          onPress={() => navigation.navigate('Search')}>
          {/* <Fontisto name="search" size={20} color="#000" /> */}
        </Pressable>
        <View style={{height: heightPercentageToDP(40)}}>
          <ParkingMap
            parkingYards={parking_yard}
            zoomIn={true}
            selectedCar={selectedCar}
          />
        </View>

        <FlatList
          data={filteredVinList}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 20}}
        />

        {/* Bottom Modal */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent
          onRequestClose={closeModal}>
          <Pressable style={styles.modalOverlay} onPress={closeModal}>
            <Pressable style={styles.modalContent}>
              <Pressable
                style={{
                  height: heightPercentageToDP(0.7),
                  width: widthPercentageToDP(20),
                  backgroundColor: '#613EEA',
                  position: 'absolute',
                  top: -1,
                  left: '43.5%',
                  borderBottomRightRadius: 20,
                  borderBottomLeftRadius: 20,
                }}></Pressable>
              <Text style={styles.modalTitle}>VIN Details</Text>
              <Text style={styles.modalText}>
                VIN Number: {selectedCar?.vin}
              </Text>
              <Text style={styles.modalText}>
                {/* Slot Number: {selectedCar?.parkingYard} */}
              </Text>

              <Text style={[styles.modalTitle, {marginTop: 10}]}>
                Activities
              </Text>
              {selectedCar?.activities?.length > 0 ? (
                <View style={{ flex: 1 }}>
                  <FlatList
                    data={selectedCar?.activities || []}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                      <View style={styles.timelineItem}>
                        <View style={styles.timeline}>
                          <View style={styles.dot} />
                          {index !== selectedCar.activities.length - 1 && (
                            <View style={styles.verticalLine} />
                          )}
                        </View>
                        <Text style={styles.activityText}>{item}</Text>
                      </View>
                    )}
                  />
                  </View>
              ) : (
                <Text style={styles.modalText}>No activities found.</Text>
              )}
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default YardDetailsScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow1: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 99999,
  },
  itemContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vinLabel: {
    color: '#000',
    fontWeight: '500',
    fontSize: 15,
    flex: 1,
  },
  vinLabelFocused: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 15,
    flex: 1,
  },
  quantity: {
    color: '#000',
    fontWeight: '500',
    fontSize: 15,
    flex: 1,
    textAlign: 'right',
  },
  quantityFOuced: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 15,
    flex: 1,
    textAlign: 'right',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    height: height * 0.4, // 40% of screen height
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timeline: {
    alignItems: 'center',
    width: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#613EEA',
  },
  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#613EEA',
    marginTop: -1, // ensure it attaches directly to dot
  },
  activityText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
    marginBottom: 30,
  },
});
