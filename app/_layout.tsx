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
          {/*   <StatusBar hidden /> */}
          <Stack>
            <Stack.Screen
              name="(auth)/index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(auth)/login"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(auth)/signUp"
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
              name="(home)/service"
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
