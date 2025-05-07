import HeaderNav from "@/components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const stored = await AsyncStorage.getItem("orders");
        if (stored) setOrders(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to load orders:", error);
      }
    };

    fetchOrders();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View className="flex-1">
        <HeaderNav icon="arrow-left" onPress={() => router.back()} noCart />
        <ScrollView className="p-4">
          <Text className="text-2xl font-bold text-center text-blue-400 mb-10 mt-4">
            Statusi porudžbina
          </Text>
          {orders.length === 0 ? (
            <Text>Nema porudžbina.</Text>
          ) : (
            orders.map((order, index) => (
              <TouchableOpacity
                key={index}
                className="border border-blue-400 rounded-xl p-6 mb-4"
              >
                <View className="flex flex-row justify-between">
                  <View className="flex flex-col gap-4">
                    <View className="flex-row gap-4">
                      <MaterialIcons
                        name="document-scanner"
                        size={32}
                        color="grey"
                      />
                      <View className="border-l-2 border-blue-400 h-full" />
                    </View>
                    <Text>{order.total} RSD</Text>
                  </View>
                  <View className="self-end">
                    <Text>ID: {order.id}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Orders;
{
  /* <View key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <Text>Ime: {order.client}</Text>
                <Text>Telefon: {order.mobilePhone}</Text>
                <Text>Vreme: {order.selectedTime}</Text>
                <Text>Adresa: {order.address || "N/A"}</Text>
                <Text>Napomena: {order.note || "Nema"}</Text>
                <Text>Način plaćanja: {order.paymentMethod}</Text>
                <Text>Datum: {new Date(order.createdAt).toLocaleString()}</Text>
              </View> */
}
