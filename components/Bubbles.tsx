import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";

interface BubbleProps {
  imageSource?: ImageSourcePropType; // Optional image source
  initialPosition: { x: number; y: number };
  animationConfig: {
    amplitudeX: number;
    durationX: number;
    amplitudeY: number;
    durationY: number;
    maxScale?: number; // Optional scaling
    scaleDuration?: number;
    minOpacity?: number; // Optional opacity change
    opacityDuration?: number;
  };
  size?: number; // Optional size for the bubble
  style?: any; // Optional additional styles
}

const Bubbles: React.FC<BubbleProps> = ({
  imageSource,
  initialPosition,
  animationConfig,
  size = 50,
  style: extraStyle,
}) => {
  const baseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(baseAnim, {
        toValue: 1,
        duration: Math.max(
          animationConfig.durationX,
          animationConfig.durationY
        ), // Sync durations
        easing: Easing.inOut(Easing.ease), // Smooth easing for natural motion
        useNativeDriver: true,
      })
    ).start();
  }, [baseAnim, animationConfig]);

  // Use sine waves to simulate smooth, continuous movement
  const translateX = baseAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      initialPosition.x -
        animationConfig.amplitudeX * Math.sin(Math.random() * Math.PI), // Randomize amplitude and direction
      initialPosition.x +
        animationConfig.amplitudeX * Math.sin(Math.random() * Math.PI), // Add randomness in direction
      initialPosition.x -
        animationConfig.amplitudeX * Math.sin(Math.random() * Math.PI), // Back to random direction
    ],
  });

  // Same logic for Y, but ensuring more natural up/down movement
  const translateY = baseAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      initialPosition.y -
        animationConfig.amplitudeY * Math.sin(Math.random() * Math.PI), // Randomized oscillation for Y
      initialPosition.y +
        animationConfig.amplitudeY * Math.sin(Math.random() * Math.PI),
      initialPosition.y -
        animationConfig.amplitudeY * Math.sin(Math.random() * Math.PI),
    ],
  });

  // Optional scaling for the bubble (subtle, gradual change)
  const scale = animationConfig.maxScale
    ? baseAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, animationConfig.maxScale || 1.05, 1],
      })
    : 1;

  // Optional opacity change
  const opacity = animationConfig.minOpacity
    ? baseAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, animationConfig.minOpacity || 0.8, 1],
      })
    : 1;

  const animatedStyle = {
    transform: [{ translateX }, { translateY }, { scale }],
    opacity,
    position: "absolute",
    width: size,
    height: size,
  };

  return imageSource ? (
    <Animated.Image
      source={imageSource}
      style={[styles.bubble, animatedStyle, extraStyle]}
    />
  ) : (
    <Animated.View
      style={[
        styles.bubble,
        animatedStyle,
        { borderRadius: size / 2, backgroundColor: "lightblue" },
        extraStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  bubble: {
    resizeMode: "contain",
  },
});

export default Bubbles;
