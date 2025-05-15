import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface ConfirmationModalProps {
  isVisible: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const CustomModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  title,
  onConfirm,
  onCancel,
  confirmText = "OK",
  cancelText = "Cancel",
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-center items-center bg-black/50 ">
        <View className="bg-white rounded-2xl p-8 items-center shadow-md w-[80%]">
          <Text className="mb-4 text-2xl font-bold text-center">{title}</Text>
          <View className="flex flex-col gap-6 justify-around mt-5 w-full">
            <TouchableOpacity
              className="bg-blue-400 rounded-full py-5 shadow-md w-full"
              onPress={onConfirm}
            >
              <Text className="text-white font-bold text-center text-xl">
                {confirmText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white border border-blue-400 rounded-full py-5 shadow-md w-full"
              onPress={onCancel}
            >
              <Text className="text-blue-400  font-bold text-center text-xl">
                {cancelText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
