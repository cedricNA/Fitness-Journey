import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { TrendingUp, Camera, Calendar, Target, Award, ChevronRight, Scale, Ruler } from 'lucide-react-native';
import ProgressChart from '@/components/ProgressChart';

const { width } = Dimensions.get('window');

export default function Progress() {
  const [activeTab, setActiveTab] = useState<'weight' | 'measurements' | 'photos'>('weight');
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | '3months'>('month');

  const tabs = [
    { id: 'weight', title: 'Poids', icon: Scale },
    { id: 'measurements', title: 'Mensurations', icon: Ruler },
    { id: 'photos', title: 'Photos', icon: Camera }
  ];

  const periods = [
    { key: 'week', label: '7J' },
    { key: 'month', label: '1M' },
    { key: '3months', label: '3M' }
  ];

  const weightData = [
    { date: '2024-01-01', value: 72.5 },
    { date: '2024-01-07', value: 71.8 },
    { date: '2024-01-14', value: 70.9 },
    { date: '2024-01-21', value: 70.2 },
    { date: '2024-01-28', value: 69.8 }
  ];

  const measurements = [
    { name: 'Tour de taille', current: 78, initial: 85, unit: 'cm', change: -7 },
    { name: 'Tour de hanches', current: 95, initial: 98, unit: 'cm', change: -3 },
    { name: 'Tour de bras', current: 28, initial: 26, unit: 'cm', change: +2 },
    { name: 'Tour de cuisse', current: 52, initial: 55, unit: 'cm', change: -3 }
  ];

  const achievements = [
    { title: 'Premier kilo perdu', date: '2024-01-07', emoji: '🎉' },
    { title: '5 kg perdus', date: '2024-01-28', emoji: '🔥' },
    { title: '30 jours consécutifs', date: '2024-01-30', emoji: '💪' }
  ];

  const progressPhotos = [
    {
      id: 1,
      type: 'front',
      date: '2024-01-01',
      url: 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      type: 'side',
      date: '2024-01-01',
      url: 'https://images.pexels.com/photos/6975475/pexels-photo-6975475.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const currentWeight = weightData[weightData.length - 1]?.value || 0;
  const initialWeight = weightData[0]?.value || 0;
  const weightLoss = initialWeight - currentWeight;
  const targetWeight = 65;
  const progressToTarget = ((initialWeight - currentWeight) / (initialWeight - targetWeight)) * 100;

  const renderWeightTab = () => (
    <View>
      {/* Weight Overview */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Évolution du poids</Text>
        <View style={styles.weightOverview}>
          <View style={styles.weightMain}>
            <Text style={styles.currentWeight}>{currentWeight} kg</Text>
            <Text style={styles.weightChange}>
              {weightLoss > 0 ? '↓' : '↑'} {Math.abs(weightLoss).toFixed(1)} kg
            </Text>
          </View>
          <View style={styles.weightStats}>
            <View style={styles.weightStat}>
              <Text style={styles.weightStatLabel}>Objectif</Text>
              <Text style={styles.weightStatValue}>{targetWeight} kg</Text>
            </View>
            <View style={styles.weightStat}>
              <Text style={styles.weightStatLabel}>Restant</Text>
              <Text style={styles.weightStatValue}>
                {Math.max(currentWeight - targetWeight, 0).toFixed(1)} kg
              </Text>
            </View>
          </View>
        </View>
        
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>Progression vers l'objectif</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${Math.min(progressToTarget, 100)}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{progressToTarget.toFixed(0)}% atteint</Text>
        </View>
      </View>

      {/* Weight Chart */}
      <View style={styles.card}>
        <View style={styles.chartHeader}>
          <Text style={styles.cardTitle}>Graphique d'évolution</Text>
          <View style={styles.periodSelector}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.key}
                style={[
                  styles.periodButton,
                  selectedPeriod === period.key && styles.periodButtonActive
                ]}
                onPress={() => setSelectedPeriod(period.key as any)}
              >
                <Text style={[
                  styles.periodButtonText,
                  selectedPeriod === period.key && styles.periodButtonTextActive
                ]}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <ProgressChart 
          data={weightData}
          color="#10B981"
          minValue={65}
          maxValue={75}
          unit="kg"
        />
      </View>

      {/* BMI Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Indice de Masse Corporelle (IMC)</Text>
        <View style={styles.bmiContainer}>
          <Text style={styles.bmiValue}>
            {(currentWeight / Math.pow(1.65, 2)).toFixed(1)}
          </Text>
          <Text style={styles.bmiCategory}>Normal</Text>
        </View>
        <Text style={styles.bmiDescription}>
          Votre IMC est dans la plage normale. Continuez sur cette voie !
        </Text>
      </View>
    </View>
  );

  const renderMeasurementsTab = () => (
    <View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Évolution des mensurations</Text>
        {measurements.map((measurement, index) => (
          <View key={index} style={styles.measurementItem}>
            <View style={styles.measurementLeft}>
              <Text style={styles.measurementName}>{measurement.name}</Text>
              <Text style={styles.measurementValue}>
                {measurement.current} {measurement.unit}
              </Text>
            </View>
            <View style={styles.measurementRight}>
              <Text style={[
                styles.measurementChange,
                { color: measurement.change < 0 ? '#10B981' : '#EF4444' }
              ]}>
                {measurement.change > 0 ? '+' : ''}{measurement.change} {measurement.unit}
              </Text>
              <Text style={styles.measurementInitial}>
                Initial: {measurement.initial} {measurement.unit}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ajouter une mesure</Text>
        <TouchableOpacity style={styles.addMeasurementButton}>
          <Text style={styles.addMeasurementText}>+ Nouvelle mesure</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPhotosTab = () => (
    <View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Progression visuelle</Text>
        <Text style={styles.cardDescription}>
          Documentez votre transformation avec des photos avant/après
        </Text>
        
        <View style={styles.photoGrid}>
          {progressPhotos.map((photo) => (
            <View key={photo.id} style={styles.photoContainer}>
              <Image source={{ uri: photo.url }} style={styles.progressPhoto} />
              <Text style={styles.photoLabel}>
                {photo.type === 'front' ? 'Face' : 'Profil'}
              </Text>
              <Text style={styles.photoDate}>
                {new Date(photo.date).toLocaleDateString('fr-FR')}
              </Text>
            </View>
          ))}
          
          <TouchableOpacity style={styles.photoSlot}>
            <Camera size={32} color="#9CA3AF" />
            <Text style={styles.photoSlotText}>Ajouter une photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.photoSlot}>
            <Camera size={32} color="#9CA3AF" />
            <Text style={styles.photoSlotText}>Vue de dos</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Conseils photo</Text>
        <Text style={styles.tipText}>
          📸 Prenez vos photos dans les mêmes conditions (éclairage, angle, tenue) pour une comparaison optimale
        </Text>
        <Text style={styles.tipText}>
          💡 Utilisez un minuteur ou demandez à quelqu'un de vous aider pour des photos cohérentes
        </Text>
        <Text style={styles.tipText}>
          📅 Prenez de nouvelles photos chaque semaine pour suivre vos progrès
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes Progrès</Text>
        <Text style={styles.headerSubtitle}>Suivez votre transformation</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.tabActive
            ]}
            onPress={() => setActiveTab(tab.id as any)}
          >
            <tab.icon 
              size={20} 
              color={activeTab === tab.id ? '#10B981' : '#9CA3AF'} 
            />
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.tabTextActive
            ]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'weight' && renderWeightTab()}
        {activeTab === 'measurements' && renderMeasurementsTab()}
        {activeTab === 'photos' && renderPhotosTab()}

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Réussites récentes</Text>
          {achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementCard}>
              <Text style={styles.achievementEmoji}>{achievement.emoji}</Text>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDate}>
                  {new Date(achievement.date).toLocaleDateString('fr-FR')}
                </Text>
              </View>
              <Award size={20} color="#F59E0B" />
            </View>
          ))}
        </View>
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
    backgroundColor: '#E0E7FF',
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
  tabActive: {
    backgroundColor: '#D1FAE5',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  tabTextActive: {
    color: '#10B981',
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
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  weightOverview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  weightMain: {
    alignItems: 'center',
  },
  currentWeight: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10B981',
  },
  weightChange: {
    fontSize: 16,
    color: '#10B981',
    marginTop: 4,
  },
  weightStats: {
    gap: 12,
  },
  weightStat: {
    alignItems: 'center',
  },
  weightStatLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  weightStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  progressContainer: {
    marginTop: 20,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#10B981',
    textAlign: 'center',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 2,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  periodButtonActive: {
    backgroundColor: 'white',
  },
  periodButtonText: {
    fontSize: 12,
    color: '#6B7280',
  },
  periodButtonTextActive: {
    color: '#1F2937',
    fontWeight: '600',
  },
  bmiContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  bmiValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10B981',
  },
  bmiCategory: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '600',
  },
  bmiDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  measurementItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  measurementLeft: {},
  measurementName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  measurementValue: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  measurementRight: {
    alignItems: 'flex-end',
  },
  measurementChange: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  measurementInitial: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  addMeasurementButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  addMeasurementText: {
    color: '#6B7280',
    fontWeight: '600',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  photoContainer: {
    width: (width - 84) / 2,
    alignItems: 'center',
  },
  progressPhoto: {
    width: (width - 84) / 2,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  photoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 8,
  },
  photoDate: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
  },
  photoSlot: {
    width: (width - 84) / 2,
    height: 120,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  photoSlotText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center',
  },
  tipText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  achievementCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  achievementEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  achievementDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
});
