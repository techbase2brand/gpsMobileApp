import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {heightPercentageToDP} from '../utils';
import ParkingMap from '../components/ParkingMap';
import {parkingYard, parkingYards} from '../constants/Constants';

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
    id: '15',
    vin: 'VIN-1000015',
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
    id: '22',
    vin: 'VIN-1000022',
    parkingYard: 1,
  },

  {
    id: '24',
    vin: 'VIN-1000024',
    parkingYard: 1,
  },
  {
    id: '25',
    vin: 'VIN-1000025',
    parkingYard: 1,
  },

  {
    id: '27',
    vin: 'VIN-1000027',
    parkingYard: 1,
  },
  {
    id: '28',
    vin: 'VIN-1000028',
    parkingYard: 1,
  },
  {
    id: '29',
    vin: 'VIN-1000029',
    parkingYard: 1,
  },
  {
    id: '30',
    vin: 'VIN-1000030',
    parkingYard: 1,
  },

  {
    id: '32',
    vin: 'VIN-1000032',
    parkingYard: 1,
  },
  {
    id: '36',
    vin: 'VIN-1000036',
    parkingYard: 1,
  },
  {
    id: '37',
    vin: 'VIN-1000037',
    parkingYard: 2,
  },
  {
    id: '38',
    vin: 'VIN-1000038',
    parkingYard: 2,
  },
  {
    id: '39',
    vin: 'VIN-1000039',
    parkingYard: 2,
  },

  {
    id: '41',
    vin: 'VIN-1000041',
    parkingYard: 2,
  },

  {
    id: '43',
    vin: 'VIN-1000043',
    parkingYard: 2,
  },
  {
    id: '44',
    vin: 'VIN-1000044',
    parkingYard: 2,
  },
  {
    id: '45',
    vin: 'VIN-1000045',
    parkingYard: 2,
  },

  {
    id: '47',
    vin: 'VIN-1000047',
    parkingYard: 2,
  },
  {
    id: '48',
    vin: 'VIN-1000048',
    parkingYard: 2,
  },
  {
    id: '49',
    vin: 'VIN-1000049',
    parkingYard: 2,
  },
  {
    id: '50',
    vin: 'VIN-1000050',
    parkingYard: 2,
  },

  {
    id: '55',
    vin: 'VIN-1000055',
    parkingYard: 2,
  },

  {
    id: '57',
    vin: 'VIN-1000057',
    parkingYard: 2,
  },

  {
    id: '59',
    vin: 'VIN-1000059',
    parkingYard: 2,
  },
  {
    id: '60',
    vin: 'VIN-1000060',
    parkingYard: 2,
  },
  {
    id: '61',
    vin: 'VIN-1000061',
    parkingYard: 2,
  },

  {
    id: '63',
    vin: 'VIN-1000063',
    parkingYard: 2,
  },
  {
    id: '64',
    vin: 'VIN-1000064',
    parkingYard: 2,
  },
  {
    id: '65',
    vin: 'VIN-1000065',
    parkingYard: 2,
  },
  {
    id: '66',
    vin: 'VIN-1000066',
    parkingYard: 2,
  },

  {
    id: '69',
    vin: 'VIN-1000069',
    parkingYard: 2,
  },
  {
    id: '70',
    vin: 'VIN-1000070',
    parkingYard: 2,
  },
  {
    id: '71',
    vin: 'VIN-1000071',
    parkingYard: 2,
  },
  {
    id: '72',
    vin: 'VIN-1000072',
    parkingYard: 2,
  },
  {
    id: '73',
    vin: 'VIN-1000073',
    parkingYard: 2,
  },
  {
    id: '74',
    vin: 'VIN-1000074',
    parkingYard: 2,
  },
  {
    id: '75',
    vin: 'VIN-1000075',
    parkingYard: 2,
  },
  {
    id: '76',
    vin: 'VIN-1000076',
    parkingYard: 2,
  },
  {
    id: '77',
    vin: 'VIN-1000077',
    parkingYard: 2,
  },
  {
    id: '78',
    vin: 'VIN-1000078',
    parkingYard: 2,
  },
  {
    id: '79',
    vin: 'VIN-1000079',
    parkingYard: 2,
  },
  {
    id: '80',
    vin: 'VIN-1000080',
    parkingYard: 2,
  },
  {
    id: '81',
    vin: 'VIN-1000081',
    parkingYard: 2,
  },
  {
    id: '82',
    vin: 'VIN-1000082',
    parkingYard: 2,
  },
  {
    id: '83',
    vin: 'VIN-1000083',
    parkingYard: 2,
  },

  {
    id: '85',
    vin: 'VIN-1000085',
    parkingYard: 2,
  },

  {
    id: '88',
    vin: 'VIN-1000088',
    parkingYard: 2,
  },

  {
    id: '91',
    vin: 'VIN-1000091',
    parkingYard: 2,
  },
  {
    id: '92',
    vin: 'VIN-1000092',
    parkingYard: 2,
  },

  {
    id: '94',
    vin: 'VIN-1000094',
    parkingYard: 2,
  },
  {
    id: '95',
    vin: 'VIN-1000095',
    parkingYard: 2,
  },

  {
    id: '99',
    vin: 'VIN-1000099',
    parkingYard: 2,
  },
  {
    id: '100',
    vin: 'VIN-10000100',
    parkingYard: 2,
  },

  {
    id: '103',
    vin: 'VIN-10000103',
    parkingYard: 2,
  },
  {
    id: '104',
    vin: 'VIN-10000104',
    parkingYard: 2,
  },

  {
    id: '108',
    vin: 'VIN-10000108',
    parkingYard: 2,
  },
  {
    id: '109',
    vin: 'VIN-10000109',
    parkingYard: 2,
  },

  {
    id: '111',
    vin: 'VIN-10000111',
    parkingYard: 2,
  },
  {
    id: '112',
    vin: 'VIN-10000112',
    parkingYard: 2,
  },

  {
    id: '116',
    vin: 'VIN-10000116',
    parkingYard: 2,
  },
  {
    id: '117',
    vin: 'VIN-10000117',
    parkingYard: 2,
  },

  {
    id: '120',
    vin: 'VIN-10000120',
    parkingYard: 2,
  },
  {
    id: '121',
    vin: 'VIN-10000121',
    parkingYard: 2,
  },

  {
    id: '125',
    vin: 'VIN-10000125',
    parkingYard: 3,
  },
  {
    id: '126',
    vin: 'VIN-10000126',
    parkingYard: 3,
  },
  {
    id: '127',
    vin: 'VIN-10000127',
    parkingYard: 3,
  },
  {
    id: '128',
    vin: 'VIN-10000128',
    parkingYard: 3,
  },
  {
    id: '129',
    vin: 'VIN-10000129',
    parkingYard: 3,
  },
  {
    id: '130',
    vin: 'VIN-10000130',
    parkingYard: 3,
  },
  {
    id: '131',
    vin: 'VIN-10000131',
    parkingYard: 3,
  },
  {
    id: '132',
    vin: 'VIN-10000132',
    parkingYard: 3,
  },
  {
    id: '133',
    vin: 'VIN-10000133',
    parkingYard: 3,
  },
  {
    id: '134',
    vin: 'VIN-10000134',
    parkingYard: 3,
  },
  {
    id: '135',
    vin: 'VIN-10000135',
    parkingYard: 3,
  },
  {
    id: '136',
    vin: 'VIN-10000136',
    parkingYard: 3,
  },
  {
    id: '137',
    vin: 'VIN-10000137',
    parkingYard: 3,
  },
  {
    id: '138',
    vin: 'VIN-10000138',
    parkingYard: 3,
  },

  {
    id: '141',
    vin: 'VIN-10000141',
    parkingYard: 3,
  },
  {
    id: '142',
    vin: 'VIN-10000142',
    parkingYard: 3,
  },

  {
    id: '145',
    vin: 'VIN-10000145',
    parkingYard: 3,
  },
  {
    id: '146',
    vin: 'VIN-10000146',
    parkingYard: 3,
  },
  {
    id: '147',
    vin: 'VIN-10000147',
    parkingYard: 3,
  },
  {
    id: '148',
    vin: 'VIN-10000148',
    parkingYard: 3,
  },

  {
    id: '151',
    vin: 'VIN-10000151',
    parkingYard: 3,
  },

  {
    id: '153',
    vin: 'VIN-10000153',
    parkingYard: 3,
  },
  {
    id: '154',
    vin: 'VIN-10000154',
    parkingYard: 3,
  },

  {
    id: '156',
    vin: 'VIN-10000156',
    parkingYard: 3,
  },

  {
    id: '158',
    vin: 'VIN-10000158',
    parkingYard: 3,
  },
  {
    id: '159',
    vin: 'VIN-10000159',
    parkingYard: 3,
  },
  {
    id: '160',
    vin: 'VIN-10000160',
    parkingYard: 3,
  },

  {
    id: '162',
    vin: 'VIN-10000162',
    parkingYard: 3,
  },
  {
    id: '163',
    vin: 'VIN-10000163',
    parkingYard: 3,
  },

  {
    id: '165',
    vin: 'VIN-10000165',
    parkingYard: 3,
  },

  {
    id: '167',
    vin: 'VIN-10000167',
    parkingYard: 3,
  },
  {
    id: '168',
    vin: 'VIN-10000168',
    parkingYard: 3,
  },
];
const YardDetailsScreen = ({navigation}) => {
    const [selectedCar, setSelectedCar] = useState(null);

    const handleVinPress = (item) => {
      setSelectedCar(item); 
    };
  const renderItem = ({item, index}) => {
    const isEven = index % 2 === 0;
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          {backgroundColor: isEven ? '#F9F9F9' : '#FFFFFF'},
        ]}
        onPress={() => handleVinPress(item)}
        // onPress={
        //   () => 
        //     navigation.navigate('ParkingDetailsScreen', {
        //       vin: item.vin,
        //       yard: item.yard,
        //     }) }
        >
        <View style={styles.row}>
          <Text style={styles.vinLabel}>{item.vin}</Text>
          <Text style={styles.quantity}>{item.parkingYard}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.wrapper}>
        <View style={{height: heightPercentageToDP(40)}}>
          <ParkingMap parkingYards={parkingYards} zoomIn={true} selectedCar={selectedCar} />
        </View>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>VIN List</Text>
          <Text style={[styles.headerText, {alignItems: 'flex-end'}]}>
            Parking Yard 
          </Text>
        </View>
        <FlatList
          data={vinList}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 20}}
        />
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F3F3F3',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    textAlign: 'left',
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
  quantity: {
    color: '#000',
    fontWeight: '500',
    fontSize: 15,
    flex: 1,
    textAlign: 'right',
  },
});
