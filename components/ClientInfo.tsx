import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ClientInfoProps {
    text?: string;
    value?: string;
    onChange?: (text: string) => void;
    onPress?: () => void;
    icon?: boolean;
    email?: boolean;
    selection?: { start: number; end: number };
    onFocus?: () => void;
}

const ClientInfo: React.FC<ClientInfoProps> = ({
    text,
    value,
    onChange,
    onPress,
    icon,
    email,
    selection,
    onFocus,
}) => {
    return (
        <>
            {text ? (
                <Pressable onPress={onPress}>
                    <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center gap-6">
                            <Icon name="user" size={32} color="#b3aeae" />
                            <Text className="text-xl text-gray-400">{text}</Text>
                        </View>
                        {icon && <Icon name="chevron-right" size={16} color="#b3aeae" />}
                    </View>
                </Pressable>
            ) : (
                <View className="flex-row justify-between items-center w-full">
                    <View className="flex-row items-center gap-6 w-full">
                        <Icon name="user" size={32} color="#b3aeae" />
                        <TextInput
                            className="flex-1 text-xl text-gray-400 border-b border-b-white pb-1"
                            value={value}
                            onChangeText={onChange}
                            onFocus={onFocus}
                            selection={selection}
                            editable={!email}
                            keyboardType="phone-pad"
                            placeholder={email ? "Email" : "Phone Number"}
                            placeholderTextColor="#999"
                        />
                    </View>
                    {icon && <Icon name="chevron-right" size={16} color="#b3aeae" />}
                </View>
            )}
        </>
    );
};

export default ClientInfo;
