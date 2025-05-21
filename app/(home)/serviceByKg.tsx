import HeaderNav from "@/components/Header";
import ServiceButton from "@/components/ServiceButton";
import { weights } from "@/constants/data";
import { useCart } from "@/context/CartContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";

const ServiceByKgScreen = () => {
  const router = useRouter();
  const { service } = useLocalSearchParams();
  const { addToCart, triggerOverlay } = useCart();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <View className="flex-1 bg-white">
      <HeaderNav icon="arrow-left" onPress={() => router.back()} client />
      <FlatList
        data={weights}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
        ListHeaderComponent={() => (
          <View className="py-10">
            <Text className="text-3xl text-blue-400 text-center">
              Dodavanje usluga
            </Text>
            <Text className="text-lg text-gray-500 text-center mt-2">
              Tezina
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View className="px-10">
            <ServiceButton
              text={item.text}
              price={item.price}
              weight
              onPress={() => {
                setSelectedId(item.id);
              }}
              selected={item.id === selectedId}
            />
          </View>
        )}
        ItemSeparatorComponent={() => <View className="my-3" />}
        ListFooterComponent={() => (
          <View className="mt-10 flex-col gap-4">
            <ServiceButton
              disabled={!selectedId}
              text="Potvrdi uslugu"
              weight
              bgColor="#60a5fa"
              textColor="white"
              onPress={() => {
                if (selectedId) {
                  const selectedItem = weights.find(
                    (item) => item.id === selectedId
                  );
                  if (selectedItem) {
                    addToCart({
                      id: selectedItem.id,
                      text: selectedItem.text,
                      price: selectedItem.price,
                      service:
                        typeof service === "string"
                          ? service
                          : "Nepoznata usluga",
                    });
                    triggerOverlay("Usluga je kreirana");
                    router.back();
                  }
                }
              }}
            />
            <ServiceButton
              text="Kreiraj narudzbinu"
              weight
              textColor="#60a5fa"
            />
          </View>
        )}
      />
    </View>
  );
};

export default ServiceByKgScreen;
