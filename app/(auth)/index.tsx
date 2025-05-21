import Bubble from "@/components/Bubbles";
import { languages } from "@/constants/data";
import { images } from "@/constants/images";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CountryFlag from "react-native-country-flag";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import WheelPickerExpo from "react-native-wheel-picker-expo";

export default function AuthScreen() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  if (loading) return null;

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const changeLanguage = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage).then(() => {
      setLanguage(newLanguage);
      setModalVisible(false);
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
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 relative">
        <View className="absolute w-full h-full z-[1]">
          <Bubble image={images.bubble1} />
          <Bubble image={images.bubble2} />
          <Bubble image={images.bubble3} />
          <Bubble image={images.bubble1} />
          <Bubble image={images.bubble2} />
          <Bubble image={images.bubble4} />
          <Bubble image={images.bubble1} />
          <Bubble image={images.bubble2} />
          <Bubble image={images.bubble4} />
          <Bubble image={images.bubble1} />
          <Bubble image={images.bubble4} />
          <Bubble image={images.bubble3} />
        </View>
        <View className="flex-1 justify-center items-center px-10 bg-white relative">
          <View className="absolute right-[30px] top-[10px] z-10">
            <TouchableOpacity onPress={handleOpenModal} className="p-3">
              {detectLanguageFlag()}
            </TouchableOpacity>
          </View>

          <Image source={images.Logo} className="mb-3" resizeMode="cover" />
          <View className="h-64 z-10">
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
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry`s
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Text>
              </View>
              <View>
                <Text className="text-center text-2xl text-blue-400">
                  Drugi Naslov
                </Text>
                <Text className="text-center">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry`s
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Text>
              </View>
              <View>
                <Text className="text-center text-2xl text-blue-400">
                  Treci Naslov
                </Text>
                <Text className="text-center">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry`s
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Text>
              </View>
            </Swiper>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/signUp")}
            className="bg-blue-400 w-full py-5 rounded-full mb-6 z-10"
          >
            <Text className="text-center text-white">Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/login")}
            className="bg-transparent border border-blue-400 w-full py-5 rounded-full z-10"
          >
            <Text className="text-center text-blue-400">Login</Text>
          </TouchableOpacity>
          {/*  <Text className="my-3">OR</Text>
        <Image source={images.googleBtn} alt="google" className="w-56 h-10" />
 */}
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleCloseModal}
          >
            <TouchableWithoutFeedback onPress={handleCloseModal}>
              <View className="flex-1 justify-end ">
                <TouchableWithoutFeedback>
                  <View className="bg-white h-[30%] rounded-t-3xl p-5 opacity-100 shadow-xl shadow-black">
                    <View className="flex flex-col ">
                      <TouchableOpacity
                        className="flex self-end"
                        onPress={() => changeLanguage(selectedLanguage)}
                      >
                        <Text className=" text-blue-500 text-lg font-semibold">
                          Add
                        </Text>
                      </TouchableOpacity>
                      <View className="border-b border-gray-400 py-2" />
                      <View className="self-center ">
                        <WheelPickerExpo
                          initialSelectedIndex={languages.findIndex(
                            (l) => l.value === selectedLanguage
                          )}
                          items={languages.map((lang) => ({
                            label: `${lang.label}`,
                            value: lang.value,
                          }))}
                          onChange={({ item }) =>
                            setSelectedLanguage(item.value)
                          }
                        />
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>
    </SafeAreaView>
  );
}
