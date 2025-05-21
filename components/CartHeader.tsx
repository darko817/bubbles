import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Feather";

interface HeaderNavprops {
  icon: string;
  onPress: () => void;
  title?: string;
}

const CartHeaderNav = ({ icon, onPress, title }: HeaderNavprops) => {
  return (
    <View
      className="bg-blue-400 px-4 pb-6 pt-24 flex-row justify-between items-center rounded-b-[20px] z-10"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 4,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <Icon name={icon} size={24} color="white" />
      </TouchableOpacity>
      <View className="flex-row items-center">
        <AntIcon name="shoppingcart" size={32} color="white" />
        <View className="w-px h-6 bg-white mx-3" />
        <Text className="text-white text-xl font-semibold">{title}</Text>
      </View>
      <View className="w-6" />
    </View>
  );
};

export default CartHeaderNav;
