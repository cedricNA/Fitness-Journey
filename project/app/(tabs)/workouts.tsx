import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, TextInput } from 'react-native';
import { Play, Plus, Clock, Zap, Target, Trophy, ChevronRight, Activity, Heart, X } from 'lucide-react-native';
import WorkoutTimer from '@/components/WorkoutTimer';
import { getWorkouts, saveWorkouts, WorkoutEntry } from '@/storage';

const { width } = Dimensions.get('window');

export default function Workouts() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cardio' | 'strength' | 'flexibility'>('all');
  const [showTimer, setShowTimer] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState<any>(null);
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutEntry[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [newWorkoutDuration, setNewWorkoutDuration] = useState('');

  useEffect(() => {
    getWorkouts().then(setWorkoutHistory);
  }, []);

  const categories = [
    { key: 'all', label: 'Tous', emoji: '💪' },
    { key: 'cardio', label: 'Cardio', emoji: '🏃' },
    { key: 'strength', label: 'Force', emoji: '🏋️' },
    { key: 'flexibility', label: 'Souplesse', emoji: '🧘' }
  ];

  const recommendedWorkouts = [
    {
      name: 'HIIT Brûle-graisse',
      duration: 25,
      difficulty: 'Intermédiaire',
      calories: 250,
      type: 'cardio',
      description: 'Entraînement haute intensité pour brûler un maximum de calories',
      exercises: [
        { name: 'Jumping Jacks', duration: 45, rest: 15 },
        { name: 'Burpees', duration: 30, rest: 30 },
        { name: 'Mountain Climbers', duration: 45, rest: 15 },
        { name: 'High Knees', duration: 30, rest: 30 }
      ]
    },
    {
      name: 'Renforcement Core',
      duration: 20,
      difficulty: 'Débutant',
      calories: 150,
      type: 'strength',
      description: 'Exercices ciblés pour renforcer vos abdominaux et votre dos',
      exercises: [
        { name: 'Planche', duration: 30, rest: 30 },
        { name: 'Crunchs', duration: 45, rest: 15 },
        { name: 'Russian Twists', duration: 30, rest: 30 },
        { name: 'Dead Bug', duration: 45, rest: 15 }
      ]
    },
    {
      name: 'Cardio Dance',
      duration: 35,
      difficulty: 'Débutant',
      calories: 200,
      type: 'cardio',
      description: 'Dansez tout en brûlant des calories, idéal pour le fun !',
      exercises: [
        { name: 'Échauffement', duration: 300, rest: 0 },
        { name: 'Chorégraphie 1', duration: 480, rest: 60 },
        { name: 'Chorégraphie 2', duration: 480, rest: 60 },
        { name: 'Cool down', duration: 180, rest: 0 }
      ]
    },
    {
      name: 'Upper Body Power',
      duration: 40,
      difficulty: 'Avancé',
      calories: 280,
      type: 'strength',
      description: 'Développez la force du haut du corps avec des exercices intenses',
      exercises: [
        { name: 'Pompes', duration: 45, rest: 15 },
        { name: 'Dips', duration: 30, rest: 30 },
        { name: 'Pike Push-ups', duration: 30, rest: 30 },
        { name: 'Planche latérale', duration: 30, rest: 30 }
      ]
    },
    {
      name: 'Yoga Flow',
      duration: 30,
      difficulty: 'Débutant',
      calories: 120,
      type: 'flexibility',
      description: 'Séance de yoga relaxante pour améliorer votre flexibilité',
      exercises: [
        { name: 'Salutation au soleil', duration: 300, rest: 0 },
        { name: 'Postures debout', duration: 600, rest: 0 },
        { name: 'Postures assises', duration: 600, rest: 0 },
        { name: 'Relaxation', duration: 300, rest: 0 }
      ]
    }
  ];

  const weeklyStats = {
    workouts: 4,
    totalDuration: 150,
    caloriesBurned: 980,
    streak: 3
  };

  const filteredWorkouts = selectedCategory === 'all' 
    ? recommendedWorkouts 
    : recommendedWorkouts.filter(workout => workout.type === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return '#10B981';
      case 'Intermédiaire': return '#F59E0B';
      case 'Avancé': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const startWorkout = (workout: any) => {
    setActiveWorkout(workout);
    setShowTimer(true);
  };

  const completeWorkout = () => {
    if (activeWorkout) {
      const newWorkout = {
        id: Date.now(),
        name: activeWorkout.name,
        duration: activeWorkout.duration,
        calories: activeWorkout.calories,
        type: activeWorkout.type,
        date: new Date().toISOString().split('T')[0],
        completed: true
      };
      const updated = [newWorkout, ...workoutHistory];
      setWorkoutHistory(updated);
      saveWorkouts(updated);
    }
    setShowTimer(false);
    setActiveWorkout(null);
  };

  const quickWorkout = () => {
    const expressWorkout = {
      name: 'Workout Express',
      duration: 15,
      calories: 120,
      type: 'cardio',
      exercises: [
        { name: 'Jumping Jacks', duration: 30, rest: 10 },
        { name: 'Squats', duration: 30, rest: 10 },
        { name: 'Push-ups', duration: 30, rest: 10 },
        { name: 'Planche', duration: 30, rest: 10 }
      ]
    };
    startWorkout(expressWorkout);
  };

  const createCustomWorkout = () => {
    if (!newWorkoutName || !newWorkoutDuration) {
      setShowCreateModal(false);
      return;
    }
    const duration = parseInt(newWorkoutDuration, 10);
    const customWorkout = {
      name: newWorkoutName,
      duration,
      calories: Math.round(duration * 8),
      type: 'custom',
      description: "Entra\u00eenement personnalis\u00e9",
      exercises: [] as any[],
    };
    setNewWorkoutName('');
    setNewWorkoutDuration('');
    setShowCreateModal(false);
    startWorkout(customWorkout);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes Entraînements</Text>
        <Text style={styles.headerSubtitle}>Restez actif et atteignez vos objectifs</Text>
        
        {/* Weekly Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Activity size={20} color="#10B981" />
            <Text style={styles.statNumber}>{weeklyStats.workouts}</Text>
            <Text style={styles.statLabel}>Séances</Text>
          </View>
          <View style={styles.statItem}>
            <Clock size={20} color="#F59E0B" />
            <Text style={styles.statNumber}>{weeklyStats.totalDuration}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
          <View style={styles.statItem}>
            <Zap size={20} color="#EF4444" />
            <Text style={styles.statNumber}>{weeklyStats.caloriesBurned}</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
          <View style={styles.statItem}>
            <Trophy size={20} color="#8B5CF6" />
            <Text style={styles.statNumber}>{weeklyStats.streak}</Text>
            <Text style={styles.statLabel}>Jours consécutifs</Text>
          </View>
        </View>
      </View>

      {/* Category Filter */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={[
                styles.categoryCard,
                selectedCategory === category.key && styles.categoryCardSelected
              ]}
              onPress={() => setSelectedCategory(category.key as any)}
            >
              <Text style={styles.categoryEmoji}>{category.emoji}</Text>
              <Text style={[
                styles.categoryLabel,
                selectedCategory === category.key && styles.categoryLabelSelected
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Start */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Démarrage rapide</Text>
          <View style={styles.quickStartContainer}>
            <TouchableOpacity style={styles.quickStartCard} onPress={quickWorkout}>
              <Play size={24} color="white" />
              <Text style={styles.quickStartText}>Workout Express</Text>
              <Text style={styles.quickStartSubtext}>15 min • Tous niveaux</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.createWorkoutCard}
              onPress={() => setShowCreateModal(true)}
            >
              <Plus size={24} color="#6B7280" />
              <Text style={styles.createWorkoutText}>Créer un entraînement</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recommended Workouts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Recommandés pour vous
            {selectedCategory !== 'all' && ` • ${categories.find(c => c.key === selectedCategory)?.label}`}
          </Text>
          {filteredWorkouts.map((workout, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.workoutCard}
              onPress={() => startWorkout(workout)}
            >
              <View style={styles.workoutLeft}>
                <View style={styles.workoutIcon}>
                  <Activity size={24} color="#10B981" />
                </View>
                <View style={styles.workoutInfo}>
                  <Text style={styles.workoutName}>{workout.name}</Text>
                  <Text style={styles.workoutDescription}>{workout.description}</Text>
                  <View style={styles.workoutMeta}>
                    <View style={styles.metaItem}>
                      <Clock size={14} color="#6B7280" />
                      <Text style={styles.metaText}>{workout.duration} min</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Zap size={14} color="#6B7280" />
                      <Text style={styles.metaText}>{workout.calories} cal</Text>
                    </View>
                    <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(workout.difficulty) + '20' }]}>
                      <Text style={[styles.difficultyText, { color: getDifficultyColor(workout.difficulty) }]}>
                        {workout.difficulty}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <Play size={20} color="#10B981" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Workout History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historique récent</Text>
          {workoutHistory.map((workout) => (
            <View key={workout.id} style={styles.historyCard}>
              <View style={styles.historyLeft}>
                <View style={styles.historyStatus}>
                  <View style={[styles.statusIndicator, { backgroundColor: '#10B981' }]} />
                </View>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyName}>{workout.name}</Text>
                  <Text style={styles.historyDate}>
                    {new Date(workout.date).toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'long' 
                    })}
                  </Text>
                  <View style={styles.historyMeta}>
                    <Text style={styles.historyMetaText}>{workout.duration} min</Text>
                    <Text style={styles.historyMetaText}>•</Text>
                    <Text style={styles.historyMetaText}>{workout.calories} cal</Text>
                  </View>
                </View>
              </View>
              <ChevronRight size={16} color="#9CA3AF" />
            </View>
          ))}
        </View>

        {/* Progress Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vos progrès cette semaine</Text>
          <View style={styles.insightsCard}>
            <View style={styles.insightRow}>
              <Heart size={20} color="#EF4444" />
              <Text style={styles.insightText}>
                Vous avez brûlé 23% de calories en plus que la semaine dernière !
              </Text>
            </View>
            <View style={styles.insightRow}>
              <Target size={20} color="#10B981" />
              <Text style={styles.insightText}>
                Objectif hebdomadaire atteint à 80%. Plus qu'une séance !
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Workout Timer Modal */}
      <Modal
        visible={showTimer}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowTimer(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {activeWorkout?.name || 'Entraînement'}
            </Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowTimer(false)}
            >
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <WorkoutTimer onComplete={completeWorkout} />
            
            {activeWorkout?.exercises && (
              <View style={styles.exercisesList}>
                <Text style={styles.exercisesTitle}>Exercices</Text>
                {activeWorkout.exercises.map((exercise: any, index: number) => (
                  <View key={index} style={styles.exerciseItem}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <View style={styles.exerciseDetails}>
                      <Text style={styles.exerciseTime}>
                        {exercise.duration > 60 
                          ? `${Math.floor(exercise.duration / 60)}:${(exercise.duration % 60).toString().padStart(2, '0')}`
                          : `${exercise.duration}s`
                        }
                      </Text>
                      {exercise.rest > 0 && (
                        <Text style={styles.exerciseRest}>
                          Repos: {exercise.rest}s
                        </Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>

      {/* Create Workout Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Nouvel entraînement</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCreateModal(false)}
            >
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Nom de l'entraînement"
              value={newWorkoutName}
              onChangeText={setNewWorkoutName}
            />
            <TextInput
              style={styles.input}
              placeholder="Durée (min)"
              keyboardType="numeric"
              value={newWorkoutDuration}
              onChangeText={setNewWorkoutDuration}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={createCustomWorkout}
            >
              <Text style={styles.addButtonText}>Démarrer</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#D1FAE5',
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
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  categoryContainer: {
    paddingVertical: 16,
  },
  categoryScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    minWidth: 80,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryCardSelected: {
    borderColor: '#10B981',
  },
  categoryEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryLabelSelected: {
    color: '#10B981',
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
  quickStartContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  quickStartCard: {
    flex: 2,
    backgroundColor: '#10B981',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickStartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  quickStartSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 4,
  },
  createWorkoutCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  createWorkoutText: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  workoutCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  workoutIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  workoutDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  workoutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
  },
  historyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  historyStatus: {
    marginRight: 12,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  historyInfo: {
    flex: 1,
  },
  historyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  historyDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  historyMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  historyMetaText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  insightsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
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
  exercisesList: {
    marginTop: 24,
  },
  exercisesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  exerciseItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  exerciseDetails: {
    alignItems: 'flex-end',
  },
  exerciseTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10B981',
  },
  exerciseRest: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
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