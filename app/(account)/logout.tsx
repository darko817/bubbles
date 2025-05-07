import HeaderNav from "@/components/Header";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Logout = () => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/(auth)");
    }
  }, [user]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View className="flex">
        <HeaderNav
          icon="arrow-left"
          onPress={() => router.back()}
          username={user?.name}
        />
      </View>
      <Button title="Log out" onPress={logout} />
    </SafeAreaView>
  );
};

export default Logout;
