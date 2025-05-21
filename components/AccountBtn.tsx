import React from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface AccountBtnProps {
  icon: ImageSourcePropType;
  title: string;
  icon2: string;
  onPress: () => void;
}

const AccountBtn = ({ icon, title, icon2, onPress }: AccountBtnProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="py-4">
      <View className="flex-row justify-between items-center">
        <View className="flex-row gap-8 items-center">
          <Image source={icon} className="w-10 h-10" />
          <Text className="text-xl text-gray-400">{title}</Text>
        </View>
        <Icon name={icon2} size={18} color="#b3aeae" />
      </View>
    </TouchableOpacity>
  );
};

export default AccountBtn;
