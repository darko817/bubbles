import HeaderNav from "@/components/Header";
import { clothingItems } from "@/constants/data";
import { useCart } from "@/context/CartContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface Quantities {
  [itemId: string]: number;
}

const ServiceByItemScreen = () => {
  const router = useRouter();
  const { service } = useLocalSearchParams();
  const { addToCart, triggerOverlay } = useCart();
  const [quantities, setQuantities] = useState<Quantities>(
    clothingItems.reduce((acc: Quantities, item) => {
      acc[item.id] = 0;
      return acc;
    }, {})
  );

  const incrementQuantity = (itemId: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));
  };

  const decrementQuantity = (itemId: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max(0, (prevQuantities[itemId] || 0) - 1),
    }));
  };

  const handleConfirmService = () => {
    const itemsToAdd = Object.keys(quantities)
      .filter((itemId) => quantities[itemId] > 0)
      .map((itemId) => {
        const item = clothingItems.find((i) => i.id === itemId);
        return {
          id: itemId,
          text: item?.name || "Unknown Item",
          price: item?.price || 0,
          quantity: quantities[itemId],
          service: typeof service === "string" ? service : "Nepoznata usluga",
        };
      });

    if (itemsToAdd.length > 0) {
      itemsToAdd.forEach((item) => {
        addToCart(item);
      });
      triggerOverlay("Usluge su dodate u korpu");
      router.back();
    } else {
      triggerOverlay("Molimo vas, odaberite barem jednu stavku.");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <HeaderNav icon="arrow-left" onPress={() => router.back()} client />
      <FlatList
        data={clothingItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
        ListHeaderComponent={() => (
          <View className="py-10">
            <Text className="text-3xl text-blue-400 text-center">
              Dodavanje usluga
            </Text>
            <Text className="text-lg text-gray-500 text-center mt-2">
              Tip artikla
            </Text>
          </View>
        )}
        renderItem={({ item }) => {
          const totalPrice = (quantities[item.id] || 0) * item.price;

          return (
            <View className="flex-row w-full items-center px-6 py-4 rounded-md my-2">
              <View className="w-1/3 pr-2">
                <Text className="text-lg">{item.name}</Text>
              </View>

              <View className="w-1/3 items-center border border-gray-400 rounded-full flex flex-row justify-between ">
                <TouchableOpacity
                  onPress={() => decrementQuantity(item.id)}
                  className="rounded-full w-8 h-8 items-center justify-center"
                >
                  <Text className="text-xl font-bold text-blue-500 pl-2">
                    -
                  </Text>
                </TouchableOpacity>

                <View className="bg-blue-400 w-12 h-12 items-center justify-center rounded-full">
                  <Text className="text-white">{quantities[item.id]}</Text>
                </View>

                <TouchableOpacity
                  onPress={() => incrementQuantity(item.id)}
                  className="rounded-full w-8 h-8 items-center justify-center"
                >
                  <Text className="text-xl font-bold text-blue-500 pr-2">
                    +
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="w-1/3 items-end pl-2">
                <Text className="text-gray-600 whitespace-nowrap">
                  {totalPrice} RSD
                </Text>
              </View>
            </View>
          );
        }}
        ListFooterComponent={() => (
          <View className="mt-10 flex-col gap-4">
            <TouchableOpacity
              disabled={Object.values(quantities).every((q) => q === 0)}
              onPress={handleConfirmService}
              className={`w-full flex-row gap-4 justify-center items-center px-4 py-4 border border-blue-400 rounded-3xl ${
                Object.values(quantities).every((q) => q === 0)
                  ? "bg-gray-300"
                  : "bg-blue-400"
              }`}
            >
              <Text
                className={`text-lg font-semibold ${
                  Object.values(quantities).every((q) => q === 0)
                    ? "text-gray-500"
                    : "text-white"
                }`}
              >
                Potvrdi uslugu
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/cart")}
              className="w-full flex-row gap-4 justify-center items-center px-4 py-4 border border-blue-400 rounded-3xl"
            >
              <Text className="text-lg font-semibold text-blue-400">
                Kreiraj narudzbinu
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default ServiceByItemScreen;
