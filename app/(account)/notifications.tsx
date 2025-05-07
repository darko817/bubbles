import HeaderNav from "@/components/Header";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Notifications = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View className="flex-1">
        <HeaderNav
          icon="arrow-left"
          onPress={() => router.back()}
          username={user?.name}
        />
      </View>
      <Text>Notification</Text>
    </SafeAreaView>
  );
};

export default Notifications;
