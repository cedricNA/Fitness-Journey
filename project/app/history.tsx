import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { getWorkouts, WorkoutEntry } from '@/storage';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';

export default function HistoryScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [history, setHistory] = useState<WorkoutEntry[]>([]);

  useEffect(() => {
    getWorkouts().then(setHistory);
  }, []);

  const styles = getStyles(colors);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Historique complet</Text>
      </View>
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {history.map((workout) => (
          <View key={workout.id} style={styles.item}>
            <Text style={styles.itemName}>{workout.name}</Text>
            <Text style={styles.itemMeta}>
              {new Date(workout.date).toLocaleDateString('fr-FR')} • {workout.duration} min
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const getStyles = (colors: import('@/context/ThemeContext').ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
    },
    backButton: {
      marginRight: 12,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    list: {
      flex: 1,
      paddingHorizontal: 20,
    },
    item: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    },
    itemName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    itemMeta: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
    },
  });
