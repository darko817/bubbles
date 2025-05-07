import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

interface HeaderNavprops {
  icon: string;
  onPress: () => void;
  username?: string;
  noCart?: boolean;
  title?: string
}

const HeaderNav = ({ icon, onPress, username, noCart, title }: HeaderNavprops) => {
  return (
    <View
      className="bg-white px-4 py-6 flex-row justify-between items-center rounded-b-[20px] z-10"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 40,
        elevation: 10, // for Android
      }}
    >
      <TouchableOpacity onPress={onPress}>
        {username ? (
          <Icon name={icon} size={24} color="#000000" />
        ) : (
          <Icon name={icon} size={24} color="#000000" />
        )}
      </TouchableOpacity>

      {username ? <Text className="text-blue-400 text-lg font-semibold">
        Hello {username}
      </Text> : title ? <Text className="text-blue-400 text-lg font-semibold">{title}</Text> : <Text className="text-blue-400 text-lg font-semibold">Bubbles</Text>}
      {noCart ? (
        <View className="h-8 w-8 rounded-2xl border border-white" />
      ) : (
        <TouchableOpacity onPress={() => console.log("Open profile")}>
          <Image
            source={{ uri: "https://placehold.co/32x32" }}
            className="h-8 w-8 rounded-2xl border border-blue-400"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderNav;
