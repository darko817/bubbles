import HeaderNav from "@/components/Header";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Text, View } from "react-native";

const Support = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  return (
    <View className="flex-1">
      <View className="flex-1">
        <HeaderNav
          icon="arrow-left"
          onPress={() => router.back()}
          username={user?.name}
          client
        />
      </View>
      <Text>Support</Text>
    </View>
  );
};

export default Support;
