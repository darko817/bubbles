import React, { useEffect, useMemo } from "react";
import { Dimensions, Image, ImageSourcePropType } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const Bubble = ({ image }: { image: ImageSourcePropType }) => {
  const startX = Math.random() * width;
  const size = useMemo(() => 20 + Math.random() * 80, []);
  const floatDuration = useMemo(() => 12000 + Math.random() * 5000, []);

  const x = useSharedValue(startX);
  const y = useSharedValue(height + Math.random() * 200); // Start below screen
  const rotation = useSharedValue(0); // New: rotation

  useEffect(() => {
    x.value = withRepeat(
      withTiming(startX + (Math.random() - 0.5) * 100, {
        duration: floatDuration,
        easing: Easing.linear,
      }),
      -1,
      true
    );

    y.value = withRepeat(
      withTiming(-100, {
        duration: floatDuration,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    rotation.value = withRepeat(
      withTiming(360, {
        duration: 20000 + Math.random() * 5000, // Slow rotation
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: x.value,
    top: y.value,
    opacity: 0.5,
    width: size,
    height: size,
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Image
        source={image}
        style={{ width: "100%", height: "100%" }}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

export default Bubble;
