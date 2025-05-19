import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP } from '../utils';
import ParkingMap from '../components/ParkingMap';
import { parkingYard } from '../constants/Constants';

const YardDetailsScreen = ({ navigation }) => {

    const vinList = [
        { id: '1', vin: '5YJSA3DS*EF', yard: 1 },
        { id: '2', vin: '5YJSA3DS*EF', yard: 2 },
        { id: '3', vin: '5YJSA3DS*EF', yard: 3 },
        { id: '4', vin: '5YJSA3DS*EF', yard: 5 },
        { id: '5', vin: '5YJSA3DS*EF', yard: 6 },
        { id: '6', vin: '5YJSA3DS*EF', yard: 7 },
        { id: '7', vin: '5YJSA3DS*EF', yard: 8 },
    ];

    const renderItem = ({ item, index }) => {
        const isEven = index % 2 === 0;
        return (
            <TouchableOpacity
                style={[
                    styles.itemContainer,
                    { backgroundColor: isEven ? '#F9F9F9' : '#FFFFFF' },
                ]}
                onPress={() => navigation.navigate("ParkingDetailsScreen", {
                    vin: item.vin,
                    yard: item.yard
                })}
            >
                <View style={styles.row}>
                    <Text style={styles.vinLabel}>{item.vin}</Text>
                    <Text style={styles.quantity}>{item.yard}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.wrapper}>
                <View style={{ height: heightPercentageToDP(40) }}>
                    <ParkingMap parkingYards={parkingYard} zoomIn={true} />
                </View>
                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>VIN List</Text>
                    <Text style={[styles.headerText, { alignItems: "flex-end" }]}>Parking Yard</Text>
                </View>
                <FlatList
                    data={vinList}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
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
