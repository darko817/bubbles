import HeaderNav from "@/components/Header";
import CustomModal from "@/components/modals/CustomModal";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Button, View } from "react-native";

const Logout = () => {
  const { user, logout } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/(auth)");
    }
  }, [user]);

  const handleLogoutRequest = () => {
    setIsModalVisible(true);
  };

  const handleConfirmLogout = () => {
    setIsModalVisible(false);
    logout();
  };

  const handleCancelLogout = () => {
    setIsModalVisible(false);
  };

  return (
    <View className="flex-1">
      <View className="flex">
        <HeaderNav
          icon="arrow-left"
          onPress={() => router.back()}
          username={user?.name}
          client
        />
      </View>
      <Button title="Log out" onPress={handleLogoutRequest} />

      <CustomModal
        isVisible={isModalVisible}
        title="Da li ste sigurni da želite da se izlogujete?"
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
        confirmText="OK"
        cancelText="Cancel"
      />
    </View>
  );
};

export default Logout;
