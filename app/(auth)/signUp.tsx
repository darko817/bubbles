import Bubble from "@/components/Bubbles";
import CustomCheckbox from "@/components/Checkbox";
import Input from "@/components/Input";
import { images } from "@/constants/images";
import { signUpSchema } from "@/helpers/validation";
import { SignUpErrors } from "@/types";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { z } from "zod";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [errors, setErrors] = useState<SignUpErrors>({});

  const handleSignUp = async () => {
    const formData = {
      name,
      surname,
      phoneNumber,
      email,
      password,
    };

    try {
      signUpSchema.parse(formData);
      setErrors({});
      if (isAgreed) {
        console.log("Form is valid and agreed!", formData);
        router.push("/(auth)/login");
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          agreement: "You must agree to the privacy policy.",
        }));
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
        console.log("Validation Errors:", newErrors);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const isFormValid = () => {
    const formData = { name, surname, phoneNumber, email, password };
    try {
      signUpSchema.parse(formData);
      return true;
    } catch (error) {
      return false;
    }
  };

  const isSignUpButtonEnabled = isAgreed && isFormValid();

  return (
    <View className="flex-1 relative bg-white">
      <View className="absolute w-full h-full z-[1]">
        <Bubble image={images.bubble1} />
        <Bubble image={images.bubble2} />
        <Bubble image={images.bubble3} />
        <Bubble image={images.bubble1} />
        <Bubble image={images.bubble2} />
        <Bubble image={images.bubble4} />
        <Bubble image={images.bubble1} />
        <Bubble image={images.bubble2} />
        <Bubble image={images.bubble4} />
        <Bubble image={images.bubble1} />
        <Bubble image={images.bubble4} />
        <Bubble image={images.bubble3} />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="z-10"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center items-center px-10 py-10 ">
            <TouchableOpacity
              onPress={() => router.back()}
              className="absolute top-16 left-[20px]"
            >
              <Icon name="arrow-left" size={24} color="gray" />
            </TouchableOpacity>
            <Image source={images.Logo} className="mb-10" resizeMode="cover" />
            <View className="flex-col gap-6 w-full">
              <Input placeholder="Name*" value={name} onChangeText={setName} />
              {errors.name && (
                <Text className="text-red-500 text-xs mt-[-10px]">
                  {errors.name}
                </Text>
              )}
              <Input
                placeholder="Surname*"
                value={surname}
                onChangeText={setSurname}
              />
              {errors.surname && (
                <Text className="text-red-500 text-xs mt-[-10px]">
                  {errors.surname}
                </Text>
              )}
              <Input
                placeholder="Email*"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={email}
                onChangeText={setEmail}
              />
              {errors.email && (
                <Text className="text-red-500 text-xs mt-[-10px]">
                  {errors.email}
                </Text>
              )}
              <Input
                placeholder="Phone number*"
                value={phoneNumber}
                onChangeText={(text) =>
                  setPhoneNumber(text.replace(/[^0-9]/g, ""))
                }
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
              />
              {errors.phoneNumber && (
                <Text className="text-red-500 text-xs mt-[-10px]">
                  {errors.phoneNumber}
                </Text>
              )}
              <Input
                placeholder="Password*"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              {errors.password && (
                <Text className="text-red-500 text-xs mt-[-10px]">
                  {errors.password}
                </Text>
              )}

              <View className="flex-row items-start">
                <CustomCheckbox
                  isChecked={isAgreed}
                  onToggle={() => {
                    setIsAgreed(!isAgreed);
                    // Clear agreement error if checked
                    if (!isAgreed && errors.agreement) {
                      setErrors((prevErrors) => {
                        const { agreement, ...rest } = prevErrors;
                        return rest;
                      });
                    }
                  }}
                />
                <TouchableOpacity
                  onPress={() => console.log("Navigate to Privacy Policy")}
                >
                  <Text className="ml-3 text-blue-400 underline">
                    Privacy policy
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.agreement && (
                <Text className="text-red-500 text-xs ml-8 mt-[-10px]">
                  {errors.agreement}
                </Text>
              )}

              <TouchableOpacity
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
