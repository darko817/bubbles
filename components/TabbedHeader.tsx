import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface TabbedHeaderProps {
  tabs: string[];
  onTabChange: (index: number) => void;
  initialTab?: number;
}

const TabbedHeader: React.FC<TabbedHeaderProps> = ({
  tabs,
  onTabChange,
  initialTab = 0,
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    onTabChange(index);
  };

  return (
    <View className="flex-row border-2 border-blue-400 bg-blue-400 rounded-full mx-4 mt-4 overflow-hidden">
      {tabs.map((tab, index) => (
        <Pressable
          key={index}
          className={`flex-1 py-3 items-center ${
            activeTab === index
              ? "bg-white rounded-full"
              : "bg-transparent rounded-none"
          }`}
          onPress={() => handleTabPress(index)}
        >
          <Text
            className={`font-bold text-lg ${
              activeTab === index ? "text-blue-400" : "text-white"
            }`}
          >
            {tab}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default TabbedHeader;
