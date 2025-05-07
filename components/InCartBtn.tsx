import { images } from "@/constants/images";
import { useCart } from "@/context/CartContext";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface InCartBtnProps {
  onPress: () => void;
}

const InCartBtn = ({ onPress }: InCartBtnProps) => {
  const { cartItems, showAddedOverlay } = useCart();

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (showAddedOverlay) {
      // Trigger a pulse animation when item is added
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showAddedOverlay]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
        }}
        className="absolute right-5 bottom-5 rounded-full bg-blue-200 border border-blue-400 p-6"
      >
        <View className="absolute -top-2 right-0 bg-blue-400 rounded-full h-10 w-10 items-center justify-center z-10">
          <Text className="text-white text-lg font-bold">
            {cartItems.length}
          </Text>
        </View>
        <Image source={images.basket} className="h-14 w-14" />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default InCartBtn;
