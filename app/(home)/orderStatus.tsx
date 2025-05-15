import HeaderNav from "@/components/Header";
import StatusModal from "@/components/modals/StatusModal";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

const OrderStatus = () => {
  const router = useRouter();
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const statuses = [
    {
      key: "accepted",
      label: "Prihvacene porudzbine",
      icon: "truck",
      date: "23-09-2022 20:00",
    },
    { key: "in_service", label: "Usluga", icon: "washing-machine" },
    {
      key: "delivery",
      label: "Dostava",
      icon: "truck",
      date: "24-09-2022 20:00",
    },
    { key: "completed", label: "Usluga realizovana", icon: "clipboard" },
  ];

  const statusIndexMap: Record<string, number> = {
    accepted: 0,
    in_service: 1,
    delivery: 2,
    completed: 3,
  };

  const currentStatus = "accepted";
  const currentIndex = statusIndexMap[currentStatus];

  return (
    <View className="bg-white flex-1">
      <HeaderNav
        icon="arrow-left"
        icon2="refresh-ccw"
        onPress={() => router.back()}
        nonClient
        onPressRefresh={() => console.log("refresh")}
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View className="flex flex-col gap-7 justify-center items-center py-12">
          {statuses.map((status, index) => {
            const isActive = index <= currentIndex;

            const bgColor = isActive ? "#2563EB" : "#E5E7EB";
            const textColor = isActive ? "#2563EB" : "#9CA3AF";
            const IconComponent =
              status.icon === "washing-machine" ? MaterialIcon : FeatherIcon;

            return (
              <Pressable
                onPress={() => setIsVisibleModal(true)}
                key={status.key}
                className="flex flex-col gap-2 items-center justify-center"
              >
                <View
                  className="flex justify-center items-center h-32 w-32 p-4 rounded-full"
                  style={{ backgroundColor: bgColor }}
                >
                  <IconComponent name={status.icon} size={48} color="white" />
                </View>
                <View className="flex justify-center items-center">
                  <Text className="text-2xl" style={{ color: textColor }}>
                    {status.label}
                  </Text>
                  {status.date && (
                    <Text className="text-2xl text-gray-500">
                      {status.date}
                    </Text>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      {isVisibleModal && (
        <StatusModal
          isVisible={isVisibleModal}
          onClose={() => setIsVisibleModal(false)}
        />
      )}
    </View>
  );
};

export default OrderStatus;
