// import React, { useEffect, useRef, useState } from 'react';
// import { View, Image, Text, StyleSheet } from 'react-native';
// import MapView, { Marker, Circle, Callout } from 'react-native-maps';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const ParkingMap = ({ parkingYards, single, vin, zoomIn }) => {
//   const [visibleCallouts, setVisibleCallouts] = useState([]);
//   // const markerRef = useRef(null);
//   const markerRefs = useRef({});
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       const ids = parkingYards.map(yard => yard.id);
//       setVisibleCallouts(ids);
//     }, 1000);
//     return () => clearTimeout(timeout);
//   }, [parkingYards]);
//   useEffect(() => {
//     if (zoomIn) {
//     if (mapRef.current) {
//       const center = parkingYards[0].center;

//       // Zoom 1
//       mapRef.current.animateToRegion(
//         {
//           latitude: center.latitude,
//           longitude: center.longitude,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         },
//         1000,
//       );

//       // Zoom 2 after 1 second
//       setTimeout(() => {
//         mapRef.current.animateToRegion(
//           {
//             latitude: center.latitude,
//             longitude: center.longitude,
//             latitudeDelta: 0.02,
//             longitudeDelta: 0.02,
//           },
//           1000,
//         );
//       }, 500);

//       // Zoom 3 after 2 seconds
//       setTimeout(() => {
//         mapRef.current.animateToRegion(
//           {
//             latitude: center.latitude,
//             longitude: center.longitude,
//             latitudeDelta: 0.005,
//             longitudeDelta: 0.005,
//           },
//           1000,
//         );
//       }, 1000);

//       // Zoom 4 after 3 seconds
//       setTimeout(() => {
//         mapRef.current.animateToRegion(
//           {
//             latitude: center.latitude,
//             longitude: center.longitude,
//             latitudeDelta: 0.005,
//             longitudeDelta: 0.005,
//           },
//           1000,
//         );
//       }, 1500);
//       }
//     }
//   }, []);

//   return (
//     <MapView
//       ref={mapRef}
//       style={{ flex: 1 }}
//       initialRegion={{
//         latitude: parkingYards[0].center.latitude,
//         longitude: parkingYards[0].center.longitude,
//         // latitude: 37.78925,
//         // longitude: -122.4324,
//         latitudeDelta: 0.02,
//         longitudeDelta: 0.02,
//       }}>
//       {parkingYards?.map(yard => (
//         <View key={yard.id}>
//           <Circle
//             center={yard.center}
//             radius={yard.radius}
//             strokeColor="red"
//             fillColor="rgba(0, 0, 255, 0.1)"
//           />

//           {/* Red marker at center with Callout */}
//           {/* {!single && <Marker
//             coordinate={yard.center}
//             pinColor="red"
//             ref={ref => {
//               if (ref) markerRefs.current[yard.id] = ref;
//             }}>
//             <Callout>
//               <Text>{yard.name}</Text>
//             </Callout>
//           </Marker>} */}

//           {!single &&<Marker coordinate={yard.center}>
//             <View>
//               {/* Red Marker Icon */}
//               <Icon name="map-marker" size={30} color="red" />

//               {/* Custom Callout (Conditionally Rendered) */}
//               {visibleCallouts.includes(yard.id) && (
//                 <View style={styles.customCallout}>
//                   <Text>{yard.name}</Text>
//                 </View>
//               )}
//             </View>
//           </Marker>}

//           {/* Static cars */}
//           {yard?.cars?.map(car => (
//             <Marker
//               key={car.id}
//               coordinate={{ latitude: car.latitude, longitude: car.longitude }}
//               title={single ? 'Parking Yard 1' : ''}
//               description={single ? vin : ""}

//             >
//               <Icon name="car" size={20} color="#000" />
//             </Marker>
//           ))}
//         </View>
//       ))}
//     </MapView>
//   );
// };

// const styles = StyleSheet.create({
//   customCallout: {
//     position: 'absolute',
//     bottom: 40,
//     // left:-40,
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 5,
//     borderWidth: 1,
//     width:120,
//     borderColor: '#ddd',
//     elevation: 5,
//   },
// });

// export default ParkingMap;

import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import MapView, {
  Marker,
  Circle,
  Polygon,
  Geojson,
  AnimatedRegion,
} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

const SLOT_SIZE = 0.00003; // Adjust for slot size

const getSlotPolygon = (latitude, longitude, size = SLOT_SIZE) => {
  // Return array of coords making a square polygon around (lat, lng)
  return [
    {latitude: latitude + size, longitude: longitude - size},
    {latitude: latitude + size, longitude: longitude + size},
    {latitude: latitude - size, longitude: longitude + size},
    {latitude: latitude - size, longitude: longitude - size},
  ];
};

// Point in Polygon checker (Ray casting algorithm)
const isOutsidePolygon = (point, polygon) => {
  let x = point.latitude;
  let y = point.longitude;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].latitude,
      yi = polygon[i].longitude;
    const xj = polygon[j].latitude,
      yj = polygon[j].longitude;

    const intersect =
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi + 0.0000001) + xi;
    if (intersect) inside = !inside;
  }
  return !inside;
};

const ParkingMap1 = ({parkingYards, single, vin, zoomIn}) => {
  const mapRef = useRef(null);
  const [visibleCallouts, setVisibleCallouts] = useState([]);
  const [yards, setYards] = useState(parkingYards);
  const [carPosition, setCarPosition] = useState(null); // Current position of moving car
  const [isMoving, setIsMoving] = useState(null); // Current position of moving car

  // car moving logic
  const [yardData, setYardData] = useState(parkingYards);
  const [isCarMoving, setIsCarMoving] = useState(true);

  // const [animatedCoord] = useState(
  //   new AnimatedRegion({
  //     latitude: 30.71106,
  //     longitude: 76.6921,
  //     latitudeDelta: 0.0001,
  //     longitudeDelta: 0.0001,
  //   }),
  // );

  const animatedCoord = useRef(
    new AnimatedRegion({
      latitude: yardData[0].cars[0].latitude,
      longitude: yardData[0].cars[0].longitude,
      latitudeDelta: 0.0001,
      longitudeDelta: 0.0001,
    }),
  ).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const toCoord = {
        latitude: yardData[0].cars[3].latitude,
        longitude: yardData[0].cars[3].longitude,
      };

      animatedCoord
        .timing({
          ...toCoord,
          duration: 10000,
          useNativeDriver: false,
        })
        .start(() => {
          // Animation complete => update visibility
          setYardData(prev => {
            const updated = [...prev];
            updated[0].cars = updated[0].cars.map(car => {
              if (car.id === '1') return {...car, show: false};
              if (car.id === '4') return {...car, show: true};
              return car;
            });
            return updated;
          });
          // ✅ SHOW ALERT
          Alert.alert("Vehicle Relocated", "Car 1 has arrived at its designated Slot 4.");
          setIsCarMoving(false);
        });
    }, 15000);

    return () => clearTimeout(timeout);
  }, []);


  // slot logic
  const slot1 = parkingYards[0]?.cars?.find(c => c.id === '1-1');
  const slot18 = parkingYards[0]?.cars?.find(c => c.id === '1-18');

  useEffect(() => {
    if (!slot1 || !slot18) return;

    setCarPosition({latitude: slot1.latitude, longitude: slot1.longitude}); // Start from slot 1

    // Animate car movement from slot1 to slot18
    let steps = 50; // How smooth animation will be
    let currentStep = 0;

    const latDiff = (slot18.latitude - slot1.latitude) / steps;
    const longDiff = (slot18.longitude - slot1.longitude) / steps;

    setIsMoving(true);
    const interval = setInterval(() => {
      currentStep++;
      setCarPosition(prev => {
        if (!prev) return prev;
        const newLat = prev.latitude + latDiff;
        const newLong = prev.longitude + longDiff;
        return {latitude: newLat, longitude: newLong};
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setIsMoving(false);
        {
          !single && Alert.alert('Alert', 'Car-1 has reached slot 18!');
        }
      }
    }, 100); // Update every 100ms

    return () => clearInterval(interval);
  }, [parkingYards]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const ids = parkingYards?.map(yard => yard.id);
      setVisibleCallouts(ids);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [parkingYards]);

  useEffect(() => {
    if (zoomIn) {
      if (mapRef.current) {
        const center = parkingYards[0]?.center;
        mapRef.current.animateToRegion(
          {
            latitude: center?.latitude,
            longitude: center?.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          },
          1000,
        );
        setTimeout(() => {
          mapRef.current.animateToRegion(
            {
              latitude: center?.latitude,
              longitude: center?.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            },
            1000,
          );
        }, 500);
        setTimeout(() => {
          mapRef.current.animateToRegion(
            {
              latitude: center?.latitude,
              longitude: center?.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            },
            1000,
          );
        }, 1000);
        setTimeout(() => {
          mapRef.current.animateToRegion(
            {
              latitude: center?.latitude,
              longitude: center?.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            },
            1000,
          );
        }, 1500);
      }
    }
  }, []);

  const moveCarOutsidePolygon = () => {
    if (!carPosition || !yards[0]) return;

    const steps = 100;
    const moveLat = 0.00095; // increase to move faster
    const moveLng = 0.00095;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setCarPosition(prev => {
        if (!prev) return prev;
        const newLat = prev.latitude + moveLat / steps;
        const newLng = prev.longitude + moveLng / steps;
        const newPos = {latitude: newLat, longitude: newLng};
        // Create polygon boundary
        const yard = yards[0];
        const polygonCoords = [
          {
            latitude: yard?.center?.latitude + yard.radius / 111000,
            longitude:
              yard?.center?.longitude -
              yard?.radius /
                (111000 * Math.cos(yard.center.latitude * (Math.PI / 180))),
          },
          {
            latitude: yard.center.latitude + yard.radius / 111000,
            longitude:
              yard.center.longitude +
              yard.radius /
                (111000 * Math.cos(yard.center.latitude * (Math.PI / 180))),
          },
          {
            latitude: yard.center.latitude - yard.radius / 111000,
            longitude:
              yard.center.longitude +
              yard.radius /
                (111000 * Math.cos(yard.center.latitude * (Math.PI / 180))),
          },
          {
            latitude: yard.center.latitude - yard.radius / 111000,
            longitude:
              yard.center.longitude -
              yard.radius /
                (111000 * Math.cos(yard.center.latitude * (Math.PI / 180))),
          },
        ];

        const isOut = isOutsidePolygon(newPos, polygonCoords);
        if (isOut && !single) {
          clearInterval(interval);
          Alert.alert('Alert', 'Car no. 10 has exited from Parking Yard 1!');
        }

        return newPos;
      });

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, 100);
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={{flex: 1}}
        initialRegion={{
          latitude: parkingYards[0]?.center?.latitude,
          longitude: parkingYards[0]?.center?.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        {yards?.map(yard => (
          <View key={yard.id}>
            <View
              style={{
                width: 100,
                height: 100,
                border: 2,
                borderBlockColor: 'red',
              }}></View>
            <Polygon
              // coordinates={[
              //   {
              //     latitude: yard.center.latitude + yard.radius / 111000,
              //     longitude:
              //       yard.center.longitude -
              //       yard.radius /
              //         (111000 *
              //           Math.cos(yard.center.latitude * (Math.PI / 180))),
              //   },
              //   {
              //     latitude: yard.center.latitude + yard.radius / 111000,
              //     longitude:
              //       yard.center.longitude +
              //       yard.radius /
              //         (111000 *
              //           Math.cos(yard.center.latitude * (Math.PI / 180))),
              //   },
              //   {
              //     latitude: yard.center.latitude - yard.radius / 111000,
              //     longitude:
              //       yard.center.longitude +
              //       yard.radius /
              //         (111000 *
              //           Math.cos(yard.center.latitude * (Math.PI / 180))),
              //   },
              //   {
              //     latitude: yard.center.latitude - yard.radius / 111000,
              //     longitude:
              //       yard.center.longitude -
              //       yard.radius /
              //         (111000 *
              //           Math.cos(yard.center.latitude * (Math.PI / 180))),
              //   },
              // ]}
              coordinates={[
                {latitude: 30.711027302177996, longitude: 76.69192117295694},
                {latitude: 30.711198763066967, longitude: 76.69214568900318},
                {latitude: 30.711331402568817, longitude: 76.69241786767236},
                {latitude: 30.71115886345906, longitude: 76.69258343258116},
                {latitude: 30.7110122048609, longitude: 76.69228365975869},
                {latitude: 30.71086985976396, longitude: 76.69205412659352},
                {latitude: 30.711027302177968, longitude: 76.6919261900743},
              ]}
              strokeColor="red"
              fillColor="rgba(0, 0, 255, 0.1)"
              strokeWidth={1}
            />

            {single && (
              <Marker coordinate={yard.center}>
                <View>
                  <Icon name="map-marker" size={30} color="red" />
                  {visibleCallouts?.includes(yard?.id) && (
                    <View style={styles.customCallout}>
                      <Text>{yard?.name}</Text>
                    </View>
                  )}
                </View>
              </Marker>
            )}

            {isCarMoving && (
              <Marker.Animated coordinate={animatedCoord}>
                <Icon name="car" size={14} color="#000" />
              </Marker.Animated>
            )}

            {yardData?.[0]?.cars?.map((car, index) => {
              if (car.id === '1-1') return null;

              const slotCoords = getSlotPolygon(car.latitude, car.longitude);

              return (
                <React.Fragment key={car.id}>
                  {/* Show only when car.show is true and it's not moving */}
                  {car.show && (!isCarMoving || car.id !== '1') && (
                    <Marker
                      coordinate={{
                        latitude: car.latitude,
                        longitude: car.longitude,
                      }}>
                      <Icon name="car" size={12} color="#000" />
                    </Marker>
                  )}

                  {/* Polygon */}
                  <Polygon
                    coordinates={slotCoords}
                    strokeColor="#008000"
                    strokeWidth={2}
                    fillColor="rgba(0, 128, 0, 0.1)"
                  />

                  {/* Slot Number */}
                  <Marker
                    coordinate={{
                      latitude: car.latitude,
                      longitude: car.longitude,
                    }}
                    anchor={{x: 0.5, y: 0.5}}
                    tracksViewChanges={false}>
                    <View
                      style={{
                        borderRadius: 12,
                        paddingHorizontal: 6,
                        paddingTop: 10,
                      }}>
                      <Text
                        style={{
                          color: 'red',
                          fontWeight: 'bold',
                          fontSize: 14,
                        }}>
                        {index + 1}
                      </Text>
                    </View>
                  </Marker>
                </React.Fragment>
              );
            })}

            {/* Moving Car 1 Marker */}
            {carPosition && (
              <Marker
                coordinate={carPosition}
                title="Moving Car"
                description="Car 1">
                <Icon name="car" size={16} color="#000" />
              </Marker>
            )}
          </View>
        ))}
      </MapView>

      {/* Exit Button */}
      {!single && (
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            alignSelf: 'center',
            backgroundColor: 'blue',
            borderRadius: 10,
          }}>
          <Button
            title="Move Car Outside The Parking Yard"
            color={'#fff'}
            onPress={moveCarOutsidePolygon}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  moveButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  customCallout: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    width: 120,
    borderColor: '#ddd',
    elevation: 5,
  },
});

export default ParkingMap1;



//// for local park coordinates 


// import React, {useEffect, useRef, useState} from 'react';
// import {View, Text, StyleSheet, Button, Alert} from 'react-native';
// import MapView, {
//   Marker,
//   Circle,
//   Polygon,
//   Geojson,
//   AnimatedRegion,
// } from 'react-native-maps';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const SLOT_SIZE = 0.00003; // Adjust for slot size

// const getSlotPolygon = (latitude, longitude, size = SLOT_SIZE) => {
//   // Return array of coords making a square polygon around (lat, lng)
//   return [
//     {latitude: latitude + size, longitude: longitude - size},
//     {latitude: latitude + size, longitude: longitude + size},
//     {latitude: latitude - size, longitude: longitude + size},
//     {latitude: latitude - size, longitude: longitude - size},
//   ];
// };

// // Point in Polygon checker (Ray casting algorithm)
// const isOutsidePolygon = (point, polygon) => {
//   let x = point.latitude;
//   let y = point.longitude;
//   let inside = false;

//   for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
//     const xi = polygon[i].latitude,
//       yi = polygon[i].longitude;
//     const xj = polygon[j].latitude,
//       yj = polygon[j].longitude;

//     const intersect =
//       yi > y !== yj > y &&
//       x < ((xj - xi) * (y - yi)) / (yj - yi + 0.0000001) + xi;
//     if (intersect) inside = !inside;
//   }
//   return !inside;
// };

// const ParkingMap = ({parkingYards, single, vin, zoomIn}) => {
//   const mapRef = useRef(null);
//   const [visibleCallouts, setVisibleCallouts] = useState([]);
//   const [yards, setYards] = useState(parkingYards);
//   const [carPosition, setCarPosition] = useState(null); // Current position of moving car
//   const [isMoving, setIsMoving] = useState(null); // Current position of moving car

//   // car moving logic
//   const [yardData, setYardData] = useState(parkingYards);
//   const [isCarMoving, setIsCarMoving] = useState(true);

//   // const [animatedCoord] = useState(
//   //   new AnimatedRegion({
//   //     latitude: 30.71106,
//   //     longitude: 76.6921,
//   //     latitudeDelta: 0.0001,
//   //     longitudeDelta: 0.0001,
//   //   }),
//   // );

//   const animatedCoord = useRef(
//     new AnimatedRegion({
//       latitude: yardData[0].cars[0].latitude,
//       longitude: yardData[0].cars[0].longitude,
//       latitudeDelta: 0.0001,
//       longitudeDelta: 0.0001,
//     }),
//   ).current;

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       const toCoord = {
//         latitude: yardData[0].cars[3].latitude,
//         longitude: yardData[0].cars[3].longitude,
//       };

//       animatedCoord
//         .timing({
//           ...toCoord,
//           duration: 10000,
//           useNativeDriver: false,
//         })
//         .start(() => {
//           // Animation complete => update visibility
//           setYardData(prev => {
//             const updated = [...prev];
//             updated[0].cars = updated[0].cars.map(car => {
//               if (car.id === '1') return {...car, show: false};
//               if (car.id === '4') return {...car, show: true};
//               return car;
//             });
//             return updated;
//           });
//           // ✅ SHOW ALERT
//           Alert.alert("Vehicle Relocated", "Car 1 has arrived at its designated Slot 4.");
//           setIsCarMoving(false);
//         });
//     }, 15000);

//     return () => clearTimeout(timeout);
//   }, []);


//   // slot logic
//   const slot1 = parkingYards[0]?.cars?.find(c => c.id === '1-1');
//   const slot18 = parkingYards[0]?.cars?.find(c => c.id === '1-18');

//   useEffect(() => {
//     if (!slot1 || !slot18) return;

//     setCarPosition({latitude: slot1.latitude, longitude: slot1.longitude}); // Start from slot 1

//     // Animate car movement from slot1 to slot18
//     let steps = 50; // How smooth animation will be
//     let currentStep = 0;

//     const latDiff = (slot18.latitude - slot1.latitude) / steps;
//     const longDiff = (slot18.longitude - slot1.longitude) / steps;

//     setIsMoving(true);
//     const interval = setInterval(() => {
//       currentStep++;
//       setCarPosition(prev => {
//         if (!prev) return prev;
//         const newLat = prev.latitude + latDiff;
//         const newLong = prev.longitude + longDiff;
//         return {latitude: newLat, longitude: newLong};
//       });

//       if (currentStep >= steps) {
//         clearInterval(interval);
//         setIsMoving(false);
//         {
//           !single && Alert.alert('Alert', 'Car-1 has reached slot 18!');
//         }
//       }
//     }, 100); // Update every 100ms

//     return () => clearInterval(interval);
//   }, [parkingYards]);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       const ids = parkingYards?.map(yard => yard.id);
//       setVisibleCallouts(ids);
//     }, 1000);
//     return () => clearTimeout(timeout);
//   }, [parkingYards]);

//   useEffect(() => {
//     if (zoomIn) {
//       if (mapRef.current) {
//         const center = parkingYards[0]?.center;
//         mapRef.current.animateToRegion(
//           {
//             latitude: center?.latitude,
//             longitude: center?.longitude,
//             latitudeDelta: 0.05,
//             longitudeDelta: 0.05,
//           },
//           1000,
//         );
//         setTimeout(() => {
//           mapRef.current.animateToRegion(
//             {
//               latitude: center?.latitude,
//               longitude: center?.longitude,
//               latitudeDelta: 0.02,
//               longitudeDelta: 0.02,
//             },
//             1000,
//           );
//         }, 500);
//         setTimeout(() => {
//           mapRef.current.animateToRegion(
//             {
//               latitude: center?.latitude,
//               longitude: center?.longitude,
//               latitudeDelta: 0.005,
//               longitudeDelta: 0.005,
//             },
//             1000,
//           );
//         }, 1000);
//         setTimeout(() => {
//           mapRef.current.animateToRegion(
//             {
//               latitude: center?.latitude,
//               longitude: center?.longitude,
//               latitudeDelta: 0.005,
//               longitudeDelta: 0.005,
//             },
//             1000,
//           );
//         }, 1500);
//       }
//     }
//   }, []);

//   const moveCarOutsidePolygon = () => {
//     if (!carPosition || !yards[0]) return;

//     const steps = 100;
//     const moveLat = 0.00095; // increase to move faster
//     const moveLng = 0.00095;
//     let currentStep = 0;

//     const interval = setInterval(() => {
//       currentStep++;
//       setCarPosition(prev => {
//         if (!prev) return prev;
//         const newLat = prev.latitude + moveLat / steps;
//         const newLng = prev.longitude + moveLng / steps;
//         const newPos = {latitude: newLat, longitude: newLng};
//         // Create polygon boundary
//         const yard = yards[0];
//         const polygonCoords = [
//           {
//             latitude: yard?.center?.latitude + yard.radius / 111000,
//             longitude:
//               yard?.center?.longitude -
//               yard?.radius /
//                 (111000 * Math.cos(yard.center.latitude * (Math.PI / 180))),
//           },
//           {
//             latitude: yard.center.latitude + yard.radius / 111000,
//             longitude:
//               yard.center.longitude +
//               yard.radius /
//                 (111000 * Math.cos(yard.center.latitude * (Math.PI / 180))),
//           },
//           {
//             latitude: yard.center.latitude - yard.radius / 111000,
//             longitude:
//               yard.center.longitude +
//               yard.radius /
//                 (111000 * Math.cos(yard.center.latitude * (Math.PI / 180))),
//           },
//           {
//             latitude: yard.center.latitude - yard.radius / 111000,
//             longitude:
//               yard.center.longitude -
//               yard.radius /
//                 (111000 * Math.cos(yard.center.latitude * (Math.PI / 180))),
//           },
//         ];

//         const isOut = isOutsidePolygon(newPos, polygonCoords);
//         if (isOut && !single) {
//           clearInterval(interval);
//           Alert.alert('Alert', 'Car no. 10 has exited from Parking Yard 1!');
//         }

//         return newPos;
//       });

//       if (currentStep >= steps) {
//         clearInterval(interval);
//       }
//     }, 100);
//   };

//   return (
//     <>
//       <MapView
//         ref={mapRef}
//         style={{flex: 1}}
//         initialRegion={{
//           latitude: parkingYards[0]?.center?.latitude,
//           longitude: parkingYards[0]?.center?.longitude,
//           latitudeDelta: 0.02,
//           longitudeDelta: 0.02,
//         }}>
//         {yards?.map(yard => (
//           <View key={yard.id}>
//             <View
//               style={{
//                 width: 100,
//                 height: 100,
//                 border: 2,
//                 borderBlockColor: 'red',
//               }}></View>
//             <Polygon
//               coordinates={[
//                 {
//                   latitude: yard.center.latitude + yard.radius / 111000,
//                   longitude:
//                     yard.center.longitude -
//                     yard.radius /
//                       (111000 *
//                         Math.cos(yard.center.latitude * (Math.PI / 180))),
//                 },
//                 {
//                   latitude: yard.center.latitude + yard.radius / 111000,
//                   longitude:
//                     yard.center.longitude +
//                     yard.radius /
//                       (111000 *
//                         Math.cos(yard.center.latitude * (Math.PI / 180))),
//                 },
//                 {
//                   latitude: yard.center.latitude - yard.radius / 111000,
//                   longitude:
//                     yard.center.longitude +
//                     yard.radius /
//                       (111000 *
//                         Math.cos(yard.center.latitude * (Math.PI / 180))),
//                 },
//                 {
//                   latitude: yard.center.latitude - yard.radius / 111000,
//                   longitude:
//                     yard.center.longitude -
//                     yard.radius /
//                       (111000 *
//                         Math.cos(yard.center.latitude * (Math.PI / 180))),
//                 },
//               ]}
//               // coordinates={[
//               //   {latitude: 30.70945704315396, longitude: 76.68974278587228},
//               //   {latitude: 30.709149839557938, longitude: 76.68997210378666},
//               //   {latitude: 30.711048067019902, longitude: 76.69308122807507},
//               //   {latitude: 30.711396529839035, longitude:  76.69281991231071},
//               //   {latitude: 30.70946960528984, longitude:  76.68974057274954},
//               // ]}
//               strokeColor="red"
//               fillColor="rgba(0, 0, 255, 0.1)"
//               strokeWidth={1}
//             />

//             {single && (
//               <Marker coordinate={yard.center}>
//                 <View>
//                   <Icon name="map-marker" size={30} color="red" />
//                   {visibleCallouts?.includes(yard?.id) && (
//                     <View style={styles.customCallout}>
//                       <Text>{yard?.name}</Text>
//                     </View>
//                   )}
//                 </View>
//               </Marker>
//             )}

//             {isCarMoving && (
//               <Marker.Animated coordinate={animatedCoord}>
//                 <Icon name="car" size={14} color="#000" />
//               </Marker.Animated>
//             )}

//             {yardData?.cars?.map((car, index) => {
//               if (car.id === '1-1') return null;

//               const slotCoords = getSlotPolygon(car.latitude, car.longitude);

//               return (
//                 <React.Fragment key={car.id}>
//                   {/* Show only when car.show is true and it's not moving */}
//                   {car.show && (!isCarMoving || car.id !== '1') && (
//                     <Marker
//                       coordinate={{
//                         latitude: car.latitude,
//                         longitude: car.longitude,
//                       }}>
//                       <Icon name="car" size={12} color="#000" />
//                     </Marker>
//                   )}

//                   {/* Polygon */}
//                   <Polygon
//                     coordinates={slotCoords}
//                     strokeColor="#008000"
//                     strokeWidth={2}
//                     fillColor="rgba(0, 128, 0, 0.1)"
//                   />

//                   {/* Slot Number */}
//                   <Marker
//                     coordinate={{
//                       latitude: car.latitude,
//                       longitude: car.longitude,
//                     }}
//                     anchor={{x: 0.5, y: 0.5}}
//                     tracksViewChanges={false}>
//                     <View
//                       style={{
//                         borderRadius: 12,
//                         paddingHorizontal: 6,
//                         paddingTop: 10,
//                       }}>
//                       <Text
//                         style={{
//                           color: 'red',
//                           fontWeight: 'bold',
//                           fontSize: 14,
//                         }}>
//                         {index + 1}
//                       </Text>
//                     </View>
//                   </Marker>
//                 </React.Fragment>
//               );
//             })}

//             {/* Moving Car 1 Marker */}
//             {carPosition && (
//               <Marker
//                 coordinate={carPosition}
//                 title="Moving Car"
//                 description="Car 1">
//                 <Icon name="car" size={16} color="#000" />
//               </Marker>
//             )}
//           </View>
//         ))}
//       </MapView>

//       {/* Exit Button */}
//       {!single && (
//         <View
//           style={{
//             position: 'absolute',
//             bottom: 20,
//             alignSelf: 'center',
//             backgroundColor: 'blue',
//             borderRadius: 10,
//           }}>
//           <Button
//             title="Move Car Outside The Parking Yard"
//             color={'#fff'}
//             onPress={moveCarOutsidePolygon}
//           />
//         </View>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   moveButton: {
//     position: 'absolute',
//     bottom: 20,
//     alignSelf: 'center',
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//   },
//   customCallout: {
//     position: 'absolute',
//     bottom: 40,
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 5,
//     borderWidth: 1,
//     width: 120,
//     borderColor: '#ddd',
//     elevation: 5,
//   },
// });

// export default ParkingMap;
