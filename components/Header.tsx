import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  default as FeatherIcons,
  default as Icon,
} from "react-native-vector-icons/Feather";

interface HeaderNavprops {
  icon: string;
  onPress: () => void;
  username?: string;
  noCart?: boolean;
  title?: string;
  client?: boolean;
  nonClient?: boolean;
  icon2?: string;
  onPressRefresh?: () => void;
}

const HeaderNav = ({
  icon,
  onPress,
  username,
  noCart,
  title,
  client,
  nonClient,
  icon2,
  onPressRefresh,
}: HeaderNavprops) => {
  const { t } = useTranslation();
  return (
    <>
      {client ? (
        <View
          className="bg-white px-4 pb-6 pt-16 flex-row justify-between items-center rounded-b-[20px] z-10"
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

          {username ? (
            <Text className="text-blue-400 text-lg font-semibold">
              {t("navbar.greet")} {username}
            </Text>
          ) : title ? (
            <Text className="text-blue-400 text-lg font-semibold">{title}</Text>
          ) : (
            <Text className="text-blue-400 text-lg font-semibold">Bubbles</Text>
          )}
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
      ) : nonClient ? (
        <View
          className="bg-white px-6 pb-6 pt-16 flex-row justify-between items-center rounded-b-[20px] z-10"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 1,
            shadowRadius: 40,
            elevation: 10,
          }}
        >
          <TouchableOpacity onPress={onPress}>
            <FeatherIcons name={icon} size={24} color="#000000" />
          </TouchableOpacity>
          <Text className="text-blue-400 text-lg font-semibold">Bubbles</Text>
          <TouchableOpacity onPress={onPressRefresh}>
            <FeatherIcons name={icon2!} size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
};

export default HeaderNav;
