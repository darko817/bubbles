import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function AuthLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <StatusBar hidden />
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="signUp"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </CartProvider>
    </AuthProvider>
  );
}
