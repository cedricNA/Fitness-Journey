import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Plus,
  Target,
  Activity,
  Utensils,
  Award,
  ChevronRight,
  Moon,
  Sun,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  const { user, setUser, loading } = useUser();
  const router = useRouter();
  const { theme, toggleTheme, colors } = useTheme();
  const [currentWeight] = useState(68);
  const [targetWeight] = useState(60);
  const [weeklyProgress] = useState(75);

  if (loading || !user) {
    return null;
  }

  const goalPalettes = {
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

  const goalColors = goalPalettes[user.goal];

  const styles = getStyles(colors, goalColors);

  const stats = [
    { label: 'Poids actuel', value: `${currentWeight} kg`, progress: ((targetWeight / currentWeight) * 100) },
    { label: 'Objectif', value: `${targetWeight} kg`, progress: 100 },
    { label: 'Calories aujourd\'hui', value: '1,248 / 1,500', progress: 83 },
    { label: 'Entraînements semaine', value: '4 / 5', progress: 80 }
  ];

  const quickActions = [
    { title: 'Ajouter un repas', icon: Utensils, color: '#F59E0B', href: '/meals' },
    { title: 'Nouvelle séance', icon: Activity, color: '#8B5CF6', href: '/workouts' },
    { title: 'Consulter le plan', icon: Target, color: goalColors.primary, href: '/plan' }
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: goalColors.secondary }]}>
        <TouchableOpacity
          testID="toggle-theme"
          onPress={toggleTheme}
          style={styles.themeToggle}
        >
          {theme === 'light' ? (
            <Moon size={24} color="#1F2937" />
          ) : (
            <Sun size={24} color="#F9FAFB" />
          )}
        </TouchableOpacity>
        <View style={styles.welcomeSection}>
          <Text style={[styles.welcomeText, { color: colors.text }]}>Bonjour {user.name.split(' ')[0]} 👋</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Prêt(e) à progresser aujourd'hui ?</Text>
        </View>
        
        <TouchableOpacity
          style={[styles.goalBadge, { backgroundColor: goalColors.primary }]}
          onPress={() =>
            setUser((u) =>
              u ? { ...u, goal: u.goal === 'weight_loss' ? 'muscle_gain' : 'weight_loss' } : u
            )
          }
        >
          <Text style={styles.goalText}>
            {user.goal === 'weight_loss' ? '🔥 Perte de poids' : '💪 Prise de masse'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Votre progression</Text>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
              <Text style={[styles.statValue, { color: goalColors.primary }]}>{stat.value}</Text>
              <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${stat.progress}%`, backgroundColor: goalColors.primary }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Actions rapides</Text>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionCard, { backgroundColor: colors.card }]}
            onPress={() => router.push(action.href)}
          >
            <View style={styles.actionLeft}>
              <View style={[styles.iconContainer, { backgroundColor: action.color + '20' }]}>
                <action.icon size={24} color={action.color} />
              </View>
              <Text style={[styles.actionTitle, { color: colors.text }]}>{action.title}</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Achievement */}
      <View style={styles.achievementContainer}>
        <View style={styles.achievementCard}>
          <Award size={32} color="#F59E0B" />
          <Text style={styles.achievementTitle}>Bravo !</Text>
          <Text style={styles.achievementText}>
            Vous avez atteint {weeklyProgress}% de votre objectif hebdomadaire
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const getStyles = (
  theme: import('@/context/ThemeContext').ThemeColors,
  goal: { primary: string; secondary: string; accent: string }
) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  themeToggle: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  welcomeSection: {
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
  },
  goalBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  goalText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: theme.card,
    padding: 16,
    borderRadius: 12,
    width: (width - 52) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statLabel: {
    fontSize: 12,
    color: theme.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: theme.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  actionsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  actionCard: {
    backgroundColor: theme.card,
    padding: 16,
    borderRadius: 12,
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
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
  },
  achievementContainer: {
    padding: 20,
    paddingTop: 0,
  },
  achievementCard: {
    backgroundColor: goal.secondary,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: goal.accent,
    marginTop: 8,
  },
  achievementText: {
    fontSize: 14,
    color: goal.accent,
    textAlign: 'center',
    marginTop: 4,
  },
});
