import HeaderNav from "@/components/Header";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import { SafeAreaView } from "react-native-safe-area-context";

const Language = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View className="flex-1">
        <HeaderNav
          icon="arrow-left"
          onPress={() => router.back()}
          username={user?.name}
        />
      </View>
      <Text>Language</Text>
      <ScrollView className="mx-auto">
        <TouchableOpacity
          onPress={() => setSelectedLanguage("sr")}
          className="flex-row justify-start items-center py-2 px-5"
        >
          <CountryFlag isoCode="rs" size={15} />
          <Text
            className={`text-lg ml-3 ${
              selectedLanguage === "sr"
                ? "text-blue-700 font-bold"
                : "text-black"
            }`}
          >
            Srpski
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedLanguage("en")}
          className="flex-row justify-start items-center py-2 px-5"
        >
          <CountryFlag isoCode="gb" size={15} />
          <Text
            className={`text-lg ml-3 ${
              selectedLanguage === "en"
                ? "text-blue-700 font-bold"
                : "text-black"
            }`}
          >
            English
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedLanguage("ru")}
          className="flex-row justify-start items-center py-2 px-5"
        >
          <CountryFlag isoCode="ru" size={15} />
          <Text
            className={`text-lg ml-3 ${
              selectedLanguage === "ru"
                ? "text-blue-700 font-bold"
                : "text-black"
            }`}
          >
            Pусский
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Language;
