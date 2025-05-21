import HeaderNav from "@/components/Header";
import InCartBtn from "@/components/InCartBtn";
import ServiceButton from "@/components/ServiceButton";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { AuthContext } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const { showAddedOverlay, overlayMessage } = useCart();
  const { user } = useContext(AuthContext);
  const router = useRouter();

  /* if (loading) return null;

  if (user) {
    return <Redirect href="/(home)" />;
  } */

  /*  console.log("user:", user);
  console.log("loading:", loading); */

  return (
    <View className="flex-1">
      <HeaderNav
        icon="menu"
        onPress={() => router.replace("/(account)")}
        client
      />
      <View className="-mt-4 -z-10 relative">
        <Image
          source={images.headerImage}
          resizeMode="cover"
          className="h-60 w-full"
        />
        {showAddedOverlay && (
          <View className="absolute w-full h-full justify-center items-center z-50">
            <View className="absolute w-full h-full bg-black opacity-30" />
            <View>
              <Text className="text-white text-2xl font-semibold mt-10">
                {overlayMessage}
              </Text>
            </View>
          </View>
        )}
      </View>
      <ScrollView className=" rounded-t-[20px] bg-white -mt-5">
        <View className=" py-10 px-10">
          <Text className="text-3xl text-blue-400 text-center">
            Dodavanje usluga
          </Text>
          <Text className="text-lg text-gray-500 text-center mt-2">
            Tip usluge
          </Text>
        </View>
        <View className="flex-col gap-6 px-10 pb-12">
          <ServiceButton
            text="Pranje po artiklu"
            icon="chevron-right"
            image={icons.washerIcon}
            onPress={() =>
              router.push({
                pathname: "/(home)/serviceByItem",
                params: { service: "Pranje po artiklu" },
              })
            }
          />

          <ServiceButton
            text="Pranje po kg"
            icon="chevron-right"
            image={icons.shirtIcon}
            onPress={() =>
              router.push({
                pathname: "/(home)/serviceByKg",
                params: { service: "Pranje po kg" },
              })
            }
          />
          <ServiceButton
            text="Peglanje"
            icon="chevron-right"
            image={icons.ironIcon}
            onPress={() =>
              router.push({
                pathname: "/(home)/serviceByKg",
                params: { service: "Peglanje" },
              })
            }
          />
          <ServiceButton
            text="Premium pranje"
            icon="chevron-right"
            image={icons.styleIcon}
            onPress={() =>
              router.push({
                pathname: "/(home)/serviceByKg",
                params: { service: "Premium pranje" },
              })
            }
          />
        </View>
      </ScrollView>
      <InCartBtn onPress={() => router.push("/(home)/cart")} />
    </View>
  );
}
