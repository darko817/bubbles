import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { Stack } from "expo-router";

export default function WorkerLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="newOrders"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="acceptedOrders"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </CartProvider>
    </AuthProvider>
  );
}
