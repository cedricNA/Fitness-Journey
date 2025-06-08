import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>
      <Text style={styles.text}>Cette page sera prochainement disponible.</Text>
    </View>
  );
}

const getStyles = (colors: import('@/context/ThemeContext').ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 12,
      color: colors.text,
    },
    text: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });
