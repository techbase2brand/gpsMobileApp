// import React, {useEffect, useRef, useState} from 'react';
// import {View, StyleSheet, Image, ActivityIndicator, Text, Alert, FlatList} from 'react-native';
// import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
// import {BleManager} from 'react-native-ble-plx';
// import {Buffer} from 'buffer';
// import {CAR} from '../assests/images';

// const manager = new BleManager();

// const Ble = () => {
//   const mapRef = useRef(null);
//   const [initialRegion, setInitialRegion] = useState(null);
//    const [devices, setDevices] = useState([]);
//   const animatedCoord = useRef(
//     new AnimatedRegion({
//       latitude: 0,
//       longitude: 0,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     }),
//   ).current;

//   // 🔹 convert GPS format "3042.680232,07641.5344" -> decimal degrees
//   const convertToDecimal = (rawLat, rawLon) => {
//     // latitude = DDMM.mmmm
//     const latDeg = parseInt(rawLat.substring(0, 2), 10);
//     const latMin = parseFloat(rawLat.substring(2));
//     const latitude = latDeg + latMin / 60;

//     // longitude = DDDMM.mmmm
//     const lonDeg = parseInt(rawLon.substring(0, 3), 10);
//     const lonMin = parseFloat(rawLon.substring(3));
//     const longitude = lonDeg + lonMin / 60;

//     return {latitude, longitude};
//   };

//   const updateCarPosition = (latitude, longitude) => {
//     animatedCoord.timing({
//       latitude,
//       longitude,
//       duration: 2000,
//       useNativeDriver: false,
//     }).start();

//     if (mapRef.current) {
//       mapRef.current.animateToRegion(
//         {
//           latitude,
//           longitude,
//           latitudeDelta: 0.001,
//           longitudeDelta: 0.001,
//         },
//         1000,
//       );
//     }
//   };

//   // 🔹 Start BLE scanning
//   useEffect(() => {
//    manager.startDeviceScan(null, null, (error, device) => {
//   if (error) {
//     console.error('Scan error:', error);
//     return;
//   }

//   // 🔹 Abhi aap yaha log kar rahe ho
//   console.log('BLE Device:', JSON.stringify(device, null, 2));
// // Alert.alert('BLE Device:', JSON.stringify(device, null, 2))
//   // 👇 Yahi jagah rawScanRecord decode karna hai
//   if (device.name && device.name.includes("GPS")) {
//   console.log("GPS Device found:", device.name, device.id);
// }
//  if (device) {
//         // device ko string me convert karke FlatList ke liye store karenge
//         const deviceStr = JSON.stringify(device, null, 2);

//         setDevices(prev => {
//           // duplicate na ho isliye filter
//           if (prev.find(d => d.id === device.id)) {
//             return prev;
//           }
//           return [...prev, { id: device.id, data: deviceStr }];
//         });
//       }
//   if (device.rawScanRecord) {
//     try {
//       const decoded = Buffer.from(device.rawScanRecord, "base64").toString("utf-8");
//       console.log("Decoded rawScanRecord:", decoded);

//       const parsed = JSON.parse(decoded);
//       console.log("Parsed JSON from rawScanRecord:", parsed);

//       if (parsed.gps) {
//         const [latStr, lonStr] = parsed.gps.split(",");
//         const { latitude, longitude } = convertToDecimal(latStr, lonStr);

//         console.log("Parsed GPS from rawScanRecord:", latitude, longitude);

//         if (!initialRegion) {
//           setInitialRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           });
//           animatedCoord.setValue({ latitude, longitude });
//         } else {
//           updateCarPosition(latitude, longitude);
//         }
//       }
//     } catch (err) {
//       console.warn("Error decoding rawScanRecord:", err);
//     }
//   }
// });

//     return () => {
//       manager.stopDeviceScan();
//     };
//   }, []);

// //   if (!initialRegion) {
// //     return (
// //       <View style={styles.center}>
// //         <ActivityIndicator size="large" color="blue" />
// //         <Text>Waiting for GPS data…</Text>
// //       </View>
// //     );
// //   }

//   return (
//     <View>

//     <MapView
//       ref={mapRef}
//       style={styles.map}
//       mapType="satellite"
//       initialRegion={initialRegion}>
//       <Marker.Animated coordinate={animatedCoord}>
//         <Image source={CAR} style={{width: 40, height: 40}} resizeMode="contain" />
//       </Marker.Animated>
//     </MapView>

//      {/* <Text style={styles.header}>Nearby BLE Devices</Text>
//       <FlatList
//         data={devices}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.text}>{item.data}</Text>
//           </View>
//         )}
//       /> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   map: {flex: 1, height:600},
//   center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
//    header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//    card: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     marginBottom: 10,
//     backgroundColor: "#f9f9f9",
//   },
//   text: { fontSize: 12, color: "#333" },
// });

// export default Ble;

// import React, {useEffect, useRef, useState} from 'react';
// import {View, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Text} from 'react-native';
// import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
// import StreetView from 'react-native-streetview'; // 👈 import
// import {CAR} from '../assests/images';

// const ParkingMap1 = () => {
//   const mapRef = useRef(null);
//   const [initialRegion, setInitialRegion] = useState(null);
//   const [showStreetView, setShowStreetView] = useState(false); // 👈 toggle state

//   const animatedCoord = useRef(
//     new AnimatedRegion({
//       latitude: 0,
//       longitude: 0,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     }),
//   ).current;

//   const updateCarPosition = (latitude, longitude) => {
//     animatedCoord
//       .timing({
//         latitude,
//         longitude,
//         duration: 2000,
//         useNativeDriver: false,
//       })
//       .start();

//     if (mapRef.current) {
//       mapRef.current.animateToRegion(
//         {
//           latitude,
//           longitude,
//           latitudeDelta: 0.0008,
//           longitudeDelta: 0.0008,
//         },
//         1000,
//       );
//     }
//   };

//   useEffect(() => {
//     const fetchLocation = async () => {
//       try {
//         const response = await fetch(
//           'https://techrepairtracker.base2brand.com/api/fetchGpsTracking',
//         );
//         const json = await response.json();

//         if (json?.status && json?.data?.length > 0) {
//           const latest = json.data[json.data.length - 1];
//           const latitude = parseFloat(latest.lat);
//           const longitude = parseFloat(latest.long);

//           if (!isNaN(latitude) && !isNaN(longitude)) {
//             if (!initialRegion) {
//               setInitialRegion({
//                 latitude,
//                 longitude,
//                 latitudeDelta: 0.01,
//                 longitudeDelta: 0.01,
//               });
//               animatedCoord.setValue({latitude, longitude});
//             } else {
//               updateCarPosition(latitude, longitude);
//             }
//           }
//         }
//       } catch (error) {
//         console.error('GPS Fetch Error:', error);
//       }
//     };

//     fetchLocation();
//     const interval = setInterval(fetchLocation, 2000);
//     return () => clearInterval(interval);
//   }, [initialRegion]);

//   if (!initialRegion) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="blue" />
//       </View>
//     );
//   }

//   return (
//     <View style={{flex: 1}}>
//       {showStreetView ? (
//         <StreetView
//           style={styles.map}
//           allGesturesEnabled={true}
//           coordinate={{
//             latitude: animatedCoord.__getValue().latitude,
//             longitude: animatedCoord.__getValue().longitude,
//           }}
//           pov={{
//             tilt: 0,
//             bearing: 0,
//             zoom: 1,
//           }}
//         />
//       ) : (
//         <MapView
//           ref={mapRef}
//           style={styles.map}
//           initialRegion={initialRegion}>
//           <Marker.Animated coordinate={animatedCoord}>
//             <Image
//               source={CAR}
//               style={{height: 40, width: 40}}
//               resizeMode="contain"
//             />
//           </Marker.Animated>
//         </MapView>
//       )}

//       {/* Toggle Button */}
//       <TouchableOpacity
//         style={styles.toggleBtn}
//         onPress={() => setShowStreetView(!showStreetView)}>
//         <Text style={{color: 'white'}}>
//           {showStreetView ? 'Show Map' : 'Show Street View'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   map: {
//     flex: 1,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   toggleBtn: {
//     position: 'absolute',
//     bottom: 40,
//     alignSelf: 'center',
//     backgroundColor: 'black',
//     padding: 10,
//     borderRadius: 10,
//   },
// });

// export default ParkingMap1;
// import React, {useRef, useState, useEffect} from 'react';
// import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
// import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
// import StreetView from 'react-native-streetview'; // 👈 import
// import {CAR} from '../assests/images';

// const ParkingMap1 = () => {
//   const mapRef = useRef(null);
//   const [initialRegion, setInitialRegion] = useState(null);
//   const [showStreetView, setShowStreetView] = useState(false); // 👈 toggle state

//   const animatedCoord = useRef(
//     new AnimatedRegion({
//       latitude: 0,
//       longitude: 0,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     }),
//   ).current;

//   // ✅ Dummy GPS data (replace with your API later)
//   const gpsData = [
//     {lat: 40.758, long: -73.9855}, // Times Square (NYC) 👉 arrows guaranteed
//     // {lat: 40.761, long: -73.982},  // Nearby point
//     // {lat: 40.762, long: -73.981},  // Nearby point
//   ];

//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       const {lat, long} = gpsData[index];
//       const latitude = parseFloat(lat);
//       const longitude = parseFloat(long);

//       if (!initialRegion) {
//         setInitialRegion({
//           latitude,
//           longitude,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         });
//         animatedCoord.setValue({latitude, longitude});
//       } else {
//         animatedCoord
//           .timing({
//             latitude,
//             longitude,
//             duration: 2000,
//             useNativeDriver: false,
//           })
//           .start();

//         if (mapRef.current) {
//           mapRef.current.animateToRegion(
//             {
//               latitude,
//               longitude,
//               latitudeDelta: 0.0008,
//               longitudeDelta: 0.0008,
//             },
//             1000,
//           );
//         }
//       }

//       index = (index + 1) % gpsData.length; // loop through dummy data
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [initialRegion]);

//   if (!initialRegion) {
//     return (
//       <View style={styles.loader}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{flex: 1}}>
//       {showStreetView ? (
//         <StreetView
//           style={styles.map}
//           coordinate={{
//             latitude: animatedCoord.__getValue().latitude,
//             longitude: animatedCoord.__getValue().longitude,
//           }}
//           pov={{
//             tilt: 0,
//             bearing: 0,
//             zoom: 1, // 👈 keep zoom > 0 so arrows show
//           }}
//           allGesturesEnabled={true}
//           navigationGestures={true}
//           navigationLinksHidden={false} // 👈 force arrows
//           zoom={1}
//         />
//       ) : (
//         <MapView ref={mapRef} style={styles.map} initialRegion={initialRegion}>
//           <Marker.Animated coordinate={animatedCoord}>
//             <Image
//               source={CAR}
//               style={{height: 40, width: 40}}
//               resizeMode="contain"
//             />
//           </Marker.Animated>
//         </MapView>
//       )}

//       {/* Toggle Button */}
//       <TouchableOpacity
//         style={styles.toggleBtn}
//         onPress={() => setShowStreetView(!showStreetView)}>
//         <Text style={{color: 'white'}}>
//           {showStreetView ? 'Show Map' : 'Show Street View'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   map: {
//     flex: 1,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   toggleBtn: {
//     position: 'absolute',
//     bottom: 80,
//     alignSelf: 'center',
//     backgroundColor: 'black',
//     padding: 10,
//     borderRadius: 10,
//   },
// });

// export default ParkingMap1;
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const ApiList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://techrepairtracker.base2brand.com/api/fetchGpsTracking',
        );
        const json = await response.json();

        if (json?.status && json?.data) {
          setData(json.data);
        }
      } catch (error) {
        console.error('❌ API Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Text>Lat: {item.lat}</Text>
          <Text>Long: {item.long}</Text>
          <Text>Time: {item.time}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  loader: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  card: {
    padding: 10,
    margin: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
  },
});

export default ApiList;
