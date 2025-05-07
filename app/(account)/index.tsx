import AccountBtn from "@/components/AccountBtn";
import HeaderNav from "@/components/Header";
import { accountCards } from "@/constants/data";
import { images } from "@/constants/images";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountScreen = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View className="flex-1">
        <HeaderNav
          icon="arrow-left"
          onPress={() => router.replace("/(home)")}
          username={user?.name}
        />
        <View className="-mt-4 -z-10 relative">
          <Image
            source={images.headerImage}
            resizeMode="cover"
            className="h-60"
          />
        </View>

        <FlatList
          data={accountCards}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <View className="pt-10 pb-3 bg-white ">
              <Text className="pl-12 text-3xl text-blue-400 text-left">Account</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View className="px-12 pb-5 bg-white">
              <AccountBtn
                icon={item.icon}
                title={item.text}
                icon2={item.icon2}
                onPress={() => router.push(item.route)}
              />
            </View>
          )}
          className="flex-1 rounded-t-[20px] bg-white -mt-5"
        />
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;
