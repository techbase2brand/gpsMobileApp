// import React, {useEffect, useRef, useState} from 'react';
// import {View, StyleSheet, Image, ActivityIndicator, Text, Alert, FlatList} from 'react-native';
// import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
// import {BleManager} from 'react-native-ble-plx';
// import {Buffer} from 'buffer';
// import {CAR} from '../assests/images';

// const manager = new BleManager();

// const BleTesting = () => {
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

//     {/* <MapView
//       ref={mapRef}
//       style={styles.map}
//       mapType="satellite"
//       initialRegion={initialRegion}>
//       <Marker.Animated coordinate={animatedCoord}>
//         <Image source={CAR} style={{width: 40, height: 40}} resizeMode="contain" />
//       </Marker.Animated>
//     </MapView> */}

//      <Text style={styles.header}>Nearby BLE Devices</Text>
//       <FlatList
//         data={devices}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.text}>{item.data}</Text>
//           </View>
//         )}
//       />
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

// export default BleTesting;


import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { BleManager } from "react-native-ble-plx";

const BleTesting = () => {
  const [devices, setDevices] = useState([]);
  const manager = new BleManager();

  useEffect(() => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error("Scan error:", error);
        return;
      }

      if (device) {
        // console.log wali string banayenge
        const logString =
          "BLE Device: " + JSON.stringify(device, null, 2);

        setDevices(prev => {
          // agar pehle se hai to repeat na ho
          if (prev.find(d => d.id === device.id)) {
            return prev;
          }
          return [...prev, { id: device.id, log: logString }];
        });
      }
    });

    return () => {
      manager.stopDeviceScan();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nearby BLE Devices</Text>
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item.log}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  card: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  text: { fontSize: 12, color: "#333", fontFamily: "Courier" },
});

export default BleTesting;
