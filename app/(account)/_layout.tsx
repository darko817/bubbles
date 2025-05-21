import { Stack } from "expo-router";

export default function AccountLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="orders"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="cart"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="faq"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="(profile)" options={{ headerShown: false }} />
        <Stack.Screen
          name="support"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="notifications"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="language"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="logout"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
