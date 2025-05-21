import { addDays, format, isSunday } from "date-fns";
import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import WheelPickerExpo from "react-native-wheel-picker-expo";

const OPEN_HOUR = 7;
const CLOSE_HOUR = 22;

interface DateTimePickerProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (date: string, time: string) => void;
  selectedTime?: string;
  selectedDate?: string;
}

const DateTimePickerModal = ({
  isVisible,
  onClose,
  onSelect,
  selectedTime,
  selectedDate,
}: DateTimePickerProps) => {
  const [timeSlots, setTimeSlots] = useState<
    { label: string; value: string }[]
  >([]);
  const [dateSlots, setDateSlots] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  useEffect(() => {
    const generateTimeSlots = () => {
      const slots = [];
      for (let i = OPEN_HOUR; i < CLOSE_HOUR; i++) {
        const start = new Date(0, 0, 0, i, 0);
        const end = new Date(0, 0, 0, i + 1, 0);
        slots.push({
          label: `${format(start, "HH:mm")} - ${format(end, "HH:mm")}`,
          value: `${format(start, "HH:mm")}-${format(end, "HH:mm")}`,
        });
      }
      const index = selectedTime
        ? slots.findIndex((slot) => slot.value === selectedTime)
        : new Date().getHours() - OPEN_HOUR;

      setSelectedTimeIndex(index >= 0 ? index : 0);
      return slots;
    };

    const generateDateSlots = () => {
      const slots = [];
      let dayOffset = 0;

      while (slots.length < 5) {
        const date = addDays(new Date(), dayOffset);
        if (!isSunday(date)) {
          const formatted = format(date, "dd-MM-yyyy");
          slots.push({ label: formatted, value: formatted });
        }
        dayOffset++;
      }

      const index = selectedDate
        ? slots.findIndex((slot) => slot.value === selectedDate)
        : 0;

      setSelectedDateIndex(index >= 0 ? index : 0);
      return slots;
    };

    setTimeSlots(generateTimeSlots());
    setDateSlots(generateDateSlots());
  }, [isVisible, selectedTime, selectedDate]);

  const handleConfirm = () => {
    const selectedDateValue = dateSlots[selectedDateIndex]?.value;
    const selectedTimeValue = timeSlots[selectedTimeIndex]?.value;
    if (selectedDateValue && selectedTimeValue) {
      onSelect(selectedDateValue, selectedTimeValue);
      onClose();
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <View className="flex flex-col bg-white rounded-t-3xl">
          <View className="px-5 pt-3">
            <TouchableOpacity onPress={handleConfirm}>
              <Text className="text-xl text-right text-blue-400">Završi</Text>
            </TouchableOpacity>
          </View>
          <View className="border-b border-gray-400 py-2" />
          <View className="flex-row justify-evenly py-4">
            <WheelPickerExpo
              height={250}
              width={200}
              initialSelectedIndex={selectedDateIndex}
              items={dateSlots}
              onChange={({ index }) => setSelectedDateIndex(index)}
            />
            <WheelPickerExpo
              height={250}
              width={200}
              initialSelectedIndex={selectedTimeIndex}
              items={timeSlots}
              onChange={({ index }) => setSelectedTimeIndex(index)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DateTimePickerModal;
