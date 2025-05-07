import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface CheckboxProps {
  isChecked: boolean;
  onToggle: () => void;
}

const CustomCheckbox = ({ isChecked, onToggle }: CheckboxProps) => (
  <TouchableOpacity
    onPress={onToggle}
    className={`w-6 h-6 rounded-sm justify-center items-center border-2 ${
      isChecked ? "bg-blue-400 border-blue-400" : "bg-white border-gray-300"
    }`}
  >
    {isChecked ? (
      <Text className="text-white text-l -mt-[4px]">✔</Text>
    ) : (
      <Text className="text-gray-500 text-xl"></Text>
    )}
  </TouchableOpacity>
);

export default CustomCheckbox;
