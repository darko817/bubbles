import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface AccountBtnProps {
  icon: string;
  title: string;
  icon2: string;
  onPress: () => void;
}

const AccountBtn = ({ icon, title, icon2, onPress }: AccountBtnProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="py-4">
      <View className="flex-row justify-between items-center">
        <View className="flex-row gap-8 items-center">
          <Icon name={icon} size={32} color="#b3aeae" />
          <Text className="text-xl text-gray-400">{title}</Text>
        </View>
        <Icon name={icon2} size={18} color="#b3aeae" />
      </View>
    </TouchableOpacity>
  );
};

export default AccountBtn;
