// ParkingYardScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {IMAGE_BACKGROUND_IMAGE} from '../assests/images';
import {parkingYards} from '../constants/Constants';

const {width} = Dimensions.get('window');

const ParkingYardScreen = ({navigation}) => {
  const [selectedYard, setSelectedYard] = useState(null);

  const renderItem = ({item}) => {
    const isSelected = item?.id === selectedYard;

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => {
          setSelectedYard(item?.id),
            navigation.navigate('YardDetailsScreen', {isSelected: item?.id});
        }}>
        <Text style={[styles.name, isSelected && styles.selectedText]}>
          {item?.name}
        </Text>
        <Text style={[styles.address, isSelected && styles.selectedText]}>
          {item?.address}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={IMAGE_BACKGROUND_IMAGE}
        resizeMode="cover">
        <View style={styles.container}>
          <Text style={styles.title}>Parking Yard</Text>
          <FlatList
            data={parkingYards}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    // backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: (width - 48) / 2,
    borderWidth: 1,
    borderColor: '#FFCDD2',
    borderRadius: 10,
    padding: 12,
    paddingVertical: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCard: {
    backgroundColor: '#FFEBEB',
    borderColor: '#FF3B30',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#252837',
    marginBottom: 4,
    textAlign: 'center',
  },
  address: {
    fontSize: 13,
    color: '#252837',
    textAlign: 'center',
  },
  selectedText: {
    color: '#FF3B30',
  },
});

export default ParkingYardScreen;
