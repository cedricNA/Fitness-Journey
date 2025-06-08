import {
  Text,
  ScrollView,
  Dimensions,
import {
  Target,
  Utensils,
  ChevronRight,
  Sun,
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
const { width } = Dimensions.get('window');
export default function Dashboard() {
  const router = useRouter();
  const [currentWeight] = useState(68);
  const [weeklyProgress] = useState(75);
  const goalPalettes = {
      primary: '#EF4444',
      accent: '#DC2626'
    muscle_gain: {
      secondary: '#D1FAE5',
    }



    { label: 'Poids actuel', value: `${currentWeight} kg`, progress: ((targetWeight / currentWeight) * 100) },
    { label: 'Calories aujourd\'hui', value: '1,248 / 1,500', progress: 83 },
  ];
  const quickActions = [
    { title: 'Nouvelle séance', icon: Activity, color: '#8B5CF6', href: '/workouts' },
  ];
  return (
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: goalColors.secondary }]}>
          {theme === 'light' ? (
          ) : (
          )}
        <View style={styles.welcomeSection}>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Prêt(e) à progresser aujourd'hui ?</Text>
        
          style={[styles.goalBadge, { backgroundColor: goalColors.primary }]}
        >
            {user.goal === 'weight_loss' ? '🔥 Perte de poids' : '💪 Prise de masse'}
        </TouchableOpacity>

      <View style={styles.statsContainer}>
        <View style={styles.statsGrid}>
            <View key={index} style={[styles.statCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.statValue, { color: goalColors.primary }]}>{stat.value}</Text>
                <View 
                    styles.progressFill, 
                  ]} 
              </View>
          ))}
      </View>
      {/* Quick Actions */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Actions rapides</Text>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.card }]}
          >
              <View style={[styles.iconContainer, { backgroundColor: action.color + '20' }]}>
              </View>
            </View>
          </TouchableOpacity>
      </View>
      {/* Achievement */}
        <View style={styles.achievementCard}>
          <Text style={styles.achievementTitle}>Bravo !</Text>
            Vous avez atteint {weeklyProgress}% de votre objectif hebdomadaire
        </View>
    </ScrollView>
}
const getStyles = (
  goal: { primary: string; secondary: string; accent: string }
  StyleSheet.create({
    flex: 1,
  },
    padding: 20,
    borderBottomLeftRadius: 24,
  },
    position: 'absolute',
    right: 20,
  welcomeSection: {
  },
    fontSize: 28,
    color: theme.text,
  },
    fontSize: 16,
  },
    paddingHorizontal: 16,
    borderRadius: 20,
  },
    color: 'white',
    fontSize: 14,
  statsContainer: {
  },
    fontSize: 20,
    color: theme.text,
  },
    flexDirection: 'row',
    gap: 12,
  statCard: {
    padding: 16,
    width: (width - 52) / 2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
    fontSize: 12,
    marginBottom: 4,
  statValue: {
    fontWeight: 'bold',
  },
    height: 4,
    borderRadius: 2,
  },
    height: '100%',
  },
    padding: 20,
  },
    backgroundColor: theme.card,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
    flexDirection: 'row',
  },
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
  },
    fontSize: 16,
    color: theme.text,
  achievementContainer: {
    paddingTop: 0,
  achievementCard: {
    padding: 20,
    alignItems: 'center',
    borderColor: theme.border,
  achievementTitle: {
    fontWeight: 'bold',
    marginTop: 8,
  achievementText: {
    color: goal.accent,
    marginTop: 4,
});
