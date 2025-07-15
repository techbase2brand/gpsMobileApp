import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { INTRO_3 } from '../../assests/images';

const { width, height } = Dimensions.get('window');

const MoodDiaryView = ({ animationController }) => {
  return (
    <View style={styles.container}>
      <Image
        source={INTRO_3} // replace with your image
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Easy Track</Text>
      <Text style={styles.subtitle}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
    </View>
  );
};

export default MoodDiaryView;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.7,
    height: height * 0.4,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#130057',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});
