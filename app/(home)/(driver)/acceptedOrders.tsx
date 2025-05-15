import HeaderNav from "@/components/Header";
import OrderDetailsModal from "@/components/modals/OrderDetailsModal";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const AcceptedOrdersScreen = () => {
  const router = useRouter();

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleDetailsPress = () => {
    const dummyOrder = {
      id: "",
      client: "",
      time: "",
      status: "",
    };

    setSelectedOrder(dummyOrder);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  return (
    <View className="bg-white flex-1">
      <HeaderNav
        icon="arrow-left"
        icon2="refresh-ccw"
        onPress={() => router.push("/(home)/(driver)")}
        nonClient
      />
      <ScrollView className="flex-1">
        <View className="px-6 pt-6">
          <Text className="text-2xl text-blue-400 mb-6 text-center">
            Privhvacene porudzbine
          </Text>
        </View>
        <View className="px-12">
          <View className="flex flex-row justify-between border border-blue-400 rounded-3xl px-6 py-2">
            <View className="flex flex-col gap-4">
              <View className="flex-row gap-4 items-center">
                <MaterialIcons name="document-scanner" size={32} color="grey" />
                <View className="border-l-2 border-blue-400 h-full" />
                <Text>Porudzbina 1</Text>
              </View>
              <Text className="text-xl">2838934</Text>
            </View>
            <View className="flex flex-col justify-between">
              <View />
              <TouchableOpacity
                className="self-end"
                onPress={() => handleDetailsPress()}
              >
                <Text className="text-blue-400 text-xl">Detalji</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {selectedOrder && (
        <OrderDetailsModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          order={selectedOrder}
        />
      )}
    </View>
  );
};

export default AcceptedOrdersScreen;
