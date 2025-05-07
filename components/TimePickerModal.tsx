import { format } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

const OPEN_HOUR = 7;
const CLOSE_HOUR = 22;

type TimeSlot = {
    id: number;
    label: string;
    value: string;
    isCurrent: boolean;
};

const TimePickerModal = ({ isVisible, onClose, onTimeSelect }: any) => {
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [initialScrollIndex, setInitialScrollIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        const generateTimeSlots = () => {
            const now = new Date();
            const currentHour = now.getHours();
            const slots = [];

            for (let i = OPEN_HOUR; i < CLOSE_HOUR; i++) {
                const start = new Date(0, 0, 0, i, 0);
                const end = new Date(0, 0, 0, i + 1, 0);
                slots.push({
                    id: i,
                    label: `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`,
                    value: `${format(start, 'HH:mm')}-${format(end, 'HH:mm')}`,
                    isCurrent: i === currentHour,
                });
            }

            const currentSlotIndex = slots.findIndex((slot) => slot.isCurrent);
            setInitialScrollIndex(currentSlotIndex >= 0 ? currentSlotIndex : 0);

            return slots;
        };

        setTimeSlots(generateTimeSlots());
    }, [isVisible]);

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View className="h-[30%]"
                    style={{
                        backgroundColor: 'white',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        shadowColor: '#000',
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                    }}
                >
                    <TouchableOpacity onPress={onClose}>
                        <Text className="bg-gray-100 text-blue-400 text-xl text-right py-3 pr-5">Završi</Text>
                    </TouchableOpacity>

                    <FlatList
                        className="px-5"
                        ref={flatListRef}
                        data={timeSlots}
                        initialScrollIndex={initialScrollIndex}
                        keyExtractor={(item) => item.id.toString()}
                        getItemLayout={(data, index) => ({
                            length: 50,
                            offset: 50 * index,
                            index,
                        })}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    onTimeSelect(item.value);
                                    onClose();
                                }}
                                style={{
                                    paddingVertical: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#ddd',
                                    backgroundColor: item.isCurrent ? '#e5e7eb' : 'transparent',
                                }}
                            >
                                <Text className="text-xl text-center">{item.label}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default TimePickerModal;
