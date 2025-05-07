import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="cardInfo" options={{ headerShown: false }} />
        <Stack.Screen name="orderHistory" options={{ headerShown: false }} />
        <Stack.Screen name="deliveryAddress" options={{ headerShown: false }} />
        <Stack.Screen name="privacy" options={{ headerShown: false }} />
        <Stack.Screen name="language" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
