import Bubble from "@/components/Bubbles";
import CustomCheckbox from "@/components/Checkbox";
import Input from "@/components/Input";
import { images } from "@/constants/images";
import { AuthContext } from "@/context/AuthContext";
import { loginSchema } from "@/helpers/validation";
import { User } from "@/types";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { z } from "zod";

const DUMMY_USER: User = {
  email: "t@t.com",
  password: "123456",
  name: "Test User",
  phone: "+381",
  role: "client",
};

const Login = () => {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleLogin = async () => {
    const formData = { email, password };

    try {
      loginSchema.parse(formData);
      setErrors({});

      /*  const { user, token } = await logIn(email, password);
      await login(user, token);
      Promeni DUMMY_USER.role u user.role i izbrisi prve dve linije ispod
      */

      if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
        await login(DUMMY_USER, "dummy-token");
        console.log("Logged in successfully");

        if (DUMMY_USER.role === "worker") {
          router.replace("/(home)/(worker)");
        } else if (DUMMY_USER.role === "client") {
          router.replace("/(home)");
        } else if (DUMMY_USER.role === "driver") {
          router.replace("/(home)/(driver)");
        }
      } else {
        Alert.alert("Login Failed", "Invalid email or password");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <View className="flex-1 relative">
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
      <View className="flex-1 justify-center items-center px-10 bg-white">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-16 left-[20px] z-10"
        >
          <Icon name="arrow-left" size={24} color="gray" />
        </TouchableOpacity>
        <Image source={images.Logo} className="mb-10 z-10" resizeMode="cover" />
        <View className="flex-col gap-6 w-full z-10">
          <Input
            placeholder="Email"
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
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {errors.password && (
            <Text className="text-red-500 text-xs mt-[-10px]">
              {errors.password}
            </Text>
          )}
          <Text className="text-blue-400 text-xl text-right">
            Forgot password?
          </Text>
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-blue-400 w-full py-5 rounded-full mb-6"
          >
            <Text className="text-center text-white">Login</Text>
          </TouchableOpacity>
          <View className="flex-row justify-end items-center w-full">
            <CustomCheckbox
              isChecked={isAgreed}
              onToggle={() => setIsAgreed(!isAgreed)}
            />
            <Text className="ml-3 text-blue-400 ">Remeber me</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
