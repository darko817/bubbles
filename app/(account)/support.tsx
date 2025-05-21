import HeaderNav from "@/components/Header";
import { images } from "@/constants/images";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const Support = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    console.log(message);
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
            source={images.helpImage}
            resizeMode="cover"
            className="h-60 w-full"
          />
        </View>

        <View className="flex-1 rounded-t-[20px] bg-white -mt-5 px-12 pb-10">
          <Text className="text-blue-400 text-2xl my-6 font-bold">Support</Text>

          <View className="bg-gray-100 p-4 rounded-xl">
            <TextInput
              multiline
              numberOfLines={8}
              textAlignVertical="top"
              placeholder="Write your message..."
              value={message}
              onChangeText={setMessage}
              className="text-base text-black"
              style={{
                height: 300,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={handleSendMessage}
            className="bg-blue-400 w-full py-5 rounded-full mt-6"
          >
            <Text className="text-center text-white">Send message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Support;
