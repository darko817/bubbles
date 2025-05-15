import HeaderNav from "@/components/Header";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import CountryFlag from "react-native-country-flag";

const Language = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage).then(() => {
      setLanguage(newLanguage);
    });
  };

  return (
    <View className="flex-1">
      <View>
        <HeaderNav
          icon="arrow-left"
          onPress={() => router.back()}
          username={user?.name}
          client
        />
        <ScrollView className="px-12 py-10">
          <Text className="text-blue-400 text-xl font-bold ">Language</Text>
          <View className="mt-4">
            <TouchableOpacity
              onPress={() => changeLanguage("sr")}
              className="flex-row justify-start items-center py-2 px-5"
            >
              <CountryFlag isoCode="rs" size={15} />
              <Text
                className={`text-lg ml-3 ${
                  language === "sr" ? "text-blue-700 font-bold" : "text-black"
                }`}
              >
                Srpski
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => changeLanguage("en")}
              className="flex-row justify-start items-center py-2 px-5"
            >
              <CountryFlag isoCode="gb" size={15} />
              <Text
                className={`text-lg ml-3 ${
                  language === "en" ? "text-blue-700 font-bold" : "text-black"
                }`}
              >
                English
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => changeLanguage("ru")}
              className="flex-row justify-start items-center py-2 px-5"
            >
              <CountryFlag isoCode="ru" size={15} />
              <Text
                className={`text-lg ml-3 ${
                  language === "ru" ? "text-blue-700 font-bold" : "text-black"
                }`}
              >
                Pусский
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Language;
