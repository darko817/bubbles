import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface ServiceBtnProps {
  image?: ImageSourcePropType;
  text: string;
  icon?: string;
  onPress?: () => void;
  weight?: boolean;
  price?: number;
  bgColor?: string;
  textColor?: string;
  selected?: boolean;
  disabled?: boolean;
}

const ServiceButton = ({
  image,
  text,
  icon,
  onPress,
  weight,
  price,
  bgColor,
  textColor,
  selected,
  disabled,
}: ServiceBtnProps) => {
  return (
    <>
      {weight ? (
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
          className="w-full flex-row gap-4 justify-center items-center px-4 py-4 border border-blue-400 rounded-3xl"
          style={{
            backgroundColor: selected ? "#60a5fa" : bgColor || "white",
          }}
        >
          <Text
            style={{
              color: selected ? "white" : textColor || "#9ca3af",
            }}
            className="text-center text-xl"
          >
            {text}
          </Text>
          <Text
            style={{
              color: selected ? "white" : textColor || "#9ca3af",
            }}
            className="text-center text-xl"
          >
            {price?.toFixed(2)}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          className="w-full flex-row justify-between items-center px-4 py-2 border border-blue-400 rounded-3xl"
        >
          <View className="flex-row items-center gap-8">
            {image && <Image source={image} className="h-20 w-16" />}
            <Text className="text-center text-xl text-gray-400">{text}</Text>
          </View>
          {icon && <Icon name={icon} color="gray" />}
        </TouchableOpacity>
      )}
    </>
  );
};

export default ServiceButton;
