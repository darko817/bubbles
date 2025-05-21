import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
  const router = useRouter();
  return (
    <SafeAreaView edges={["top"]} className="z-10">
      {client ? (
        <View
          className="bg-white px-4 pb-6 pt-5 flex-row justify-between items-center rounded-b-[20px] z-10"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 4,
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
            <TouchableOpacity
              onPress={() => router.push("/(home)/allOrderStatus")}
            >
              <Image
                source={{ uri: "https://placehold.co/32x32" }}
                className="h-8 w-8 rounded-2xl border border-blue-400"
              />
            </TouchableOpacity>
          )}
        </View>
      ) : nonClient ? (
        <View
          className="bg-white px-6 pb-6 pt-5 flex-row justify-between items-center rounded-b-[20px] z-10"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 4,
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
    </SafeAreaView>
  );
};

export default HeaderNav;
