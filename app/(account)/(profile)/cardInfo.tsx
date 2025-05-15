import HeaderNav from "@/components/Header";
import { images } from "@/constants/images";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const CARD_NUMBER_REGEX = /^\d{16}$/;

const Cardscreen = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [cards, setCards] = useState<string[]>(["8228-2828-2828-2828"]);
  const [expiry, setExpiry] = useState("");
  const [addingCard, setAddingCard] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState("");
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (cards.length === 1) {
      setSelectedCardIndex(0);
    }
  }, [cards]);

  const formatCardInput = (input: string) => {
    const digitsOnly = input.replace(/\D/g, "");
    const formatted =
      digitsOnly
        .match(/.{1,4}/g)
        ?.join("-")
        .slice(0, 19) || "";
    return formatted;
  };

  const isValidCard = (formattedCard: string) => {
    const rawCard = formattedCard.replace(/-/g, "");
    return CARD_NUMBER_REGEX.test(rawCard);
  };

  const addCard = () => {
    if (!isValidCard(newCardNumber)) {
      alert("Card number must be exactly 16 digits.");
      return;
    }

    setCards([...cards, newCardNumber]);
    setNewCardNumber("");
    setExpiry("");
    setAddingCard(false);
  };

  const formatExpiry = (input: string) => {
    const digits = input.replace(/\D/g, "").slice(0, 4);
    if (digits.length < 3) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const isValidExpiry = (input: string) => {
    return /^\d{2}\/\d{2}$/.test(input);
  };

  const deleteCard = (index: number) => {
    const updated = [...cards];
    updated.splice(index, 1);
    setCards(updated);
  };

  return (
    <View className="flex-1">
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
            className="h-60"
          />
        </View>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          className="flex-1 rounded-t-[20px] bg-white -mt-5"
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <View className="pt-10 pb-3 px-12">
            <Text className="text-3xl text-blue-400 text-left mb-6">Cards</Text>

            {cards.map((cardNumber, index) => {
              const isSelected = selectedCardIndex === index;

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedCardIndex(index)}
                  className={`flex flex-row items-center justify-between mb-4`}
                >
                  <View className="flex flex-row gap-5 items-center">
                    <FontAwesome
                      name="credit-card-alt"
                      size={28}
                      color={isSelected ? "#3B82F6" : "#000"}
                    />
                    <Text
                      className={`text-xl ${
                        isSelected ? "text-blue-500" : "text-black"
                      }`}
                    >
                      {cardNumber}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => deleteCard(index)}>
                    <FontAwesome name="trash" size={28} />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}

            {/* Add New Card Button or Input */}
            {!addingCard ? (
              <TouchableOpacity
                onPress={() => setAddingCard(true)}
                className="flex flex-row items-center justify-between mt-4"
              >
                <View className="flex flex-row gap-5 items-center">
                  <FontAwesome name="credit-card-alt" size={28} />
                  <Text className="text-xl">Dodaj novu karticu</Text>
                </View>
                <FontAwesome name="chevron-right" size={16} />
              </TouchableOpacity>
            ) : (
              <View className="mt-4">
                <TextInput
                  placeholder="Card number"
                  value={newCardNumber}
                  onChangeText={(text) =>
                    setNewCardNumber(formatCardInput(text))
                  }
                  keyboardType="number-pad"
                  maxLength={19}
                  className="border-b border-gray-300 text-base pb-2 mb-6"
                  style={styles.input}
                />
                <TextInput
                  placeholder="MM/YY"
                  value={expiry}
                  onChangeText={(text) => setExpiry(formatExpiry(text))}
                  keyboardType="number-pad"
                  maxLength={5}
                  className="border-b border-gray-300 text-base pb-2 mb-6"
                  style={styles.input}
                />
                <View className="flex flex-col gap-3 mt-2">
                  <TouchableOpacity
                    onPress={addCard}
                    className={`w-full py-5 rounded-full mb-6 ${
                      isValidCard(newCardNumber) && isValidExpiry(expiry)
                        ? "bg-blue-400"
                        : "bg-blue-200"
                    }`}
                    disabled={
                      !isValidCard(newCardNumber) || !isValidExpiry(expiry)
                    }
                  >
                    <Text className="text-white text-center text-xl">
                      Dodaj novu karticu
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setAddingCard(false);
                      setNewCardNumber("");
                      setExpiry("");
                    }}
                    className="bg-red-400 w-full py-5 rounded-full mb-6"
                  >
                    <Text className="text-white text-center text-xl">
                      Odusani
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 4,
  },
});

export default Cardscreen;
