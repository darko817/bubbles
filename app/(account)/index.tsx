import AccountBtn from "@/components/AccountBtn";
import HeaderNav from "@/components/Header";
import CustomModal from "@/components/modals/CustomModal";
import { accountCards } from "@/constants/data";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { AuthContext } from "@/context/AuthContext";
import { useLogoutConfirmation } from "@/hooks/useLogout";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { FlatList, Image, Linking, Platform, Text, View } from "react-native";

const AccountScreen = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { isModalVisible, requestLogout, confirmLogout, cancelLogout } =
    useLogoutConfirmation();

  const openNotificationSettings = () => {
    if (Platform.OS === "android") {
      Linking.openSettings(); // Opens system settings for the app
    } else if (Platform.OS === "ios") {
      Linking.openURL("app-settings:"); // Opens app settings on iOS
    }
  };

  return (
    <View className="flex-1">
      <View className="flex-1">
        <HeaderNav
          icon="arrow-left"
          onPress={() => router.replace("/(home)")}
          username={user?.name}
          client
        />
        <View className="-mt-4 -z-10 relative">
          <Image
            source={images.acccountImage}
            resizeMode="cover"
            className="h-60 w-full"
          />
        </View>

        <FlatList
          data={accountCards}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <View className="pt-10 mb-3 bg-white ">
              <Text className="pl-12 text-3xl text-blue-400 text-left">
                Account
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View className="px-12 bg-white">
              <AccountBtn
                icon={item.icon}
                title={item.text}
                icon2={item.icon2}
                onPress={
                  item.text === "Log out"
                    ? requestLogout
                    : item.text === "Notifications"
                    ? openNotificationSettings
                    : () => router.push(item.route)
                }
              />
            </View>
          )}
          className="flex-1 rounded-t-[20px] bg-white -mt-5"
        />
      </View>

      <CustomModal
        icon={icons.exclamationIcon}
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

export default AccountScreen;
