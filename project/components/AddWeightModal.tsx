import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
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
  const styles = getStyles(colors);
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Ajouter un poids</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Poids (kg)"
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
          />
          <TouchableOpacity style={[styles.addButton, { opacity: value ? 1 : 0.5 }]} onPress={handleSave} disabled={!value}>
            <Text style={styles.addButtonText}>Enregistrer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const getStyles = (colors: import('@/context/ThemeContext').ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      paddingTop: 60,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    closeButton: {
      padding: 8,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    input: {
      backgroundColor: colors.card,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 16,
    },
    addButton: {
      backgroundColor: '#10B981',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
    },
    addButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
