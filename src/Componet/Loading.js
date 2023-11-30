import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

const CircularProgress = ({size = 100, strokeWidth = 10}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 360,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ).start();
  }, []);

  const radius = (size - strokeWidth) / 2;

  return (
    <View style={styles.container}>
      <Svg height={size} width={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#BB9CC0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#67729D"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={'50 310'}
          strokeDashoffset={animatedValue}
        />
      </Svg>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CircularProgress;
