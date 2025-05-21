import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface ConfirmationModalProps {
  isVisible: boolean;
  title: string;
  link: string;
  onCancel: () => void;
}

const AcceptedModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  title,
  link,
  onCancel,
}) => {
  const router = useRouter();

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-center items-center bg-black/50 relative">
        <Image
          source={icons.checkmarkIcon}
          className="h-24 w-24 mb-[-40] z-10"
          resizeMode="contain"
        />
        <View className="w-[80%] rounded-2xl overflow-hidden shadow-md">
          <ImageBackground
            source={images.modalBubbles}
            resizeMode="cover"
            className="p-8 items-center"
          >
            <TouchableOpacity onPress={onCancel} className="self-end">
              <MaterialIcons name="close" size={28} color="gray" />
            </TouchableOpacity>

            <Text className="mb-8 mt-4 text-2xl font-bold text-center">
              {title}
            </Text>

            <Pressable onPress={() => router.push(link as never)}>
              <Text className="text-2xl text-blue-400 mt-6 underline">
                Prihvacenje porudžbine
              </Text>
            </Pressable>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

export default AcceptedModal;
