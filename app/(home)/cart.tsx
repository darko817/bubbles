import HeaderNav from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntIcon from "react-native-vector-icons/AntDesign";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const CartScreen = () => {
    const { cartItems, clearCart } = useCart();
    const router = useRouter();

    const groupedItems = cartItems.reduce((acc, item) => {
        if (!acc[item.service]) {
            acc[item.service] = {};
        }

        const key = `${item.text}-${item.price}`;
        if (!acc[item.service][key]) {
            acc[item.service][key] = { ...item, quantity: 1 };
        } else {
            acc[item.service][key].quantity += 1;
        }

        return acc;
    }, {} as Record<string, Record<string, (typeof cartItems)[0] & { quantity: number }>>);

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <HeaderNav icon="arrow-left" onPress={() => router.back()} title="Korpa" noCart />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                className="flex-1 rounded-t-[20px] bg-white px-12"
                contentContainerStyle={{ paddingBottom: 80 }}
            >
                {cartItems.length === 0 ? (
                    <View className="mt-20">
                        <Text className="text-center text-gray-400 text-xl">Korpa je prazna</Text>
                    </View>
                ) : (
                    <>
                        {Object.entries(groupedItems).map(([service, items]) => (
                            <View key={service} className="my-8">
                                <View className="flex-row gap-3 justify-center items-center bg-blue-400 rounded-xl py-4 mb-2">
                                    <MaterialIcon name="iron" size={32} color="white" />
                                    <Text className="text-xl font-semibold text-white">{service}</Text>
                                </View>
                                {Object.values(items).map((item, index) => (
                                    <View
                                        key={`${item.id}-${index}`}
                                        className="flex-row justify-between bg-gray-200 p-3 rounded-lg mb-2"
                                    >
                                        <Text className="text-base text-gray-700">
                                            {item.quantity > 1 ? `${item.quantity}x ` : ""}
                                            {item.text}
                                        </Text>
                                        <Text className="text-base text-gray-700">
                                            {item.price * item.quantity}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        ))}

                        <View className="mt-6 flex-row justify-between">
                            <Text className="text-2xl font-bold">Ukupno</Text>
                            <Text className="text-2xl font-bold">{total} RSD</Text>
                        </View>

                        <View className="flex-row justify-between border-b-2 border-gray-300 py-3" />

                        <TouchableOpacity
                            onPress={clearCart}
                            className="flex-row gap-4 justify-center items-center mt-6"
                        >
                            <AntIcon name="shoppingcart" size={32} color="grey" />
                            <Text className="text-2xl text-gray-400 text-center font-bold">
                                Isprazni korpu
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => router.replace("/(home)/cartInfo")}
                            className="flex-row justify-center items-center mt-16 bg-blue-400 rounded-full"
                        >
                            <Text className="text-2xl text-white text-center font-bold my-4">
                                Idi na plaćanje
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default CartScreen;
