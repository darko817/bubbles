import ClientInfo from "@/components/ClientInfo";
import HeaderNav from "@/components/Header";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { AuthContext } from "@/context/AuthContext";
import { formatSerbianPhone } from "@/helpers/phoneRegex";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const ProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [client, setClient] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [mobilePhone, setMobilePhone] = useState(user?.phone ?? "+381 ");
  const [isFocused, setIsFocused] = useState(false);

  const handlePhoneChange = (text: string) => {
    const formatted = formatSerbianPhone(text);
    if (!formatted.startsWith("+381 ")) {
      setMobilePhone("+381 ");
      return;
    }
    setMobilePhone(formatted);
  };

  return (
    <View className="flex-1">
      <View className="flex-1">
        <HeaderNav
          onPress={() => router.back()}
          icon="arrow-left"
          username={user?.name}
          noCart
          client
        />
        <View className="-mt-4 -z-10 relative">
          <Image
            source={images.profileImage}
            resizeMode="cover"
            className="h-60 w-full"
          />
        </View>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          className="flex-1 rounded-t-[20px] bg-white -mt-5"
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <View className="pt-10 pb-3 bg-white pl-12">
            <Text className="text-3xl text-blue-400 text-left">My profile</Text>
          </View>

          <View className="flex-col gap-8 mt-4 ml-20  ">
            <ClientInfo
              value={client!}
              onChange={setClient}
              iconImage={icons.profileIcon}
            />
            <ClientInfo
              value={email!}
              onChange={setEmail}
              email
              iconImage={icons.mailIcon}
            />
            <ClientInfo
              value={mobilePhone}
              onChange={handlePhoneChange}
              onFocus={() => setIsFocused(true)}
              selection={
                isFocused &&
                mobilePhone.startsWith("+381 ") &&
                mobilePhone.length <= 6
                  ? { start: 6, end: 6 }
                  : undefined
              }
              iconImage={icons.phoneIcon}
            />
          </View>

          <View className="border border-gray-300 my-5 mx-12" />

          <View className="flex-col gap-8 mx-20">
            <ClientInfo
              text="Data on cards"
              icon
              onPress={() => router.push("/(account)/(profile)/cardInfo")}
              iconImage={icons.cardsIcon}
            />
            <ClientInfo
              text="Order history"
              icon
              onPress={() => router.push("/(account)/(profile)/orderHistory")}
              iconImage={icons.historyIcon}
            />
            <ClientInfo
              text="Delivery address"
              icon
              onPress={() =>
                router.push("/(account)/(profile)/deliveryAddress")
              }
              iconImage={icons.addressIcon}
            />
            <ClientInfo
              text="Privacy"
              icon
              onPress={() => router.push("/(account)/(profile)/privacy")}
              iconImage={icons.privacyIcon}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileScreen;
