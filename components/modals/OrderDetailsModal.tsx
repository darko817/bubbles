import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Stepper from "../Stepper";
import AcceptedModal from "./AcceptedModal";

interface OrderDetailsModalProps {
  isVisible: boolean;
  onClose: () => void;
  order: {
    id: string;
    client?: string;
    time?: string;
    status?: string;
  };
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isVisible,
  onClose,
  order,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return (
    <Modal visible={isVisible} animationType="slide">
      <View className="flex-1 bg-white">
        <View className="flex flex-row items-center justify-end p-4 z-40 bg-white">
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={28} color="gray" />
          </TouchableOpacity>
        </View>
        <View className="p-6">
          <Stepper />
        </View>

        {!isExpanded && (
          <View className="px-6">
            <View className="h-64 rounded-xl justify-center items-center bg-gray-100">
              <Text className="text-gray-700">Ovde idu detalji...</Text>
            </View>
          </View>
        )}
        <View className={`relative ${isExpanded ? "mt-6" : "-mt-5"}`}>
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

      {/* Action Buttons at Bottom */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 pt-8 border-t-2 border-gray-200 rounded-t-2xl flex-row justify-around">
        <View className="flex flex-col items-center gap-3">
          <TouchableOpacity
            className="flex bg-blue-400 h-24 w-24 rounded-full justify-center items-center"
            onPress={() => {
              console.log("Declined");
            }}
          >
            <MaterialIcons name="close" size={40} color="white" />
          </TouchableOpacity>
          <Text className="font-semibold text-lg">Nije preuzeto</Text>
        </View>
        <View className="flex flex-col items-center gap-3">
          <TouchableOpacity
            className="flex bg-blue-400 h-24 w-24 rounded-full justify-center items-center"
            onPress={() => {
              setIsAccepted(true);
            }}
          >
            <MaterialIcons name="check" size={40} color="white" />
          </TouchableOpacity>

          <Text className="font-semibold text-lg">Preuzeto</Text>
        </View>
      </View>
      {isAccepted && (
        <AcceptedModal
          title="Porudzbina preuzeta"
          isVisible={isAccepted}
          onCancel={() => setIsAccepted(false)}
          link="/(home)/(driver)/acceptedOrders"
        />
      )}
    </Modal>
  );
};

export default OrderDetailsModal;
