import HeaderNav from "@/components/Header";
import TabbedHeader from "@/components/TabbedHeader";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

const ArchiveScreen = () => {
  const router = useRouter();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  const renderTabContent = () => {
    if (activeTabIndex === 0) {
      return <Text className="text-black">Content for "Izvrsene" tab</Text>;
    } else if (activeTabIndex === 1) {
      return <Text className="text-black">Content for "Neizvrsene" tab</Text>;
    }
    return null;
  };

  return (
    <View className="bg-white flex-1">
      <HeaderNav
        icon="arrow-left"
        icon2="refresh-ccw"
        onPress={() => router.back()}
        nonClient
        onPressRefresh={() => console.log("refresh")}
      />
      <View className="flex-1 px-6 py-10">
        <View className="px-6">
          <TabbedHeader
            tabs={["Izvrsene", "Neizvrsene"]}
            onTabChange={handleTabChange}
            initialTab={0}
          />
        </View>
        <View className="p-4 flex-1">{renderTabContent()}</View>
      </View>
    </View>
  );
};

export default ArchiveScreen;
