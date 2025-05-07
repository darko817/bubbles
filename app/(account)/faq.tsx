import HeaderNav from "@/components/Header";
import { faqData } from "@/constants/data";
import { images } from "@/constants/images";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";

const Faq = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <HeaderNav
        icon="arrow-left"
        onPress={() => router.back()}
        username={user?.name}
      />
      <View className="-mt-4 -z-10 relative">
        <Image
          source={images.headerImage}
          resizeMode="cover"
          className="h-60"
        />
      </View>
      <ScrollView className=" rounded-t-[20px] bg-white -mt-5 px-12">
        <Text className="text-2xl font-bold text-blue-400 my-6 pl-4">
          Pitanja
        </Text>

        {faqData.map((item, index) => (
          <View
            key={index}
            className={`rounded-xl mb-4 overflow-hidden ${
              index !== faqData.length - 1 ? "border-b border-grey" : ""
            }`}
          >
            <TouchableOpacity
              className="flex-row justify-between items-center p-4"
              onPress={() => toggleAccordion(index)}
            >
              <Text className="text-lg font-semibold text-gray-400">
                {item.question}
              </Text>
              <AntDesign name="right" size={20} color="grey" />
            </TouchableOpacity>
            {openIndex === index && (
              <View className="text-xl px-4 pb-4">
                <Text className="text-base text-gray-700">{item.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Faq;
