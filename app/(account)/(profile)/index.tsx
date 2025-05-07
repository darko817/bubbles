import ClientInfo from "@/components/ClientInfo";
import HeaderNav from "@/components/Header";
import { images } from "@/constants/images";
import { AuthContext } from "@/context/AuthContext";
import { formatSerbianPhone } from "@/helpers/phoneRegex";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View className="flex-1">
        <HeaderNav
          onPress={() => router.back()}
          icon="arrow-left"
          username={user?.name}
          noCart
        />
        <View className="-mt-4 -z-10 relative">
          <Image
            source={images.headerImage}
            resizeMode="cover"
            className="h-60"
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
            <ClientInfo value={client!} onChange={setClient} />
            <ClientInfo value={email!} onChange={setEmail} email />
            <ClientInfo
              value={mobilePhone}
              onChange={handlePhoneChange}
              onFocus={() => setIsFocused(true)}
              selection={
                isFocused && mobilePhone.startsWith("+381 ") && mobilePhone.length <= 6
                  ? { start: 6, end: 6 }
                  : undefined
              }
            />
          </View>

          <View className="border border-gray-300 my-5 mx-12" />

          <View className="flex-col gap-8 mx-20">
            <ClientInfo text="Data on cards" icon onPress={() => router.push('/(account)/(profile)/cardInfo')} />
            <ClientInfo text="Order history" icon onPress={() => router.push('/(account)/(profile)/orderHistory')} />
            <ClientInfo text="Delivery address" icon onPress={() => router.push('/(account)/(profile)/deliveryAddress')} />
            <ClientInfo text="Privacy" icon onPress={() => router.push('/(account)/(profile)/privacy')} />


          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
