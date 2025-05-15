import CustomCheckbox from "@/components/Checkbox";
import Input from "@/components/Input";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const handleSignUp = async () => {
    router.push("/(auth)/login");
  };
  return (
    <View className="flex-1">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center items-center px-10 py-10 bg-white">
            <TouchableOpacity
              onPress={() => router.back()}
              className="absolute top-16 left-[20px]"
            >
              <Icon name="arrow-left" size={24} color="gray" />
            </TouchableOpacity>
            <Image
              source={{
                uri: "https://placehold.co/600x400/orange/white",
              }}
              className="w-[60%] h-52 rounded-lg bg-red-600 my-10"
              resizeMode="cover"
            />
            <View className="flex-col gap-6 w-full">
              <Input placeholder="Name*" value={name} onChangeText={setName} />
              <Input
                placeholder="Surname*"
                value={surname}
                onChangeText={setSurname}
              />
              <Input
                placeholder="Email*"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={email}
                onChangeText={setEmail}
              />
              <Input
                placeholder="Phone number*"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              <Input
                placeholder="Password*"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <View className="flex-row items-start">
                <CustomCheckbox
                  isChecked={isAgreed}
                  onToggle={() => setIsAgreed(!isAgreed)}
                />
                <Text className="ml-3 text-blue-400 underline">
                  Privacy policy
                </Text>
              </View>

              <TouchableOpacity
                disabled={!isAgreed}
                onPress={handleSignUp}
                className="bg-blue-400 w-full py-5 rounded-full mb-6"
              >
                <Text className="text-center text-white">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
});
