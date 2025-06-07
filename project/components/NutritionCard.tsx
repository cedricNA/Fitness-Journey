import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Plus, Minus } from 'lucide-react-native';

interface NutritionCardProps {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity?: number;
  unit?: string;
  onAdd?: () => void;
  onRemove?: () => void;
  showControls?: boolean;
}

export default function NutritionCard({
  name,
  calories,
  protein,
  carbs,
  fat,
  quantity = 1,
  unit = 'portion',
  onAdd,
  onRemove,
  showControls = false
}: NutritionCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        {showControls && (
          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton} onPress={onRemove}>
              <Minus size={16} color="#6B7280" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity} {unit}</Text>
            <TouchableOpacity style={styles.controlButton} onPress={onAdd}>
              <Plus size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <View style={styles.nutritionInfo}>
        <View style={styles.caloriesSection}>
          <Text style={styles.caloriesValue}>{Math.round(calories * quantity)}</Text>
          <Text style={styles.caloriesLabel}>kcal</Text>
        </View>
        
        <View style={styles.macrosSection}>
          <View style={styles.macroItem}>
            <View style={[styles.macroIndicator, { backgroundColor: '#10B981' }]} />
            <Text style={styles.macroLabel}>Protéines</Text>
            <Text style={styles.macroValue}>{Math.round(protein * quantity)}g</Text>
          </View>
          
          <View style={styles.macroItem}>
            <View style={[styles.macroIndicator, { backgroundColor: '#F59E0B' }]} />
            <Text style={styles.macroLabel}>Glucides</Text>
            <Text style={styles.macroValue}>{Math.round(carbs * quantity)}g</Text>
          </View>
          
          <View style={styles.macroItem}>
            <View style={[styles.macroIndicator, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.macroLabel}>Lipides</Text>
            <Text style={styles.macroValue}>{Math.round(fat * quantity)}g</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    minWidth: 60,
    textAlign: 'center',
  },
  nutritionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caloriesSection: {
    alignItems: 'center',
    marginRight: 20,
  },
  caloriesValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  caloriesLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  macrosSection: {
    flex: 1,
    gap: 8,
  },
  macroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  macroIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  macroLabel: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
  },
  macroValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
});