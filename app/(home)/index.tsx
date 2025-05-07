import HeaderNav from "@/components/Header";
import InCartBtn from "@/components/InCartBtn";
import ServiceButton from "@/components/ServiceButton";
import { images } from "@/constants/images";
import { useCart } from "@/context/CartContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { showAddedOverlay, cartItems, overlayMessage } = useCart();
  const { user, loading } = useProtectedRoute();
  /*  const { logout } = useContext(AuthContext); */
  const router = useRouter();

  /* if (loading) return null;

  if (user) {
    return <Redirect href="/(home)" />;
  } */

  /*  console.log("user:", user);
  console.log("loading:", loading); */

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <HeaderNav icon="menu" onPress={() => router.replace("/(account)")} />
      <View className="-mt-4 -z-10 relative">
        <Image
          source={images.headerImage}
          resizeMode="cover"
          className="h-60"
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

          {/* Pretopstavljam da svaki otvara ipak drigaciji screen, ali za sada su isti, pa cu kasnije Flat list */}
          <ServiceButton
            text="Pranje po artiklu"
            icon="chevron-right"
            image={images.washer}
            onPress={() => router.push({ pathname: "/(home)/service", params: { service: "Pranje po artiklu" } })}
          />
          {/* {-----------------------------------------------------} */}
          <ServiceButton
            text="Pranje po kg"
            icon="chevron-right"
            image={images.washer}
            onPress={() => router.push({ pathname: "/(home)/service", params: { service: "Pranje po kg" } })}
          />
          <ServiceButton
            text="Sredjivanje odece"
            icon="chevron-right"
            image={images.washer}
            onPress={() => router.push("/(home)/service")}
          />
          <ServiceButton
            text="Peglanje"
            icon="chevron-right"
            image={images.washer}
            onPress={() => router.push("/(home)/service")}
          />
          <ServiceButton
            text="Premium pranje"
            icon="chevron-right"
            image={images.washer}
            onPress={() => router.push("/(home)/service")}
          />
          <ServiceButton
            text="Super pranje po kilogramu"
            icon="chevron-right"
            image={images.washer}
            onPress={() => router.push("/(home)/service")}
          />
          <ServiceButton
            text="Super po artiklu"
            icon="chevron-right"
            image={images.washer}
            onPress={() => router.push("/(home)/service")}
          />
          <ServiceButton
            text="Pranje"
            icon="chevron-right"
            image={images.washer}
            onPress={() => router.push("/(home)/service")}
          />
        </View>
      </ScrollView>
      <InCartBtn onPress={() => router.push('/(home)/cart')} />
    </SafeAreaView>
  );
}
