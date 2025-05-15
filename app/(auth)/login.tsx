import CustomCheckbox from "@/components/Checkbox";
import Input from "@/components/Input";
import { AuthContext } from "@/context/AuthContext";
import { User } from "@/types";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

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

  const handleLogin = async () => {
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
  };
  return (
    <View className="flex-1">
      <View className="flex-1 justify-center items-center px-10 bg-white">
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
          className="w-[60%] h-52 rounded-lg bg-red-600 mb-10"
          resizeMode="cover"
        />
        <View className="flex-col gap-6 w-full">
          <Input
            placeholder="Email"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
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
