import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { Stack } from "expo-router";
import "../i18n";
import "./globals.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <Stack>
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(home)/index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(home)/serviceByKg"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(home)/serviceByItem"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(home)/cart"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(home)/cartInfo"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(account)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(home)/orderConfirmation"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(home)/orderStatus"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(home)/allOrderStatus"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(home)/(worker)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(home)/(driver)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  );
}
