
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
// } from 'react-native-reanimated';
// import RelaxView from '../components/introComponents/RelaxView';
// import CareView from '../components/introComponents/CareView';
// import MoodDiaryView from '../components/introComponents/MoodDiaryView';
// import DotIndicator from '../components/DotIndicator';

// const { height } = Dimensions.get('window');

// const IntroductionAnimationScreen = ({ navigation }) => {
//   const totalSteps = 3;
//   const [currentStep, setCurrentStep] = useState(0);
//   const translateY = useSharedValue(0);

//   const goToStep = (stepIndex) => {
//     setCurrentStep(stepIndex);
//     translateY.value = withTiming(-height * stepIndex, { duration: 500 });
//   };

//   const onNextClick = () => {
//     if (currentStep < totalSteps - 1) {
//       goToStep(currentStep + 1);
//     } else {
//       navigation.goBack(); // Replace with your home navigation
//     }
//   };

//   const onSkipClick = () => {
//     goToStep(totalSteps - 1);
//   };

//   const animatedStyles = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateY: translateY.value }],
//     };
//   });

//   return (
//     <View style={styles.container}>
//       <Animated.View style={[styles.slidesContainer, animatedStyles]}>
//         <View style={styles.slide}><RelaxView /></View>
//         <View style={styles.slide}><CareView /></View>
//         <View style={styles.slide}><MoodDiaryView /></View>
//       </Animated.View>

//       <DotIndicator totalSteps={totalSteps} currentStep={currentStep} />

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity onPress={onSkipClick}>
//           <Text style={styles.skip}>SKIP</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={onNextClick} style={styles.nextButton}>
//           <Text style={styles.next}>NEXT</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default IntroductionAnimationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   slidesContainer: {
//     flexDirection: 'column',
//     height: height * 3, // total steps * screen height
//   },
//   slide: {
//     height: height,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 50,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     paddingHorizontal: 30,
//     alignItems: 'center',
//   },
//   skip: {
//     fontSize: 16,
//     color: '#888',
//   },
//   nextButton: {
//     backgroundColor: '#5F93FB',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//   },
//   next: {
//     color: '#FFF',
//     fontWeight: '600',
//   },
// });



import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import RelaxView from '../components/introComponents/RelaxView';
import CareView from '../components/introComponents/CareView';
import MoodDiaryView from '../components/introComponents/MoodDiaryView';
import DotIndicator from '../components/DotIndicator';


const { height, width } = Dimensions.get('window');

const IntroductionAnimationScreen = ({ navigation }) => {
  const totalSteps = 3;
  const [currentStep, setCurrentStep] = useState(0);

  const firstTranslateY = useSharedValue(-height); // top to center
  const secondTranslateX = useSharedValue(width); // right to center
  const thirdTranslateX = useSharedValue(width); // right to center

  useEffect(() => {
    // Animate first screen in on mount
    firstTranslateY.value = withTiming(0, { duration: 600 });
  }, []);

  const onNextClick = () => {
    if (currentStep === 0) {
      // Animate second screen in
      secondTranslateX.value = withTiming(0, { duration: 600 });
      setCurrentStep(1);
    } else if (currentStep === 1) {
      // Animate third screen in
      thirdTranslateX.value = withTiming(0, { duration: 600 });
      setCurrentStep(2);
    } else {
      navigation.navigate("Login"); // Replace with home navigation
    }
  };

  const onSkipClick = () => {
    // Directly show third screen
    thirdTranslateX.value = withTiming(0, { duration: 1000 });
    // setCurrentStep(2);
    navigation.navigate("Login")

  };

  const firstStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: firstTranslateY.value }],
  }));

  const secondStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: secondTranslateX.value }],
  }));

  const thirdStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: thirdTranslateX.value }],
  }));

  return (
    <View style={styles.container}>
      {currentStep === 0 && (
        <Animated.View style={[styles.slide, firstStyle]}>
          <RelaxView />
        </Animated.View>
      )}

      {currentStep === 1 && (
        <Animated.View style={[styles.slide, secondStyle]}>
          <CareView />
        </Animated.View>
      )}

      {currentStep === 2 && (
        <Animated.View style={[styles.slide, thirdStyle]}>
          <MoodDiaryView />
        </Animated.View>
      )}
<View style={{ width:"100%" , position:"absolute", bottom:50}}>

      <DotIndicator totalSteps={totalSteps} currentStep={currentStep} />
</View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onSkipClick}>
          <Text style={styles.skip}>SKIP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNextClick} style={styles.nextButton}>
          <Text style={styles.next}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IntroductionAnimationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  skip: {
    fontSize: 16,
    color: '#888',
  },
  nextButton: {
    backgroundColor: '#613EEA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  next: {
    color: '#FFF',
    fontWeight: '600',
  },
});