// /app/orderConfirmation.tsx
import CustomModal from "@/components/modals/CustomModal";
import { icons } from "@/constants/icons";
import { useCart } from "@/context/CartContext";
import { useOrderContext } from "@/context/OrderContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const OrderConfirmation = () => {
  const { newOrders } = useOrderContext();
  const { triggerOverlay } = useCart();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [secondsLeft, setSecondsLeft] = useState(15);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Find the matching order
  const orderId = params.id as string;
  const order = newOrders.find((o) => o.id === orderId);

  const onConfirmModal = () => {
    setShowSuccessModal(false);
    router.replace("/(home)");
    triggerOverlay("Porudžbina je uspesno kreirana");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    if (secondsLeft <= 0) {
      clearInterval(interval);
      setShowSuccessModal(true);
    }

    // Auto-navigate on acceptance
    /*  if (!order) {
      clearInterval(interval);
      router.replace("/(home)");
    } */

    return () => clearInterval(interval);
  }, [secondsLeft]);

  /*   useEffect(() => {
    // Once accepted, store locally
    if (!order) {
      saveOrderLocally();
    }
  }, [order]); */

  /*  const saveOrderLocally = async () => {
    try {
      const existingOrders = await AsyncStorage.getItem("orders");
      const orders = existingOrders ? JSON.parse(existingOrders) : [];

      orders.push({
        ...params,
        selectedLocation: JSON.parse(params.selectedLocation as string),
        cartItems: JSON.parse(params.cartItems as string),
        createdAt: new Date().toISOString(),
      });

      await AsyncStorage.setItem("orders", JSON.stringify(orders));
    } catch (err) {
      console.error("Saving order locally failed", err);
    }
  }; */

  return (
    <View className="flex-1 flex-col gap-8 justify-center items-center bg-white">
      <CountdownCircleTimer isPlaying duration={15} colors="#60a5fa">
        {() => <Text className="text-3xl text-blue-400">{secondsLeft}s</Text>}
      </CountdownCircleTimer>
      <Text className="text-3xl font-bold text-blue-400 mb-4">
        Čekamo potvrdu radnje...
      </Text>
      <CustomModal
        isVisible={showSuccessModal}
        onConfirm={() => onConfirmModal()}
        title="Porudžbina je uspešno kreirana!"
        confirmText="Potvrdi"
        icon={icons.exclamationIcon}
        isInfo
      />
    </View>
  );
};

export default OrderConfirmation;
