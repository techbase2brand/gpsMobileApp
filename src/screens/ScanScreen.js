import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ScanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Options</Text>

      <TouchableOpacity style={styles.button}>
        <Ionicons name="car-sport" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Scan VIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Ionicons name="barcode" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Scan Tracker Chip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#613EEA',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,

    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: 'bold',
  },
  icon: {},
});
