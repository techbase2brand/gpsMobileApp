import React, { useEffect, useRef } from 'react';
import { View, Image, Text } from 'react-native';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

const ParkingMap = ({ parkingYards, single, vin }) => {
  // const markerRef = useRef(null);
  const markerRefs = useRef({});
  const mapRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      Object.values(markerRefs.current).forEach(ref => {
        if (ref?.showCallout) {
          ref.showCallout();
        }
      });
    }, 1000);
  }, []);

  useEffect(() => {
    // if (zoomIn) {
    if (mapRef.current) {
      const center = parkingYards[0].center;

      // Zoom 1
      mapRef.current.animateToRegion(
        {
          latitude: center.latitude,
          longitude: center.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000,
      );

      // Zoom 2 after 1 second
      setTimeout(() => {
        mapRef.current.animateToRegion(
          {
            latitude: center.latitude,
            longitude: center.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          },
          1000,
        );
      }, 500);

      // Zoom 3 after 2 seconds
      setTimeout(() => {
        mapRef.current.animateToRegion(
          {
            latitude: center.latitude,
            longitude: center.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          },
          1000,
        );
      }, 1000);

      // Zoom 4 after 3 seconds
      setTimeout(() => {
        mapRef.current.animateToRegion(
          {
            latitude: center.latitude,
            longitude: center.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          },
          1000,
        );
      }, 1500);
      // }
    }
  }, []);

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      initialRegion={{
        latitude: parkingYards[0].center.latitude,
        longitude: parkingYards[0].center.longitude,
        // latitude: 37.78925,
        // longitude: -122.4324,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}>
      {parkingYards?.map(yard => (
        <View key={yard.id}>
          <Circle
            center={yard.center}
            radius={yard.radius}
            strokeColor="red"
            fillColor="rgba(0, 0, 255, 0.1)"
          />

          {/* Red marker at center with Callout */}
          {!single && <Marker
            coordinate={yard.center}
            pinColor="red"
            ref={ref => {
              if (ref) markerRefs.current[yard.id] = ref;
            }}>
            <Callout>
              <Text>{yard.name}</Text>
            </Callout>
          </Marker>}

          {/* Static cars */}
          {yard?.cars?.map(car => (
            <Marker
              key={car.id}
              coordinate={{ latitude: car.latitude, longitude: car.longitude }}
              title={single ? 'Parking Yard 1' : ''}
              description={single ? vin : ""}

            >
              <Icon name="car" size={20} color="#000" />
            </Marker>
          ))}
        </View>
      ))}
    </MapView>
  );
};

export default ParkingMap;