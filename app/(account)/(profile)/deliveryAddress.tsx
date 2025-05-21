import HeaderNav from "@/components/Header";
import { images } from "@/constants/images";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const DeliveryAddress = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [addresses, setAddresses] = useState<
    { coords: { latitude: number; longitude: number } }[]
  >([]);
  const [adding, setAdding] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const handleMapPress = (e: any) => {
    const { coordinate } = e.nativeEvent;
    setSelectedLocation(coordinate);
  };

  const saveAddress = () => {
    if (!selectedLocation) {
      alert("Select a location on the map.");
      return;
    }

    setAddresses([...addresses, { coords: selectedLocation }]);
    setSelectedLocation(null);
    setAdding(false);
  };

  const deleteAddress = (index: number) => {
    const updated = [...addresses];
    updated.splice(index, 1);
    setAddresses(updated);
  };

  return (
    <View className="flex-1">
      <HeaderNav
        onPress={() => router.back()}
        icon="arrow-left"
        username={user?.name}
        noCart
        client
      />

      <View className="-mt-4 -z-10 relative">
        <Image
          source={images.headerImage}
          resizeMode="cover"
          className="h-60 w-full"
        />
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        className="flex-1 rounded-t-[20px] bg-white -mt-5"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View className="pt-10 pb-3 px-12">
          <Text className="text-3xl text-blue-400 text-left mb-6">
            Delivery Addresses
          </Text>

          {addresses.map((addr, index) => (
            <View
              key={index}
              className="flex flex-row items-start justify-between mb-4"
            >
              <View className="flex-row items-start gap-3 flex-1">
                <FontAwesome name="map-marker" size={28} color="#3B82F6" />
                <Text className="text-lg text-black flex-1">
                  {addr.coords.latitude.toFixed(4)},{" "}
                  {addr.coords.longitude.toFixed(4)}
                </Text>
              </View>
              <TouchableOpacity onPress={() => deleteAddress(index)}>
                <FontAwesome name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}

          {!adding ? (
            <TouchableOpacity
              onPress={() => setAdding(true)}
              className="flex flex-row items-center justify-between mt-4"
            >
              <View className="flex flex-row gap-5 items-center">
                <FontAwesome name="plus-circle" size={24} />
                <Text className="text-xl">Add New Address</Text>
              </View>
              <FontAwesome name="chevron-right" size={16} />
            </TouchableOpacity>
          ) : (
            <>
              <View className="mt-6">
                <MapView
                  style={{ width: "100%", height: 300 }}
                  initialRegion={{
                    latitude: 44.8176,
                    longitude: 20.4633,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  onPress={handleMapPress}
                >
                  {selectedLocation && (
                    <Marker coordinate={selectedLocation} title="Selected" />
                  )}
                </MapView>
              </View>

              <TouchableOpacity
                onPress={saveAddress}
                className="bg-blue-400 w-full py-4 rounded-full mt-6"
              >
                <Text className="text-white text-center text-xl">
                  Save Address
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setAdding(false);
                  setSelectedLocation(null);
                }}
                className="bg-red-400 w-full py-4 rounded-full mt-3"
              >
                <Text className="text-white text-center text-xl">Cancel</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DeliveryAddress;
