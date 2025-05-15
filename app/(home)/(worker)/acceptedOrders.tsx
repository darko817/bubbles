import HeaderNav from "@/components/Header";
import { useOrderContext } from "@/context/OrderContext";
import { Order } from "@/types";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const acceptedOrdersScreen = () => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { acceptedOrders } = useOrderContext();

  const handleDetailsPress = (order: Order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  return (
    <View className="bg-white flex-1">
      <HeaderNav
        icon="arrow-left"
        icon2="refresh-ccw"
        onPress={() => router.push("/(home)/(worker)")}
        nonClient
      />
      <ScrollView className="flex-1">
        <View className="px-6 pt-6">
          <Text className="text-2xl text-blue-400 mb-6 text-center">
            Privhvacene porudzbine
          </Text>
          {acceptedOrders.length === 0 ? (
            <Text>Nema porudžbina.</Text>
          ) : (
            acceptedOrders.map((order, index) => (
              <View
                key={index}
                className="border border-blue-400 rounded-xl p-6 mb-4"
              >
                <View className="flex flex-row justify-between">
                  <View className="flex flex-col gap-4">
                    <View className="flex-row gap-4 items-center">
                      <MaterialIcons
                        name="document-scanner"
                        size={32}
                        color="grey"
                      />
                      <View className="border-l-2 border-blue-400 h-full" />
                      <Text>{order.orderNumber}</Text>
                    </View>
                    <Text className="text-xl">{order.id}</Text>
                  </View>
                  <View className="flex flex-col items-end justify-between">
                    <View className="flex flex-row gap-2 justify-center items-center">
                      <MaterialIcons
                        name="access-time"
                        size={16}
                        color="blue-400"
                      />
                      <Text className="text-xl text-gray-500">Isteklo</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDetailsPress(order)}>
                      <Text className="text-blue-400 text-xl">Detalji</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-end items-center bg-black/50">
          <View className="bg-white rounded-t-2xl p-6 w-full shadow-md">
            {selectedOrder && (
              <>
                <View className="items-center mb-4 mt-10">
                  <View className="flex flex-row justify-center items-center gap-3 mb-3">
                    <MaterialIcons name="task" size={24} color="blue-400" />
                    <Text className="text-xl font-bold">
                      {selectedOrder.orderNumber}
                    </Text>
                  </View>
                  <Text className="text-gray-600 text-lg">
                    {selectedOrder.id}
                  </Text>
                </View>
                <View className="border-b border-gray-300" />

                <View className=" my-28 ">
                  <View className="flex-row justify-between w-full px-4 mb-2">
                    <Text className="text-gray-700">Tip usluge:</Text>
                    <Text className="text-gray-700">Količina:</Text>
                  </View>
                  <View className="flex-row justify-between border border-blue-400 p-4 rounded-xl w-full">
                    <Text className="">{selectedOrder.serviceType}</Text>
                    <Text className="">{selectedOrder.quantity}</Text>
                  </View>
                </View>
                <View className="border-b border-gray-300 mb-4" />

                <View className="flex flex-col items-center mb-6 bg-blue-400 rounded-xl py-8">
                  <Text className="text-white text-xl mb-6">
                    Preuzimanje porudžbine:
                  </Text>
                  <View className="flex-row items-center gap-3 bg-white rounded-full px-4 py-2">
                    <Text className="ml-2">{selectedOrder.pickupDate}</Text>

                    <Text className="ml-2">{selectedOrder.pickupTime}</Text>
                  </View>
                </View>
              </>
            )}
            <Pressable
              onPress={closeModal}
              className="absolute -top-8"
              style={{
                left: "50%",
                transform: [{ translateX: 0 }],
              }}
            >
              <View className="h-16 w-16 rounded-full bg-blue-400 justify-center items-center">
                <MaterialIcons name="arrow-drop-down" size={48} color="white" />
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default acceptedOrdersScreen;
