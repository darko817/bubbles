import HeaderNav from "@/components/Header";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const NewOrdersScreen = () => {
  const router = useRouter();
  return (
    <View className="bg-white flex-1">
      <HeaderNav
        icon="arrow-left"
        icon2="refresh-ccw"
        onPress={() => router.back()}
        nonClient
      />
      <ScrollView className="flex-1">
        <Text>New orders</Text>
      </ScrollView>
    </View>
  );
};

export default NewOrdersScreen;
