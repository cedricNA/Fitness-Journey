import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { X } from 'lucide-react-native';
import { getWeights, saveWeights, WeightEntry } from '@/storage';
import { useTheme } from '@/context/ThemeContext';

interface AddWeightModalProps {
  visible: boolean;
  onClose: () => void;
  onSaved?: (weights: WeightEntry[]) => void;
}

export default function AddWeightModal({ visible, onClose, onSaved }: AddWeightModalProps) {
  const { colors } = useTheme();
  const [value, setValue] = useState('');

  const handleSave = async () => {
    const weight = parseFloat(value.replace(',', '.'));
    if (isNaN(weight)) {
      return;
    }
    const current = await getWeights();
    const entry = { date: new Date().toISOString(), value: weight };
    const updated = [...current, entry];
    await saveWeights(updated);
    onSaved && onSaved(updated);
    setValue('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1" style={{ backgroundColor: colors.background }}>
        <View
          className="flex-row items-center justify-between border-b p-5 pt-16"
          style={{ backgroundColor: colors.card, borderColor: colors.border }}
        >
          <Text className="text-lg font-bold" style={{ color: colors.text }}>
            Ajouter un poids
          </Text>
          <TouchableOpacity className="p-2" onPress={onClose}>
            <X size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <View className="flex-1 p-5">
          <TextInput
            className="mb-4 rounded-xl border px-4 py-3 text-base"
            style={{ borderColor: colors.border, backgroundColor: colors.card, color: colors.text }}
            placeholder="Poids (kg)"
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
          />
          <TouchableOpacity
            className="items-center rounded-xl bg-emerald-500 p-4"
            style={{ opacity: value ? 1 : 0.5 }}
            onPress={handleSave}
            disabled={!value}
          >
            <Text className="text-base font-bold text-white">Enregistrer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

