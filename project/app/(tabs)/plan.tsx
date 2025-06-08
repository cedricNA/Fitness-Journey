import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Utensils, Activity, Moon, Droplets, Brain, ChevronRight, Target } from 'lucide-react-native';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

export default function Plan() {
  const [activeTab, setActiveTab] = useState<'nutrition' | 'workout' | 'lifestyle'>('nutrition');
  const { user } = useUser();
  const router = useRouter();
  const { colors } = useTheme();

  const themeColors = {
    weight_loss: {
      primary: '#EF4444',
      secondary: '#FEE2E2',
      accent: '#DC2626'
    },
    muscle_gain: {
      primary: '#10B981',
      secondary: '#D1FAE5',
      accent: '#059669'
    }
  };

  const colors = themeColors[user.goal];

  const tabs = [
    { id: 'nutrition', title: 'Nutrition', icon: Utensils },
    { id: 'workout', title: 'Entraînement', icon: Activity },
    { id: 'lifestyle', title: 'Lifestyle', icon: Brain }
  ];

  const nutritionPlan = {
    calories: { target: 1500, current: 1248 },
    macros: {
      protein: { target: 120, current: 95, unit: 'g' },
      carbs: { target: 150, current: 125, unit: 'g' },
      fat: { target: 50, current: 42, unit: 'g' }
    },
    meals: [
      { name: 'Petit-déjeuner', calories: 350, suggestion: 'Avoine + fruits + yaourt grec' },
      { name: 'Déjeuner', calories: 450, suggestion: 'Salade de quinoa aux légumes' },
      { name: 'Collation', calories: 200, suggestion: 'Pomme + amandes' },
      { name: 'Dîner', calories: 500, suggestion: 'Saumon grillé + légumes verts' }
    ]
  };

  const mealTypeMap: Record<string, string> = {
    'Petit-déjeuner': 'breakfast',
    'Déjeuner': 'lunch',
    'Collation': 'snack',
    'Dîner': 'dinner'
  };

  const workoutPlan = {
    weeklyGoal: 5,
    completed: 3,
    sessions: [
      { day: 'Lundi', type: 'Cardio HIIT', duration: '30 min', status: 'completed' },
      { day: 'Mardi', type: 'Musculation - Haut du corps', duration: '45 min', status: 'completed' },
      { day: 'Mercredi', type: 'Repos actif - Yoga', duration: '20 min', status: 'completed' },
      { day: 'Jeudi', type: 'Cardio modéré', duration: '40 min', status: 'pending' },
      { day: 'Vendredi', type: 'Musculation - Bas du corps', duration: '45 min', status: 'pending' }
    ]
  };

  const lifestyleTips = [
    { icon: Moon, title: 'Sommeil', target: '7-8h par nuit', current: '6.5h', tip: 'Couchez-vous 30 min plus tôt' },
    { icon: Droplets, title: 'Hydratation', target: '2.5L par jour', current: '1.8L', tip: 'Buvez un verre d\'eau avant chaque repas' },
    { icon: Brain, title: 'Stress', target: 'Niveau bas', current: 'Modéré', tip: '10 min de méditation quotidienne' }
  ];

  const renderNutritionTab = () => (
    <View>
      {/* Calories Overview */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Objectif calorique quotidien</Text>
        <View style={styles.calorieContainer}>
          <Text style={[styles.calorieNumber, { color: colors.primary }]}>
            {nutritionPlan.calories.current}
          </Text>
          <Text style={styles.calorieTarget}>/ {nutritionPlan.calories.target} kcal</Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${(nutritionPlan.calories.current / nutritionPlan.calories.target) * 100}%`,
                backgroundColor: colors.primary 
              }
            ]} 
          />
        </View>
      </View>

      {/* Macros */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Répartition des macronutriments</Text>
        <View style={styles.macrosContainer}>
          {Object.entries(nutritionPlan.macros).map(([key, macro]) => (
            <View key={key} style={styles.macroItem}>
              <Text style={styles.macroLabel}>
                {key === 'protein' ? 'Protéines' : key === 'carbs' ? 'Glucides' : 'Lipides'}
              </Text>
              <Text style={styles.macroValue}>
                {macro.current} / {macro.target} {macro.unit}
              </Text>
              <View style={styles.macroProgress}>
                <View 
                  style={[
                    styles.macroProgressFill,
                    { 
                      width: `${(macro.current / macro.target) * 100}%`,
                      backgroundColor: key === 'protein' ? '#10B981' : key === 'carbs' ? '#F59E0B' : '#EF4444'
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Meal Suggestions */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Suggestions de repas</Text>
        {nutritionPlan.meals.map((meal, index) => (
          <TouchableOpacity
            key={index}
            style={styles.mealItem}
            onPress={() => router.push(`/meals?type=${mealTypeMap[meal.name]}`)}
          >
            <View style={styles.mealInfo}>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealSuggestion}>{meal.suggestion}</Text>
            </View>
            <View style={styles.mealCalories}>
              <Text style={styles.mealCalorieText}>{meal.calories} kcal</Text>
              <ChevronRight size={16} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderWorkoutTab = () => (
    <View>
      {/* Weekly Progress */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Progression hebdomadaire</Text>
        <View style={styles.workoutProgress}>
          <Text style={[styles.workoutNumber, { color: colors.primary }]}>
            {workoutPlan.completed} / {workoutPlan.weeklyGoal}
          </Text>
          <Text style={styles.workoutLabel}>séances complétées</Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { 
                width: `${(workoutPlan.completed / workoutPlan.weeklyGoal) * 100}%`,
                backgroundColor: colors.primary 
              }
            ]} 
          />
        </View>
      </View>

      {/* Weekly Schedule */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Planning de la semaine</Text>
        {workoutPlan.sessions.map((session, index) => (
          <TouchableOpacity key={index} style={styles.sessionItem}>
            <View style={styles.sessionLeft}>
              <View style={[
                styles.sessionStatus,
                { backgroundColor: session.status === 'completed' ? colors.primary : '#E5E7EB' }
              ]} />
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionDay}>{session.day}</Text>
                <Text style={styles.sessionType}>{session.type}</Text>
                <Text style={styles.sessionDuration}>{session.duration}</Text>
              </View>
            </View>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderLifestyleTab = () => (
    <View>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Conseils bien-être</Text>
        {lifestyleTips.map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <View style={styles.tipHeader}>
              <View style={styles.tipIconContainer}>
                <tip.icon size={20} color={colors.primary} />
              </View>
              <Text style={styles.tipTitle}>{tip.title}</Text>
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTarget}>Objectif: {tip.target}</Text>
              <Text style={styles.tipCurrent}>Actuel: {tip.current}</Text>
              <Text style={styles.tipAdvice}>💡 {tip.tip}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.secondary }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Mon Plan Personnalisé</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          Optimisé pour votre objectif de {user.goal === 'weight_loss' ? 'perte de poids' : 'prise de masse'}
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && { backgroundColor: colors.primary }
            ]}
            onPress={() => setActiveTab(tab.id as any)}
          >
            <tab.icon 
              size={20} 
              color={activeTab === tab.id ? 'white' : '#9CA3AF'} 
            />
            <Text style={[
              styles.tabText,
              { color: activeTab === tab.id ? 'white' : '#9CA3AF' }
            ]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'nutrition' && renderNutritionTab()}
        {activeTab === 'workout' && renderWorkoutTab()}
        {activeTab === 'lifestyle' && renderLifestyleTab()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
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
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    gap: 6,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  calorieContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  calorieNumber: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  calorieTarget: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  macrosContainer: {
    gap: 16,
  },
  macroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  macroLabel: {
    fontSize: 14,
    color: '#6B7280',
    width: 80,
  },
  macroValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    width: 100,
  },
  macroProgress: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  macroProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  mealSuggestion: {
    fontSize: 14,
    color: '#6B7280',
  },
  mealCalories: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mealCalorieText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  workoutProgress: {
    alignItems: 'center',
    marginBottom: 16,
  },
  workoutNumber: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  workoutLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sessionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sessionStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionDay: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  sessionType: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  sessionDuration: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  tipItem: {
    marginBottom: 20,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  tipContent: {
    paddingLeft: 44,
  },
  tipTarget: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  tipCurrent: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  tipAdvice: {
    fontSize: 14,
    color: '#1F2937',
    fontStyle: 'italic',
  },
});