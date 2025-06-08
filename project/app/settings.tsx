import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsScreen() {
  const { colors, theme, toggleTheme } = useTheme();
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');

  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Mode sombre</Text>
        <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Unités</Text>
        <View style={styles.unitsContainer}>
          <TouchableOpacity
            style={[
              styles.unitButton,
              units === 'metric' && styles.unitButtonActive,
            ]}
            onPress={() => setUnits('metric')}
          >
            <Text
              style={units === 'metric' ? styles.unitTextActive : styles.unitText}
            >
              Métrique
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.unitButton,
              units === 'imperial' && styles.unitButtonActive,
            ]}
            onPress={() => setUnits('imperial')}
          >
            <Text
              style={
                units === 'imperial' ? styles.unitTextActive : styles.unitText
              }
            >
              Impérial
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const getStyles = (colors: import('@/context/ThemeContext').ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors.text,
      textAlign: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      color: colors.text,
    },
    unitsContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    unitButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: colors.border,
    },
    unitButtonActive: {
      backgroundColor: '#10B98120',
      borderColor: '#10B981',
    },
    unitText: {
      color: colors.text,
    },
    unitTextActive: {
      color: '#10B981',
      fontWeight: '600',
    },
  });
