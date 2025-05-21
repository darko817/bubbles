import { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  icon?: ImageSourcePropType;
  secureTextEntry?: boolean;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "decimal-pad";
  textContentType?:
    | "none"
    | "username"
    | "password"
    | "emailAddress"
    | "telephoneNumber";
}

const getInputStyle = (): StyleProp<TextStyle> => ({
  height: Platform.OS === "android" ? 40 : 36,
  paddingVertical: Platform.OS === "android" ? 0 : 4,
});

const Input = ({
  placeholder,
  value,
  onChangeText,
  onPress,
  icon,
  secureTextEntry,
  keyboardType,
  textContentType,
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <View className="flex-row items-center rounded-full px-5 py-2 bg-gray-100">
      {icon && (
        <Image
          source={icon}
          className="w-5 h-5"
          resizeMode="contain"
          tintColor="#AB8BFF"
        />
      )}
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-black"
        style={getInputStyle()}
        placeholderTextColor="#949597"
        secureTextEntry={isPasswordVisible}
        keyboardType={keyboardType}
        textContentType={textContentType}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon
            name={isPasswordVisible ? "eye" : "eye-slash"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;
