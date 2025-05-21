import HeaderNav from "@/components/Header";
import { images } from "@/constants/images";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const privacy = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  return (
    <View className="flex-1">
      <View className="flex-1">
        <HeaderNav
          onPress={() => router.back()}
          icon="arrow-left"
          username={user?.name}
          noCart
          client
        />

        <View className="-mt-4 -z-10 relative">
          <Image
            source={images.privacyImage}
            resizeMode="cover"
            className="h-60 w-full"
          />
        </View>

        <View className="flex-1 rounded-t-[20px] bg-white -mt-5 px-12 pb-10">
          <Text className="text-blue-400 text-2xl my-6 font-bold">Privacy</Text>

          <View className="bg-blue-400 p-5 rounded-xl">
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="text-lg text-white pb-12">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur.Sed ut perspiciatis unde omnis iste
                natus error sit voluptatem accusantium doloremque laudantium,
                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
                et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                non numquam eius modi tempora incidunt ut labore et dolore
                magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,
                quis nostrum exercitationem ullam corporis suscipit laboriosam,
                nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                iure reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur
              </Text>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default privacy;
