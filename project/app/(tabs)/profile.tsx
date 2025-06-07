import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { User, Settings, Bell, Moon, Globe, Award, Target, ChevronRight, CreditCard as Edit, Camera, Activity } from 'lucide-react-native';

export default function Profile() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [userInfo] = useState({
    name: 'Marie Dupont',
    email: 'marie.dupont@email.com',
    age: 28,
    height: 165,
    goal: 'weight_loss',
    joinDate: '2024-01-01',
    level: 'Intermédiaire'
  });

  const [preferences] = useState({
    dietType: 'Équilibrée',
    allergies: ['Lactose'],
    language: 'Français',
    units: 'Métrique'
  });

  const stats = [
    { label: 'Jours actifs', value: 28, icon: Target },
    { label: 'Objectifs atteints', value: 12, icon: Award },
    { label: 'Séances complétées', value: 45, icon: Activity }
  ];

  const menuSections = [
    {
      title: 'Mon compte',
      items: [
        { label: 'Informations personnelles', icon: User, onPress: () => {} },
        { label: 'Objectifs et préférences', icon: Target, onPress: () => {} },
        { label: 'Notifications', icon: Bell, hasSwitch: true, value: notifications, onToggle: setNotifications }
      ]
    },
    {
      title: 'Paramètres',
      items: [
        { label: 'Mode sombre', icon: Moon, hasSwitch: true, value: darkMode, onToggle: setDarkMode },
        { label: 'Langue', icon: Globe, value: preferences.language, onPress: () => {} },
        { label: 'Unités de mesure', icon: Settings, value: preferences.units, onPress: () => {} }
      ]
    },
    {
      title: 'Support',
      items: [
        { label: 'Centre d\'aide', icon: Settings, onPress: () => {} },
        { label: 'Nous contacter', icon: Settings, onPress: () => {} },
        { label: 'Conditions d\'utilisation', icon: Settings, onPress: () => {} }
      ]
    }
  ];

  const getGoalText = (goal: string) => {
    return goal === 'weight_loss' ? 'Perte de poids' : 'Prise de masse';
  };

  const getGoalColor = (goal: string) => {
    return goal === 'weight_loss' ? '#EF4444' : '#10B981';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: getGoalColor(userInfo.goal) + '20' }]}>
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={32} color="#6B7280" />
            </View>
            <View style={styles.cameraButton}>
              <Camera size={12} color="white" />
            </View>
          </TouchableOpacity>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <Text style={styles.userEmail}>{userInfo.email}</Text>
            <View style={styles.goalBadge}>
              <Text style={[styles.goalText, { color: getGoalColor(userInfo.goal) }]}>
                {getGoalText(userInfo.goal)} • {userInfo.level}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editButton}>
            <Edit size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* User Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Âge</Text>
            <Text style={styles.detailValue}>{userInfo.age} ans</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Taille</Text>
            <Text style={styles.detailValue}>{userInfo.height} cm</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Membre depuis</Text>
            <Text style={styles.detailValue}>
              {new Date(userInfo.joinDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
            </Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Vos statistiques</Text>
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: getGoalColor(userInfo.goal) + '20' }]}>
                <stat.icon size={20} color={getGoalColor(userInfo.goal)} />
              </View>
              <Text style={[styles.statValue, { color: getGoalColor(userInfo.goal) }]}>
                {stat.value}
              </Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Preferences Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mes préférences</Text>
        <View style={styles.preferencesCard}>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Régime alimentaire</Text>
            <Text style={styles.preferenceValue}>{preferences.dietType}</Text>
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Allergies</Text>
            <Text style={styles.preferenceValue}>
              {preferences.allergies.length > 0 ? preferences.allergies.join(', ') : 'Aucune'}
            </Text>
          </View>
        </View>
      </View>

      {/* Menu Sections */}
      {menuSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.menuCard}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity 
                key={itemIndex} 
                style={[
                  styles.menuItem,
                  itemIndex < section.items.length - 1 && styles.menuItemBorder
                ]}
                onPress={item.onPress}
              >
                <View style={styles.menuLeft}>
                  <View style={styles.menuIcon}>
                    <item.icon size={20} color="#6B7280" />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </View>
                
                <View style={styles.menuRight}>
                  {item.hasSwitch ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: '#E5E7EB', true: getGoalColor(userInfo.goal) + '40' }}
                      thumbColor={item.value ? getGoalColor(userInfo.goal) : '#F3F4F6'}
                    />
                  ) : (
                    <>
                      {item.value && (
                        <Text style={styles.menuValue}>{item.value}</Text>
                      )}
                      <ChevronRight size={16} color="#9CA3AF" />
                    </>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Level Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progression du niveau</Text>
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <Text style={styles.levelTitle}>Niveau {userInfo.level}</Text>
            <Text style={styles.levelPoints}>2,450 / 3,000 XP</Text>
          </View>
          <View style={styles.levelProgress}>
            <View 
              style={[
                styles.levelProgressFill,
                { 
                  width: '82%',
                  backgroundColor: getGoalColor(userInfo.goal)
                }
              ]} 
            />
          </View>
          <Text style={styles.levelDescription}>
            Plus que 550 XP pour atteindre le niveau Avancé !
          </Text>
        </View>
      </View>

      {/* Achievements Preview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Réussites récentes</Text>
        <View style={styles.achievementPreview}>
          <View style={styles.achievementItem}>
            <Text style={styles.achievementEmoji}>🔥</Text>
            <Text style={styles.achievementText}>Série de 7 jours</Text>
          </View>
          <View style={styles.achievementItem}>
            <Text style={styles.achievementEmoji}>💪</Text>
            <Text style={styles.achievementText}>50 séances complétées</Text>
          </View>
          <View style={styles.achievementItem}>
            <Text style={styles.achievementEmoji}>🎯</Text>
            <Text style={styles.achievementText}>Objectif mensuel atteint</Text>
          </View>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#6B7280',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  goalBadge: {
    marginTop: 6,
  },
  goalText: {
    fontSize: 12,
    fontWeight: '600',
  },
  editButton: {
    padding: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  preferencesCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  preferenceLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  preferenceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 16,
    color: '#1F2937',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuValue: {
    fontSize: 14,
    color: '#6B7280',
  },
  levelCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  levelPoints: {
    fontSize: 14,
    color: '#6B7280',
  },
  levelProgress: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  levelProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  levelDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  achievementPreview: {
    flexDirection: 'row',
    gap: 12,
  },
  achievementItem: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  achievementEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  achievementText: {
    fontSize: 12,
    color: '#1F2937',
    textAlign: 'center',
    fontWeight: '600',
  },
});