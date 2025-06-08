import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export default function SupportScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Support</Text>
      <Text style={styles.paragraph}>
        Pour toute question, contactez-nous à{' '}
        <Text style={styles.link}>support@example.com</Text>.
      </Text>

      <View style={styles.faqSection}>
        <Text style={styles.subtitle}>FAQ</Text>
        <Text style={styles.question}>Comment réinitialiser mon mot de passe ?</Text>
        <Text style={styles.answer}>
          Utilisez la fonction "Mot de passe oublié" sur l'écran de connexion et
          suivez les instructions.
        </Text>
        <Text style={styles.question}>Comment modifier mes informations ?</Text>
        <Text style={styles.answer}>
          Rendez-vous dans la section "Mon compte" pour mettre à jour votre
          profil.
        </Text>
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
    paragraph: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 20,
    },
    link: {
      color: '#10B981',
    },
    faqSection: {
      marginTop: 10,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
      color: colors.text,
    },
    question: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 4,
    },
    answer: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 12,
    },
  });
