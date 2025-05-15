import HeaderNav from "@/components/Header";
import CustomModal from "@/components/modals/CustomModal";
import { useOrderContext } from "@/context/OrderContext";
import { useLogoutConfirmation } from "@/hooks/useLogout";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

const WorkerScreen = () => {
  const { newOrders, acceptedOrders } = useOrderContext();
  const router = useRouter();

  const { isModalVisible, requestLogout, confirmLogout, cancelLogout } =
    useLogoutConfirmation();

  return (
    <View className="bg-white flex-1">
      <HeaderNav
        icon="log-out"
        icon2="refresh-ccw"
        onPress={requestLogout}
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
          <TouchableOpacity
            onPress={() => router.push("/newOrders")}
            className="flex flex-col gap-2 items-center justify-center"
          >
            <View className="flex justify-center items-center relative bg-blue-400 h-32 w-32 p-4 rounded-full">
              <FeatherIcon name="clipboard" size={48} color="white" />
              <View className="flex justify-center items-center absolute top-0 -right-2 w-12 h-12 bg-gray-400 rounded-full">
                <Text className="text-white text-xl">{newOrders.length}</Text>
              </View>
            </View>
            <Text className="text-2xl">Nove porudzbine</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/acceptedOrders")}
            className="flex flex-col gap-2 items-center justify-center"
          >
            <View className="flex justify-center items-center bg-blue-400 h-32 w-32 p-4 rounded-full relative">
              <FeatherIcon name="clipboard" size={48} color="white" />
              <View className="flex justify-center items-center absolute top-0 -right-2 w-12 h-12 bg-gray-400 rounded-full">
                <Text className="text-white text-xl">
                  {acceptedOrders.length}
                </Text>
              </View>
            </View>
            <Text className="text-2xl">Prihvacene porudzbine</Text>
          </TouchableOpacity>

          <View className="flex flex-col gap-2 items-center justify-center">
            <View className="flex justify-center items-center bg-blue-400 h-32 w-32 p-4 rounded-full">
              <FeatherIcon name="clipboard" size={48} color="white" />
            </View>
            <Text className="text-2xl">Arhiva porudzbina</Text>
          </View>
        </View>
      </ScrollView>
      <CustomModal
        isVisible={isModalVisible}
        title="Da li ste sigurni da želite da se izlogujete?"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
        confirmText="OK"
        cancelText="Cancel"
      />
    </View>
  );
};

export default WorkerScreen;
