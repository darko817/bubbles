import HeaderNav from "@/components/Header";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const AllOrderStatusScreen = () => {
  const router = useRouter();
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
        <Text className="text-2xl text-blue-400 text-center mt-6">
          Statusi porudzbina
        </Text>
      </ScrollView>
    </View>
  );
};

export default AllOrderStatusScreen;
