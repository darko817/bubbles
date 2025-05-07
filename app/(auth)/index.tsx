import { AuthContext } from "@/context/AuthContext";
import { Redirect, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CountryFlag from "react-native-country-flag";
import Swiper from "react-native-swiper";

export default function AuthScreen() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  if (loading) return null;

  if (user) {
    return <Redirect href="/(home)" />;
  }

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const changeLanguage = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage).then(() => {
      setLanguage(newLanguage); // Update state after language change
      setModalVisible(false); // Close modal after language is updated
    });
  };

  const detectLanguageFlag = () => {
    if (language === "sr") {
      return <CountryFlag isoCode="rs" size={15} />;
    } else if (language === "en") {
      return <CountryFlag isoCode="gb" size={15} />;
    } else {
      return <CountryFlag isoCode="ru" size={15} />;
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-10 bg-white relative">
      <View className="absolute right-[30px] top-[10px]">
        <TouchableOpacity onPress={handleOpenModal} className="p-3">
          {detectLanguageFlag()}
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: "https://placehold.co/600x400/orange/white",
        }}
        className="w-[60%] h-52 rounded-lg bg-red-600 mb-10"
        resizeMode="cover"
      />
      <View className="h-64">
        <Swiper
          showsPagination={true}
          loop={false}
          dotColor="#ccc"
          activeDotColor="#3B82F6"
          dotStyle={{ width: 8, height: 8, borderRadius: 4 }}
          activeDotStyle={{ width: 12, height: 12, borderRadius: 6 }}
        >
          <View className="h-[200px]">
            <Text className="text-center text-2xl text-blue-400">
              {t("auth.title1")}
            </Text>
            <Text className="text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry`s standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Text>
          </View>
          <View>
            <Text className="text-center text-2xl text-blue-400">
              Drugi Naslov
            </Text>
            <Text className="text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry`s standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Text>
          </View>
          <View>
            <Text className="text-center text-2xl text-blue-400">
              Treci Naslov
            </Text>
            <Text className="text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry`s standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Text>
          </View>
        </Swiper>
      </View>
      <TouchableOpacity
        onPress={() => router.push("/(auth)/signUp")}
        className="bg-blue-400 w-full py-5 rounded-full mb-6"
      >
        <Text className="text-center text-white">Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/(auth)/login")}
        className="bg-white border border-blue-400 w-full py-5 rounded-full"
      >
        <Text className="text-center text-blue-400">Login</Text>
      </TouchableOpacity>
      <Text>OR</Text>
      <Text>Google OAuth</Text>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View className="flex-1 justify-end">
            <TouchableWithoutFeedback>
              <View className="bg-gray-200 h-[25%] rounded-t-3xl p-5 opacity-100">
                <View className="flex-row justify-end mb-2">
                  <TouchableOpacity
                    onPress={() => {
                      changeLanguage(selectedLanguage);
                    }}
                  >
                    <Text className="text-blue-500 text-lg font-semibold">
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="border-b border-gray-400 mb-3" />
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
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
