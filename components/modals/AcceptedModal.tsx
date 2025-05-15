import { useRouter } from "expo-router";
import React from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
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
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-center items-center bg-black/50 ">
        <View className="bg-white flex rounded-2xl p-8 items-center shadow-md w-[80%]">
          <TouchableOpacity onPress={onCancel} className="self-end">
            <MaterialIcons name="close" size={28} color="gray" />
          </TouchableOpacity>
          <Text className="mb-8 mt-4 text-2xl font-bold text-center">
            {title}
          </Text>
          <Pressable onPress={() => router.push(link as never)}>
            <Text className="text-xl text-blue-400">
              Prihvacenje porudzbine
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AcceptedModal;
