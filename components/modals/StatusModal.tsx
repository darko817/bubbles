import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-elements";
import MapView from "react-native-maps";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface StatusModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const StatusModal: React.FC<StatusModalProps> = ({ isVisible, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return (
    <Modal visible={isVisible} animationType="slide">
      <View className="flex-1 bg-white">
        <View className="flex flex-row items-center justify-end p-4 z-40">
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={28} color="gray" />
          </TouchableOpacity>
        </View>

        <View
          className={`rounded-b-xl w-full p-6 mb-10  ${
            isExpanded ? "h-42" : ""
          }`}
        >
          {isExpanded ? (
            <View className="flex flex-row justify-between items-center w-full gap-6 mb-5">
              {/* Block 1 */}
              <View className="items-center">
                <MaterialIcons name="directions-car" size={36} color="grey" />
                <Text className="text-lg mt-1">Preuzimanje</Text>
                <Text className="text-blue-400">za 31min</Text>
              </View>

              {/* Divider */}
              <View className="w-px h-16 bg-blue-400" />

              {/* Block 2 */}
              <View className="items-center">
                <Text className="text-lg">Vozač</Text>
                <Text>driver name</Text>
                <Text className="text-blue-400">driver phone</Text>
              </View>

              {/* Divider */}
              <View className="w-px h-16 bg-blue-400" />

              {/* Block 3 */}
              <View className="items-center">
                <Text className="text-lg">Vozilo</Text>
                <Text>BG-222-222</Text>
              </View>
            </View>
          ) : (
            <View className="flex flex-col items-center w-full">
              <View className="flex flex-row items-center mb-4">
                <MaterialIcons name="directions-car" size={36} color="grey" />
                <Divider
                  orientation="vertical"
                  width={1}
                  color="#60a5fa"
                  className="h-full mx-3"
                />
                <View className="flex flex-col">
                  <Text className="text-2xl">Preuzimanje</Text>
                  <Text className="text-xl text-blue-400">za 31min</Text>
                </View>
              </View>

              <View className="border-b border-gray-300 w-full my-4" />

              <View className="flex flex-col items-center gap-2 mb-4">
                <Text className="text-xl">Podaci o vozaču</Text>
                <Text className="text-xl">driver name</Text>
                <Text className="text-xl text-blue-400">driver phone</Text>
              </View>

              <View className="border-b border-gray-300 w-full my-4" />

              <View className="flex flex-col items-center gap-2">
                <Text className="text-xl">Podaci o vozilu</Text>
                <Text className="text-xl">BG-222-222</Text>
              </View>
            </View>
          )}
        </View>

        <View className={`relative ${isExpanded ? "-mt-10" : "-mt-10"}`}>
          <TouchableOpacity
            className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 bg-blue-400 rounded-full"
            onPress={toggleExpanded}
          >
            <MaterialIcons
              name={isExpanded ? "keyboard-arrow-down" : "keyboard-arrow-up"}
              size={40}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-1 z-0">
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: 44.8176,
              longitude: 20.4633,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default StatusModal;
