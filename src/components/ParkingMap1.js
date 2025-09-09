// import React, {useEffect, useRef} from 'react';
// import {View, StyleSheet, Image} from 'react-native';
// import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
// import {CAR} from '../assests/images';
// import Icon from 'react-native-vector-icons/FontAwesome';
// const ParkingMap1 = () => {
//   const mapRef = useRef(null);

//   // Initial Position (Start Point)
//   const animatedCoord = useRef(
//     new AnimatedRegion({
//       latitude: 30.71106,
//       longitude: 76.6921,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     }),
//   ).current;

//   // 🚗 function to smoothly update car position
//   const updateCarPosition = (latitude, longitude) => {
//     animatedCoord
//       .timing({
//         latitude,
//         longitude,
//         duration: 2000, // smooth animation speed (2 sec)
//         useNativeDriver: false,
//       })
//       .start();

//     if (mapRef.current) {
//       mapRef.current.animateToRegion(
//         {
//           latitude,
//           longitude,
//           latitudeDelta:  0.0002, // zoom level (kam value = zyada zoom)
//           longitudeDelta: 0.0002,
//         },
//         1000, // animation duration (1 sec)
//       );
//     }
//   };

//   // ✅ Example: simulate backend coordinates every few sec
//   useEffect(() => {
//     const coords = [
//       {latitude: 30.7111, longitude: 76.6922},
//       {latitude: 30.7113, longitude: 76.6925},
//       {latitude: 30.7116, longitude: 76.6927},
//       {latitude: 30.7118, longitude: 76.6929},
//         {latitude: 30.7120, longitude: 76.6931},
//          {latitude: 30.7122, longitude: 76.6933},
//          {latitude: 30.7124, longitude: 76.6935},
//     ];

//     let index = 0;
//     const interval = setInterval(() => {
//       if (index < coords.length) {
//         const {latitude, longitude} = coords[index];
//         updateCarPosition(latitude, longitude);
//         index++;
//       }
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <MapView
//       ref={mapRef}
//       mapType="satellite"
//       style={styles.map}
//       initialRegion={{
//         latitude: 30.71106,
//         longitude: 76.6921,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       }}>
//       {/* 🚗 Car Marker */}
//       <Marker.Animated coordinate={animatedCoord}>
//         {/* <Image
//           source={CAR}
//           style={{height: 30, width: 30}}
//           resizeMode="contain"
//         /> */}
//         <Icon name="car" size={16} color="red" />
//       </Marker.Animated>
//     </MapView>
//   );
// };

// const styles = StyleSheet.create({
//   map: {
//     flex: 1,
//   },
// });

// export default ParkingMap1;

// import React, {useEffect, useRef, useState} from 'react';
// import {View, StyleSheet, Image, Alert} from 'react-native';
// import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
// import {CAR} from '../assests/images';

// const initialVinList = [
//  {
//     "id": "1",
//     "vin": "VIN-100001",
//     "parkingYard": 1,
//     "year": 2016,
//     "make": "Honda",
//     "model": "Accord",
//   latitude: 30.71106,
//     longitude: 76.6921,
//   },
//   {
//     "id": "2",
//     "vin": "VIN-100002",
//     "parkingYard": 1,
//     "year": 2021,
//     "make": "Hyundai",
//     "model": "Creta",
//      latitude: 30.712,
//     longitude: 76.693,
//   },
// ];

// const ParkingMap1 = ({selectedCar}) => {
//   const mapRef = useRef(null);
//   const [cars, setCars] = useState(initialVinList);

//   // Animated coordinates store karne ke liye ref
//   const animatedCoords = useRef(
//     initialVinList.reduce((acc, car) => {
//       acc[car.vin] = new AnimatedRegion({
//         latitude: car.latitude,
//         longitude: car.longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       });
//       return acc;
//     }, {}),
//   ).current;

//   // 🚗 Update car position
//   const updateCarPosition = (vin, latitude, longitude) => {
//     animatedCoords[vin]
//       .timing({
//         latitude,
//         longitude,
//         duration: 2000,
//         useNativeDriver: false,
//       })
//       .start();

//     //  zoom
//     if (mapRef.current) {
//       mapRef.current.animateToRegion(
//         {
//           latitude,
//           longitude,
//           latitudeDelta: 0.002,
//           longitudeDelta: 0.0002,
//         },
//         1000,
//       );
//     }
//   };

//   // ✅ Fetch GPS Tracking for all cars
//   useEffect(() => {
//     const interval = setInterval(async () => {
//       try {
//         const response = await fetch(
//           'https://techrepairtracker.base2brand.com/api/fetchGpsTracking',
//         );
//         const json = await response.json();
// console.log("json...",json);

//         if (json?.status && json?.data?.length > 0) {
//           // yahan assume kar raha hun ki API har car ke VIN ka data degi
//           const updatedCars = cars.map(car => {
//             const carData = json.data.find(d => d.deviceId === car.vin); // match VIN/deviceId
//             if (carData) {
//               const latitude = parseFloat(carData.lat);
//               const longitude = parseFloat(carData.long);

//               if (!isNaN(latitude) && !isNaN(longitude)) {
//                 updateCarPosition(car.vin, latitude, longitude);
//                 return {...car, latitude, longitude};
//               }
//             }
//             return car;
//           });

//           setCars(updatedCars);
//         } else {
//           Alert.alert('No Data', 'No GPS tracking found');
//         }
//       } catch (error) {
//         console.error('GPS Fetch Error:', error);
//       }
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [cars]);

//   return (
//     <MapView
//       ref={mapRef}
//       mapType="satellite"
//       style={styles.map}
//       initialRegion={{
//         latitude: 30.71106,
//         longitude: 76.6921,
//         latitudeDelta: 0.02,
//         longitudeDelta: 0.02,
//       }}>
//       {/* 🚗 Show all cars */}
//       {cars.map(car => (
//         <Marker.Animated key={car.vin} coordinate={animatedCoords[car.vin]}>
//           <Image
//             source={CAR}
//             style={{height: 35, width: 35}}
//             resizeMode="contain"
//           />
//         </Marker.Animated>
//       ))}
//     </MapView>
//   );
// };

// const styles = StyleSheet.create({
//   map: {
//     flex: 1,
//   },
// });

// export default ParkingMap1;

// import React, {useEffect, useRef, useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   Image,
//   ActivityIndicator,
//   TouchableOpacity,
//   Text,
// } from 'react-native';
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
//         // <View style={{flex:1, backgroundColor:"red"}}>
//         //   <StreetView
//         //   style={styles.map}
//         //    allGesturesEnabled={true}       // sab gestures allowed
//         // navigationGestures={true}       // 👈 arrow tap se next/prev possible
//         // navigationLinksHidden={false}   // 👈 iOS me arrows forcefully visible
//         // streetNamesHidden={false}       // optional: street names bhi dikhe
//         // onPanoramaChange={(event) => {
//         //   const { position } = event.nativeEvent;
//         //   console.log('Moved to:', position.latitude, position.longitude);
//         // }}
//         //   coordinate={{
//         //     latitude: animatedCoord.__getValue().latitude,
//         //     longitude: animatedCoord.__getValue().longitude,
//         //   }}
//         //   pov={{
//         //     tilt: 0,
//         //     bearing: 0,
//         //     // zoom: 1,
//         //   }}
//         // />
//         <StreetView
//           style={{flex: 1}}
//           coordinate={{
//             latitude: 40.758,
//             longitude: -73.9855,
//             radius: 50,
//           }}
//           pov={{
//             tilt: 0,
//             bearing: 0,
//             // zoom: 1,
//           }}
//           allGesturesEnabled={true}
//           navigationGestures={true} // enable moving with arrows
//           navigationLinksHidden={false} // force show arrows if available
//           // streetNamesHidden={false}
//           onPanoramaChange={event => {
//             console.log('Panorama changed:', event.nativeEvent);
//           }}
//         />
//       ) : (
//         // </View>
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
//     bottom: 200,
//     alignSelf: 'center',
//     backgroundColor: 'black',
//     padding: 10,
//     borderRadius: 10,
//   },
// });

// export default ParkingMap1;

/// main vcode
// import React, {useEffect, useRef, useState} from 'react';
// import {View, StyleSheet, Image, ActivityIndicator} from 'react-native';
// import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
// import {CAR} from '../assests/images';

// const ParkingMap1 = () => {
//   const mapRef = useRef(null);
//   const [initialRegion, setInitialRegion] = useState(null); // 👈 initially null

//   // Animated coordinates (default dummy value)
//   const animatedCoord = useRef(
//     new AnimatedRegion({
//       latitude: 0,
//       longitude: 0,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     }),
//   ).current;

//   // 🚗 Smooth update
//   const updateCarPosition = (latitude, longitude) => {
//     animatedCoord
//       .timing({
//         latitude,
//         longitude,
//         duration: 2000,
//         useNativeDriver: false,
//       })
//       .start();

//     // Zoom and follow car
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

//   // ✅ Fetch API
//   useEffect(() => {
//     const fetchLocation = async () => {
//       try {
//         const response = await fetch(
//           'https://techrepairtracker.base2brand.com/api/fetchGpsTracking',
//         );
//         const json = await response.json();
//         console.log('jsonjsonjsonjson', json);

//         if (json?.status && json?.data?.length > 0) {
//           const latest = json.data[json.data.length - 1];
//           const latitude = parseFloat(latest.lat);
//           const longitude = parseFloat(latest.long);

//           if (!isNaN(latitude) && !isNaN(longitude)) {
//             // set initialRegion from api data
//             if (!initialRegion) {
//               setInitialRegion({
//                 latitude,
//                 longitude,
//                 latitudeDelta: 0.01,
//                 longitudeDelta: 0.01,
//               });
//               animatedCoord.setValue({latitude, longitude}); // 👈 direct set
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

//     //  2 sec interval
//     const interval = setInterval(fetchLocation, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   if (!initialRegion) {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <ActivityIndicator size="large" color="blue" />
//       </View>
//     );
//   }

//   return (
//     <MapView
//       ref={mapRef}
//       mapType="satellite"
//       style={styles.map}
//       initialRegion={initialRegion} // dynamic initialRegion
//     >
//       <Marker.Animated coordinate={animatedCoord}>
//         <Image
//           source={CAR}
//           style={{height: 40, width: 40}}
//           resizeMode="contain"
//         />
//       </Marker.Animated>
//     </MapView>
//   );
// };

// const styles = StyleSheet.create({
//   map: {
//     flex: 1,
//   },
// });

// export default ParkingMap1;

// import React, {useEffect, useRef, useState} from 'react';
// import {View, StyleSheet, Image, ActivityIndicator, Text} from 'react-native';
// import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
// import {BleManager} from 'react-native-ble-plx';
// import {Buffer} from 'buffer';
// import {CAR} from '../assests/images';

// const manager = new BleManager();

// const ParkingMap1 = () => {
//   const mapRef = useRef(null);
//   const [initialRegion, setInitialRegion] = useState(null);
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

//   // 👇 Yahi jagah rawScanRecord decode karna hai
//   if (device.name && device.name.includes("GPS")) {
//   console.log("GPS Device found:", device.name, device.id);
// }
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
//   }, [initialRegion]);

//   if (!initialRegion) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="blue" />
//         <Text>Waiting for GPS data…</Text>
//       </View>
//     );
//   }

//   return (
//     <MapView
//       ref={mapRef}
//       style={styles.map}
//       mapType="satellite"
//       initialRegion={initialRegion}>
//       <Marker.Animated coordinate={animatedCoord}>
//         <Image source={CAR} style={{width: 40, height: 40}} resizeMode="contain" />
//       </Marker.Animated>
//     </MapView>
//   );
// };

// const styles = StyleSheet.create({
//   map: {flex: 1},
//   center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
// });

// export default ParkingMap1;
const GOOGLE_MAPS_APIKEY = 'AIzaSyBXNyT9zcGdvhAUCUEYTm6e_qPw26AOPgI'; // 👈 Add your API Key

// import React, {useEffect, useRef, useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   Image,
//   ActivityIndicator,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
// import Geolocation from '@react-native-community/geolocation';
// import {CAR} from '../assests/images';

// const ParkingMap1 = () => {
//   const mapRef = useRef(null);
//   const [initialRegion, setInitialRegion] = useState(null);
//   const [currentLocation, setCurrentLocation] = useState(null); // 👈 user location
//   const [carLocation, setCarLocation] = useState(null); // 👈 API car location
//   console.log('initialRegioninitialRegion', initialRegion);

//   // Animated coordinates
//   const animatedCoord = useRef(
//     new AnimatedRegion({
//       latitude: 0,
//       longitude: 0,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     }),
//   ).current;

//   // 🚗 Smooth update for car
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
//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     }
//     return true; // iOS case
//   };
//   // 🔹 Fetch API car location
//   useEffect(() => {
//     const fetchLocation = async () => {
//       try {
//         const response = await fetch(
//           'https://techrepairtracker.base2brand.com/api/fetchGpsTracking',
//         );
//         const json = await response.json();
//         console.log('json>>>>', json);

//         if (json?.status && json?.data?.length > 0) {
//           const latest = json.data[json.data.length - 1];
//           const latitude = parseFloat(latest.lat);
//           const longitude = parseFloat(latest.long);

//           if (!isNaN(latitude) && !isNaN(longitude)) {
//             setCarLocation({latitude, longitude});

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
//   }, []);

//   // 🔹 Get current device location
//   useEffect(() => {
//     const getLocation = async () => {
//       const hasPermission = await requestLocationPermission();
//       if (!hasPermission) {
//         console.log('❌ Location permission denied');
//         return;
//       }

//       Geolocation.getCurrentPosition(
//         pos => {
//           const {latitude, longitude} = pos.coords;
//           setCurrentLocation({latitude, longitude});
//           console.log('✅ Current Location:', latitude, longitude);
//         },
//         error => {
//           console.log('❌ Location Error:', error);
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 30000, // 👈 30 sec
//           maximumAge: 10000,
//         },
//       );
//     };

//     getLocation();
//   }, []);

//   if (!initialRegion) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="blue" />
//       </View>
//     );
//   }

//   return (
//     <MapView
//       ref={mapRef}
//       mapType="satellite"
//       style={styles.map}
//       initialRegion={initialRegion}
//       showsUserLocation={true} // 👈 blue dot
//     >
//       {/* 🚗 Car Marker */}
//       <Marker.Animated coordinate={animatedCoord}>
//         <Image
//           source={CAR}
//           style={{height: 40, width: 40}}
//           resizeMode="contain"
//         />
//       </Marker.Animated>

//       {/* 📍 Directions from user → car */}
//       <MapViewDirections
//         origin={currentLocation}
//         destination={carLocation}
//         apikey={GOOGLE_MAPS_APIKEY}
//         strokeWidth={4}
//         strokeColor="red"
//         onReady={result => {
//           mapRef.current.fitToCoordinates(result.coordinates, {
//             edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
//             animated: true,
//           });
//         }}
//       />
//     </MapView>
//   );
// };

// const styles = StyleSheet.create({
//   map: {flex: 1},
//   loader: {flex: 1, justifyContent: 'center', alignItems: 'center'},
// });

// export default ParkingMap1;


import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import StreetView from 'react-native-streetview';
import {CAR} from '../assests/images';

const ParkingMap1 = () => {
  const mapRef = useRef(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [showStreetView, setShowStreetView] = useState(false);
  const [links, setLinks] = useState([]);
  console.log('linkslinks', links);

  const animatedCoord = useRef(
    new AnimatedRegion({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }),
  ).current;

  const [bearing, setBearing] = useState(0);
  const [targetCoord, setTargetCoord] = useState(null);

  // bearing calculate helper
  const calculateBearing = (lat1, lon1, lat2, lon2) => {
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          'https://techrepairtracker.base2brand.com/api/fetchGpsTracking',
        );
        const json = await response.json();

        if (json?.status && json?.data?.length > 0) {
          const latest = json.data[json.data.length - 1];
          const latitude = parseFloat(latest.lat);
          const longitude = parseFloat(latest.long);

          if (!isNaN(latitude) && !isNaN(longitude)) {
            if (!initialRegion) {
              setInitialRegion({
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              });
              animatedCoord.setValue({latitude, longitude});
            }

            // Target 500m ahead
            const target = {
              latitude: latitude + 0.0045, // approx 500m north
              longitude,
            };
            setTargetCoord(target);

            if (target) {
              const brng = calculateBearing(
                latitude,
                longitude,
                target.latitude,
                target.longitude,
              );
              setBearing(brng);
            }
          }
        }
      } catch (error) {
        console.error('GPS Fetch Error:', error);
      }
    };

    fetchLocation();
    const interval = setInterval(fetchLocation, 2000);
    return () => clearInterval(interval);
  }, [initialRegion]);

  if (!initialRegion) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      {showStreetView ? (
        <View style={{flex: 1}}>
          <StreetView
            style={styles.map}
            allGesturesEnabled={true}
            coordinate={{
              latitude: animatedCoord.__getValue().latitude,
              longitude: animatedCoord.__getValue().longitude,
            }}
            pov={{
              tilt: 0,
              bearing: bearing,
              zoom: 1,
            }}
            onPanoramaChange={event => {
              const {nativeEvent} = event;
              console.log('nativeEvent:::', nativeEvent);

              if (nativeEvent?.position) {
                const {latitude, longitude} = nativeEvent.position;
                animatedCoord
                  .timing({
                    latitude,
                    longitude,
                    duration: 800,
                    useNativeDriver: false,
                  })
                  .start();
              }
              if (nativeEvent?.links) {
                setLinks(nativeEvent.links);
                console.log('Available links (arrows):', nativeEvent.links);
              }
            }}
          />

          {/* Mini Map Overlay */}
          <TouchableOpacity
            onPress={() => setShowStreetView(false)}
            style={styles.miniMapContainer}>
            <MapView
              style={styles.miniMap}
              region={{
                latitude: animatedCoord.__getValue().latitude,
                longitude: animatedCoord.__getValue().longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              pointerEvents="none" // disable touch
            >
              <Marker.Animated coordinate={animatedCoord}>
                <Image
                  source={CAR}
                  style={{height: 20, width: 20}}
                  resizeMode="contain"
                />
              </Marker.Animated>

              {targetCoord && (
                <MapViewDirections
                  origin={{
                    latitude: animatedCoord.__getValue().latitude,
                    longitude: animatedCoord.__getValue().longitude,
                  }}
                  destination={targetCoord}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
                  strokeColor="blue"
                  mode="DRIVING"
                />
              )}
            </MapView>
          </TouchableOpacity>
        </View>
      ) : (
        <MapView ref={mapRef} mapType="satellite" style={styles.map} initialRegion={initialRegion}>
          <Marker.Animated coordinate={animatedCoord}>
            <Image
              source={CAR}
              style={{height: 30, width: 30}}
              resizeMode="contain"
            />
          </Marker.Animated>

          {targetCoord && (
            <MapViewDirections
              origin={{
                latitude: animatedCoord.__getValue().latitude,
                longitude: animatedCoord.__getValue().longitude,
              }}
              destination={targetCoord}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={4}
              strokeColor="blue"
              mode="DRIVING"
              onReady={result => {
                if (result.coordinates.length > 1) {
                  const start = result.coordinates[0];
                  const next = result.coordinates[1];
                  const brng = calculateBearing(
                    start.latitude,
                    start.longitude,
                    next.latitude,
                    next.longitude,
                  );
                  setBearing(brng);
                }
              }}
            />
          )}
        </MapView>
      )}

      <TouchableOpacity
        style={styles.toggleBtn}
        onPress={() => setShowStreetView(!showStreetView)}>
        <Text style={styles.toggleBtnText}>
          {showStreetView ? 'Show Map' : 'Show Street View'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {flex: 1},
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleBtn: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
  },
  toggleBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  miniMapContainer: {
    position: 'absolute',
    top: 20,
    right: 10,
    width: 140,
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 6,
  },
  miniMap: {
    flex: 1,
  },
});

export default ParkingMap1;