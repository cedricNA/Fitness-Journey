import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Plus, Search, Camera, Clock, Zap, Target, ChevronRight, Utensils, X } from 'lucide-react-native';
import NutritionCard from '@/components/NutritionCard';
import { FoodItem } from '@/types';
import { getMeals, saveMeals } from '@/storage';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

export default function Meals() {
  const { type } = useLocalSearchParams<{ type?: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'snack' | 'dinner'>(
    (type as 'breakfast' | 'lunch' | 'snack' | 'dinner') || 'breakfast'
  );
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [todayMeals, setTodayMeals] = useState<FoodItem[]>([]);
  const { colors } = useTheme();

  useEffect(() => {
    getMeals().then(setTodayMeals);
  }, []);

  const mealTypes = [
    { key: 'breakfast', label: 'Petit-déj', emoji: '🥣', target: 350 },
    { key: 'lunch', label: 'Déjeuner', emoji: '🥗', target: 450 },
    { key: 'snack', label: 'Collation', emoji: '🍎', target: 200 },
    { key: 'dinner', label: 'Dîner', emoji: '🍽️', target: 500 }
  ];

  const suggestions: FoodItem[] = [
    { name: 'Œufs brouillés aux épinards', calories: 280, protein: 20, carbs: 8, fat: 18, category: 'breakfast' },
    { name: 'Yaourt grec aux myrtilles', calories: 150, protein: 15, carbs: 20, fat: 2, category: 'breakfast' },
    { name: 'Toast avocat complet', calories: 220, protein: 8, carbs: 25, fat: 12, category: 'breakfast' },
    { name: 'Wrap au thon', calories: 380, protein: 25, carbs: 32, fat: 15, category: 'lunch' },
    { name: 'Quinoa aux légumes', calories: 320, protein: 12, carbs: 55, fat: 8, category: 'lunch' },
    { name: 'Salade de lentilles', calories: 290, protein: 18, carbs: 40, fat: 6, category: 'lunch' },
    { name: 'Amandes (30g)', calories: 170, protein: 6, carbs: 6, fat: 15, category: 'snack' },
    { name: 'Pomme + beurre d\'amande', calories: 190, protein: 4, carbs: 25, fat: 8, category: 'snack' },
    { name: 'Yaourt grec nature', calories: 100, protein: 17, carbs: 6, fat: 0, category: 'snack' },
    { name: 'Saumon grillé + brocolis', calories: 420, protein: 45, carbs: 12, fat: 22, category: 'dinner' },
    { name: 'Poulet rôti + légumes', calories: 380, protein: 40, carbs: 15, fat: 18, category: 'dinner' },
    { name: 'Tofu sauté aux légumes', calories: 320, protein: 20, carbs: 25, fat: 16, category: 'dinner' }
  ];

  const dailyTargets = {
    calories: 1500,
    protein: 120,
    carbs: 150,
    fat: 50
  };

  const currentTotals = todayMeals.reduce((totals, meal) => ({
    calories: totals.calories + (meal.calories * meal.quantity),
    protein: totals.protein + (meal.protein * meal.quantity),
    carbs: totals.carbs + (meal.carbs * meal.quantity),
    fat: totals.fat + (meal.fat * meal.quantity)
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const addMeal = (meal: FoodItem, quantity: number = 1) => {
    const newMeal = {
      ...meal,
      id: Date.now(),
      type: selectedMeal,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      quantity
    };
    const updated = [...todayMeals, newMeal];
    setTodayMeals(updated);
    saveMeals(updated);
    setShowAddMeal(false);
    setSelectedFood(null);
  };

  const updateMealQuantity = (mealId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      const updated = todayMeals.filter(meal => meal.id !== mealId);
      setTodayMeals(updated);
      saveMeals(updated);
    } else {
      const updated = todayMeals.map(meal =>
        meal.id === mealId ? { ...meal, quantity: newQuantity } : meal
      );
      setTodayMeals(updated);
      saveMeals(updated);
    }
  };

  const filteredSuggestions = suggestions.filter(meal => 
    meal.category === selectedMeal && 
    meal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getMealTypeCalories = (type: string) => {
    return todayMeals
      .filter(meal => meal.type === type)
      .reduce((sum, meal) => sum + (meal.calories * meal.quantity), 0);
  };

  const openAddMeal = (food: FoodItem) => {
    setSelectedFood(food);
    setShowAddMeal(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }] }>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.secondary || '#FEE2E2' }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Mes Repas</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Suivez votre nutrition quotidienne</Text>
        
        {/* Daily Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Calories</Text>
            <Text style={styles.progressValue}>
              {currentTotals.calories} / {dailyTargets.calories}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${Math.min((currentTotals.calories / dailyTargets.calories) * 100, 100)}%`,
                    backgroundColor: '#EF4444'
                  }
                ]} 
              />
            </View>
          </View>
        </View>
      </View>

      {/* Meal Type Selector */}
      <View style={styles.mealTypeContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.mealTypeScroll}>
          {mealTypes.map((type) => {
            const consumed = getMealTypeCalories(type.key);
            const isSelected = selectedMeal === type.key;
            
            return (
              <TouchableOpacity
                key={type.key}
                style={[styles.mealTypeCard, isSelected && styles.mealTypeCardSelected]}
                onPress={() => setSelectedMeal(type.key as 'breakfast' | 'lunch' | 'snack' | 'dinner')}
              >
                <Text style={styles.mealTypeEmoji}>{type.emoji}</Text>
                <Text style={[styles.mealTypeLabel, isSelected && styles.mealTypeLabelSelected]}>
                  {type.label}
                </Text>
                <Text style={styles.mealTypeCalories}>
                  {consumed} / {type.target} kcal
                </Text>
                <View style={styles.mealTypeProgress}>
                  <View 
                    style={[
                      styles.mealTypeProgressFill,
                      { 
                        width: `${Math.min((consumed / type.target) * 100, 100)}%`,
                        backgroundColor: isSelected ? '#EF4444' : '#10B981'
                      }
                    ]} 
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un aliment..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.cameraButton}>
          <Camera size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Add */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ajouter rapidement</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <Plus size={20} color="#10B981" />
              <Text style={styles.quickActionText}>Repas personnalisé</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Camera size={20} color="#F59E0B" />
              <Text style={styles.quickActionText}>Scanner code-barres</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Suggestions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Suggestions pour {mealTypes.find(t => t.key === selectedMeal)?.label.toLowerCase()}
          </Text>
          {filteredSuggestions.map((meal, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.suggestionCard}
              onPress={() => openAddMeal(meal)}
            >
              <View style={styles.suggestionLeft}>
                <View style={styles.mealIcon}>
                  <Utensils size={20} color="#6B7280" />
                </View>
                <View style={styles.suggestionInfo}>
                  <Text style={styles.suggestionName}>{meal.name}</Text>
                  <View style={styles.macroRow}>
                    <Text style={styles.macroText}>🔥 {meal.calories} kcal</Text>
                    <Text style={styles.macroText}>💪 {meal.protein}g</Text>
                    <Text style={styles.macroText}>🌾 {meal.carbs}g</Text>
                    <Text style={styles.macroText}>🥑 {meal.fat}g</Text>
                  </View>
                </View>
              </View>
              <Plus size={20} color="#10B981" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Today's Meals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Repas d'aujourd'hui</Text>
          {todayMeals.map((meal) => (
            <NutritionCard
              key={meal.id}
              name={meal.name}
              calories={meal.calories}
              protein={meal.protein}
              carbs={meal.carbs}
              fat={meal.fat}
              quantity={meal.quantity}
              showControls={true}
              onAdd={() => updateMealQuantity(meal.id, meal.quantity + 1)}
              onRemove={() => updateMealQuantity(meal.id, meal.quantity - 1)}
            />
          ))}
        </View>

        {/* Macros Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Répartition des macronutriments</Text>
          <View style={styles.macroSummary}>
            {[
              { label: 'Protéines', current: currentTotals.protein, target: dailyTargets.protein, unit: 'g', color: '#10B981' },
              { label: 'Glucides', current: currentTotals.carbs, target: dailyTargets.carbs, unit: 'g', color: '#F59E0B' },
              { label: 'Lipides', current: currentTotals.fat, target: dailyTargets.fat, unit: 'g', color: '#EF4444' }
            ].map((macro, index) => (
              <View key={index} style={styles.macroSummaryItem}>
                <Text style={styles.macroSummaryLabel}>{macro.label}</Text>
                <Text style={styles.macroSummaryValue}>
                  {Math.round(macro.current)} / {macro.target} {macro.unit}
                </Text>
                <View style={styles.macroSummaryProgress}>
                  <View 
                    style={[
                      styles.macroSummaryProgressFill,
                      { 
                        width: `${Math.min((macro.current / macro.target) * 100, 100)}%`,
                        backgroundColor: macro.color
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Add Meal Modal */}
      <Modal
        visible={showAddMeal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAddMeal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Ajouter un aliment</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowAddMeal(false)}
            >
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          {selectedFood && (
            <ScrollView style={styles.modalContent}>
              <NutritionCard
                name={selectedFood.name}
                calories={selectedFood.calories}
                protein={selectedFood.protein}
                carbs={selectedFood.carbs}
                fat={selectedFood.fat}
                quantity={1}
                showControls={false}
              />
              
              <View style={styles.addButtonContainer}>
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => selectedFood && addMeal(selectedFood, 1)}
                >
                  <Text style={styles.addButtonText}>Ajouter à {mealTypes.find(t => t.key === selectedMeal)?.label.toLowerCase()}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FEE2E2',
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  progressContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  progressItem: {
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  progressValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  mealTypeContainer: {
    paddingVertical: 16,
  },
  mealTypeScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  mealTypeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    minWidth: 100,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  mealTypeCardSelected: {
    borderColor: '#EF4444',
  },
  mealTypeEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  mealTypeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  mealTypeLabelSelected: {
    color: '#EF4444',
  },
  mealTypeCalories: {
    fontSize: 10,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  mealTypeProgress: {
    width: '100%',
    height: 2,
    backgroundColor: '#E5E7EB',
    borderRadius: 1,
    overflow: 'hidden',
  },
  mealTypeProgressFill: {
    height: '100%',
    borderRadius: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  cameraButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAction: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  suggestionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  suggestionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  mealIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  suggestionInfo: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  macroRow: {
    flexDirection: 'row',
    gap: 8,
  },
  macroText: {
    fontSize: 12,
    color: '#6B7280',
  },
  macroSummary: {
    gap: 16,
  },
  macroSummaryItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  macroSummaryLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  macroSummaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  macroSummaryProgress: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  macroSummaryProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  addButtonContainer: {
    marginTop: 24,
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