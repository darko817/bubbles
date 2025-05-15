import React from "react";
import { Text, View } from "react-native";

const Stepper = () => {
  return (
    <View className="flex-row items-center justify-around w-full">
      <View className="flex items-center w-38">
        <View className="rounded-full bg-blue-400 w-28 h-28 items-center justify-center">
          <Text className="text-white font-bold text-3xl">1</Text>
        </View>
        <Text className="text-gray-700 text-xl mt-3">Preuzimanje{"\n"}</Text>
      </View>
      <View className="w-10 h-0.5 bg-gray-300 mb-10 "></View>
      <View className="flex items-center w-38">
        <View className="rounded-full bg-gray-200 w-28 h-28 items-center justify-center">
          <Text className="text-gray-700 font-bold text-3xl">2</Text>
        </View>
        <Text className="text-gray-700 text-xl mt-3 text-center">
          Isporuka{"\n"}servisu
        </Text>
      </View>
    </View>
  );
};

export default Stepper;
