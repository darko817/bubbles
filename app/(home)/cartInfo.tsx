import CartHeaderNav from "@/components/CartHeader";
import ClientInfo from "@/components/ClientInfo";
import TimePickerModal from "@/components/TimePickerModal";
import { AuthContext } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { formatSerbianPhone } from "@/helpers/phoneRegex";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CartScreen = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const { triggerOverlay, clearCart } = useCart();
    const [client, setClient] = useState(user?.name);
    const [mobilePhone, setMobilePhone] = useState(user?.phone ?? "+381 ");
    const [isFocused, setIsFocused] = useState(false);
    const [selected, setSelected] = useState<"cash" | "card">("cash");
    const [selectedLocation, setSelectedLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [isMapVisible, setIsMapVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState('');
    const [missingFields, setMissingFields] = useState<string[]>([]);

    const isFormValid =
        client?.trim() &&
        mobilePhone.trim().length > 8 &&
        selectedTime &&
        selectedLocation;

    const handleConfirmOrder = () => {
        const missing: string[] = [];

        if (!client?.trim()) missing.push("Ime");
        if (mobilePhone.trim().length <= 8) missing.push("Broj telefona");
        if (!selectedTime) missing.push("Vreme preuzimanja");
        if (!selectedLocation) missing.push("Lokacija");

        if (missing.length > 0) {
            setMissingFields(missing);
            Alert.alert(
                "Nedostaju podaci",
                `Molimo vas da popunite sledeće podatke: ${missing.join(", ")}`,
                [{ text: "OK" }]
            );
            return;
        }

        router.replace('/(home)');
        triggerOverlay("Porudžbina je uspesno kreirana");
        clearCart();
    };

    const handleTimeSelect = (time: any) => {
        setSelectedTime(time);
    };

    const handlePhoneChange = (text: string) => {
        const formatted = formatSerbianPhone(text);
        if (!formatted.startsWith("+381 ")) {
            setMobilePhone("+381 ");
            return;
        }
        setMobilePhone(formatted);
    };

    const handleMapPress = (e: any) => {
        const { coordinate } = e.nativeEvent;
        setSelectedLocation(coordinate);
    };

    /*   const reverseGeocode = (coordinate: { latitude: number; longitude: number }) => {
          Geocoder.from(coordinate.latitude, coordinate.longitude)
              .then((json) => {
                  const addressComponent = json.results[0].formatted_address;
                  setAddress(addressComponent);
              })
              .catch((error) => console.warn(error));
      }; */

    return (
        <SafeAreaView className="flex-1 bg-white">
            <CartHeaderNav icon="arrow-left" onPress={() => router.back()} title="Sadrzaj korpe" />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                className="flex-1 rounded-t-[20px] bg-white px-12"
                contentContainerStyle={{ paddingBottom: 80 }}
            >
                <Text className="text-blue-400 text-2xl my-8">Moji Podaci</Text>
                <View>
                    <ClientInfo value={client!} onChange={setClient} />
                    <View className="border border-gray-200 my-2 " />
                    <ClientInfo
                        value={mobilePhone}
                        onChange={handlePhoneChange}
                        onFocus={() => setIsFocused(true)}
                        selection={
                            isFocused && mobilePhone.startsWith("+381 ") && mobilePhone.length <= 6
                                ? { start: 6, end: 6 }
                                : undefined
                        }
                    />
                    <View className="border border-gray-200 my-2 " />
                </View>

                {/* Adresa */}
                <Text className="text-blue-400 text-2xl mt-8 mb-1">Adresa lokacije</Text>
                <View className="border border-gray-200 mb-2 " />
                {/* <GooglePlacesAutocomplete
                    placeholder="Pretraži adresu"
                    fetchDetails
                    onPress={(data, details = null) => {
                        const { lat, lng } = details?.geometry.location || {};
                        if (lat && lng) {
                            setSelectedLocation({ latitude: lat, longitude: lng });
                            setAddress(data.description);
                        }
                    }}
                    query={{
                        key: "YOUR_GOOGLE_MAPS_API_KEY",
                        language: "sr",
                    }}
                    styles={{
                        container: { flex: 0 },
                        listView: { backgroundColor: "white" },
                    }}
                /> */}
                <TouchableOpacity
                    className="flex-row items-center gap-4"
                    onPress={() => setIsMapVisible(!isMapVisible)}
                >
                    <MaterialIcons name="add-location-alt" size={32} color="grey" />
                    <Text className="text-lg text-gray-400">
                        {selectedLocation ? "Lokacija odabrana" : "Dodaj lokaciju"}
                    </Text>
                </TouchableOpacity>

                {isMapVisible && (
                    <View className="mt-4">
                        <MapView
                            style={{ width: "100%", height: 300 }}
                            initialRegion={{
                                latitude: 44.8176,
                                longitude: 20.4633,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            onPress={handleMapPress}
                        >
                            {selectedLocation && (
                                <Marker coordinate={selectedLocation} title="Vaša lokacija" />
                            )}
                        </MapView>
                    </View>
                )}
                {isMapVisible && <><Text className="text-blue-400 text-2xl mt-8 mb-1">Napomena o adresi</Text>
                    <TextInput
                        placeholder="Unesite napomenu (sprat, interfon...)"
                        value={note}
                        onChangeText={setNote}
                        multiline
                        numberOfLines={3}
                        className="border border-blue-400 rounded-md p-3 text-gray-700 text-base"
                    /></>}

                {/* Prikaz adrese */}
                {address ? (
                    <View className="mt-4">
                        <Text className="text-gray-500 text-sm">Izabrana adresa:</Text>
                        <Text className="text-base font-semibold text-gray-700">{address}</Text>
                    </View>
                ) : null}

                <Text className="text-blue-400 text-2xl mt-8 mb-3">Nacin placanja</Text>
                <View>
                    {/* Pouzeće */}
                    <TouchableOpacity onPress={() => setSelected("cash")}>
                        <View className="flex-row items-center gap-4">
                            <FontAwesome
                                name="truck"
                                size={32}
                                color={selected === "cash" ? "#2563EB" : "grey"}
                            />
                            <Text className={selected === "cash" ? "text-blue-600 font-semibold text-lg" : "text-gray-500 text-lg"}>
                                Pouzećem
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View className="border border-gray-200 my-4" />

                    {/* Kartica */}
                    <TouchableOpacity onPress={() => setSelected("card")}>
                        <View className="flex-row items-center gap-4">
                            <FontAwesome
                                name="credit-card"
                                size={32}
                                color={selected === "card" ? "#2563EB" : "grey"}
                            />
                            <Text className={selected === "card" ? "text-blue-600 font-semibold" : "text-gray-500"}>
                                Platnom karticom
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {/* Vreme preuzimanja */}
                    <Text className="text-blue-400 text-2xl mt-8 mb-3">Vreme preuzimanja</Text>
                    <View className="bg-blue-400 rounded-xl flex-col justify-center items-center gap-7 p-5">
                        <View className="flex-row items-center justify-center gap-4 " >
                            <FontAwesome
                                name="truck"
                                size={32}
                                color={"white"}
                            />
                            <Text className="text-white text-xl">
                                Preuzimanje poridzbine
                            </Text>
                        </View>
                        <TouchableOpacity className="bg-white rounded-full flex w-[80%]" onPress={() => setModalVisible(true)}>
                            {selectedTime ? <Text className="text-gray-400 text-xl py-2 text-center">{selectedTime}</Text> : <Text className="text-gray-400 text-xl py-2 text-center">Izaberi vreme</Text>}
                        </TouchableOpacity>
                        <Text className="text-white text-xl">
                            Izaberite vreme preuzimanja porudzbine
                        </Text>
                        <TimePickerModal
                            isVisible={isModalVisible}
                            onClose={() => setModalVisible(false)}
                            onTimeSelect={handleTimeSelect}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={handleConfirmOrder} className="flex-row justify-center items-center mt-16 bg-blue-400 rounded-full">
                    <Text className="text-2xl text-white text-center font-bold my-4">Potvrdi porudzbinu</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CartScreen;
