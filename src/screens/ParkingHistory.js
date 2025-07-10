import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ParkingHistory({navigation}) {
  const data = [
    {
      id: '1',
      name: 'Amanda Chase',
      uniqueId: 'CPA-0129',
      space: 'Space 4c',
      checkIn: '11:00 am',
      checkOut: '05:00 pm',
      date: '02/09/2019',
    },
    {
      id: '2',
      name: 'Amanda Chase',
      uniqueId: 'CPA-0129',
      space: 'Space 4c',
      checkIn: '1:00 pm',
      checkOut: '05:00 pm',
      date: '02/09/2019',
    },
    {
      id: '3',
      name: 'Amanda Chase',
      uniqueId: 'CPA-0129',
      space: 'Space 4c',
      checkIn: '8:00 pm',
      checkOut: '05:00 pm',
      date: '02/09/2019',
    },
  ];

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.space}>{item.space}</Text>
      </View>

      <Text style={styles.uniqueId}>
        Unique ID: <Text style={{color: 'blue'}}>{item.uniqueId}</Text>
      </Text>

      <View style={styles.rowBetween}>
        <Text>Time:</Text>
        <Text style={styles.time}>{item.checkIn}</Text>
      </View>

      {/* <View style={styles.rowBetween}>
        <Text> Time (Est):</Text>
        <Text style={styles.time}>{item.checkOut}</Text>
      </View> */}

      <View style={styles.rowBetween}>
        <Text>Date:</Text>
        <Text style={styles.time}>{item.date}</Text>
      </View>
      <View style={{alignSelf: 'flex-end'}}>
        <Text style={styles.time}>Edit By:</Text>
        <Text>Mark Evans</Text>
      </View>

      <TouchableOpacity
        style={[styles.qrBtn, {position: 'absolute', bottom: -20}]}>
        <Ionicons name="qr-code" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="black" />
        <Text style={styles.headerTitle}>History</Text>
        <Ionicons name="person-circle" size={32} color="black" />
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{padding: 16}}
      />

      {/* <TouchableOpacity
        style={[styles.backBtn,{position:}]}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Go Back to Home Screen
        </Text>
      </TouchableOpacity> */}
    </SafeAreaView>
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
  headerTitle: {fontWeight: 'bold', fontSize: 16},
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 40,
    // height:200,

    // Shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    position: 'relative',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {fontWeight: 'bold', fontSize: 16},
  space: {color: 'gray'},
  uniqueId: {marginBottom: 8, marginTop: 4},
  time: {fontWeight: 'bold'},
  qrBtn: {
    backgroundColor: '#613EEA',
    borderRadius: 24,
    padding: 10,
    alignSelf: 'center',
    marginTop: 10,

    // Shadow for QR button
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  backBtn: {
    backgroundColor: 'purple',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
});
