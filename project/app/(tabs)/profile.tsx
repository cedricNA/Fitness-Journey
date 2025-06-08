import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { User, Settings, Bell, Globe, Award, Target, ChevronRight, CreditCard as Edit, Camera, Activity } from 'lucide-react-native';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

export default function Profile() {
  const [notifications, setNotifications] = useState(true);
  const { user } = useUser();
  const router = useRouter();
  const { colors } = useTheme();
  const styles = getStyles(colors);

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
        { label: 'Informations personnelles', icon: User, onPress: () => router.push('/account') },
        { label: 'Objectifs et préférences', icon: Target, onPress: () => router.push('/account') },
        { label: 'Notifications', icon: Bell, hasSwitch: true, value: notifications, onToggle: setNotifications }
      ]
    },
    {
      title: 'Paramètres',
      items: [
        { label: 'Langue', icon: Globe, value: preferences.language, onPress: () => router.push('/settings') },
        { label: 'Unités de mesure', icon: Settings, value: preferences.units, onPress: () => router.push('/settings') }
      ]
    },
    {
      title: 'Support',
      items: [
        { label: 'Centre d\'aide', icon: Settings, onPress: () => router.push('/support') },
        { label: 'Nous contacter', icon: Settings, onPress: () => router.push('/support') },
        { label: 'Conditions d\'utilisation', icon: Settings, onPress: () => router.push('/support') }
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
      <View style={[styles.header, { backgroundColor: getGoalColor(user.goal) + '20' }]}>
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
            <Text style={[styles.userName, { color: colors.text }]}>{user.name}</Text>
            <Text style={[styles.userEmail, { color: colors.textSecondary }]}>{user.email}</Text>
            <View style={styles.goalBadge}>
              <Text style={[styles.goalText, { color: getGoalColor(user.goal) }]}>
                {getGoalText(user.goal)} • {user.level}
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
            <Text style={styles.detailValue}>{user.age} ans</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Taille</Text>
            <Text style={styles.detailValue}>{user.height} cm</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Membre depuis</Text>
            <Text style={styles.detailValue}>
              {new Date(user.joinDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
            </Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Vos statistiques</Text>
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: getGoalColor(user.goal) + '20' }]}>
                <stat.icon size={20} color={getGoalColor(user.goal)} />
              </View>
              <Text style={[styles.statValue, { color: getGoalColor(user.goal) }]}>
                {stat.value}
              </Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Preferences Overview */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Mes préférences</Text>
        <View style={styles.preferencesCard}>
          <View style={styles.preferenceItem}>
            <Text style={[styles.preferenceLabel, { color: colors.textSecondary }]}>Régime alimentaire</Text>
            <Text style={[styles.preferenceValue, { color: colors.text }]}>{preferences.dietType}</Text>
          </View>
          <View style={styles.preferenceItem}>
            <Text style={[styles.preferenceLabel, { color: colors.textSecondary }]}>Allergies</Text>
            <Text style={[styles.preferenceValue, { color: colors.text }]}>
              {preferences.allergies.length > 0 ? preferences.allergies.join(', ') : 'Aucune'}
            </Text>
          </View>
        </View>
      </View>

      {/* Menu Sections */}
      {menuSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
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
                  <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
                </View>
                
                <View style={styles.menuRight}>
                  {item.hasSwitch ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: '#E5E7EB', true: getGoalColor(user.goal) + '40' }}
                      thumbColor={item.value ? getGoalColor(user.goal) : '#F3F4F6'}
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
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Progression du niveau</Text>
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <Text style={styles.levelTitle}>Niveau {user.level}</Text>
            <Text style={styles.levelPoints}>2,450 / 3,000 XP</Text>
          </View>
          <View style={styles.levelProgress}>
            <View 
              style={[
                styles.levelProgressFill,
                { 
                  width: '82%',
                  backgroundColor: getGoalColor(user.goal)
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
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Réussites récentes</Text>
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

const getStyles = (
  colors: import('@/context/ThemeContext').ThemeColors
) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    backgroundColor: colors.card,
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
    color: colors.text,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
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
    backgroundColor: colors.card,
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
    color: colors.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
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
    color: colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  preferencesCard: {
    backgroundColor: colors.card,
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
    color: colors.textSecondary,
  },
  preferenceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  menuCard: {
    backgroundColor: colors.card,
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
    borderBottomColor: colors.border,
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
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 16,
    color: colors.text,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuValue: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  levelCard: {
    backgroundColor: colors.card,
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
    color: colors.text,
  },
  levelPoints: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  levelProgress: {
    height: 6,
    backgroundColor: colors.border,
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
    color: colors.textSecondary,
    textAlign: 'center',
  },
  achievementPreview: {
    flexDirection: 'row',
    gap: 12,
  },
  achievementItem: {
    flex: 1,
    backgroundColor: colors.card,
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
    color: colors.text,
    textAlign: 'center',
    fontWeight: '600',
  },
});