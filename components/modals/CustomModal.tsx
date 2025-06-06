import { images } from "@/constants/images";
import React from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ConfirmationModalProps {
  isVisible: boolean;
  title: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  icon?: ImageSourcePropType;
  isInfo?: boolean;
}

const CustomModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  title,
  onConfirm,
  onCancel,
  confirmText = "OK",
  cancelText = "Cancel",
  icon,
  isInfo,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        {icon && (
          <Image
            source={icon}
            className="h-24 w-24 mb-[-40] z-10"
            resizeMode="contain"
          />
        )}
        <View className="w-[80%] rounded-2xl overflow-hidden shadow-md z-0">
          <ImageBackground
            source={images.modalBubbles}
            resizeMode="cover"
            className="p-8 items-center"
            imageStyle={{
              borderRadius: 24,
            }}
          >
            <Text className="my-4 text-2xl font-bold text-center">{title}</Text>

            <View className="flex flex-col gap-6 justify-around mt-5 w-full">
              <TouchableOpacity
                className="bg-blue-400 rounded-full py-5 shadow-md w-full"
                onPress={onConfirm}
              >
                <Text className="text-white font-bold text-center text-xl">
                  {confirmText}
                </Text>
              </TouchableOpacity>

              {!isInfo && (
                <TouchableOpacity
                  className="bg-white border border-blue-400 rounded-full py-5 shadow-md w-full"
                  onPress={onCancel}
                >
                  <Text className="text-blue-400 font-bold text-center text-xl">
                    {cancelText}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
