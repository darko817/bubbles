import HeaderNav from '@/components/Header';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const orderHistory = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    return (
        <SafeAreaView>
            <HeaderNav
                onPress={() => router.back()}
                icon="arrow-left"
                username={user?.name}
                noCart
            />
            <View className='h-full justify-center items-center'>
                <Text className='text-red-600 '>oderHistory</Text>
            </View>
        </SafeAreaView>
    )
}

export default orderHistory
