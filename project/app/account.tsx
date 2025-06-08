import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';

export default function AccountScreen() {
  const { colors } = useTheme();
  const { user, setUser } = useUser();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(String(user.age));
  const [height, setHeight] = useState(String(user.height));

  const styles = getStyles(colors);

  const saveProfile = () => {
    setUser((u) => ({
      ...u,
      name,
      email,
      age: Number(age),
      height: Number(height),
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon compte</Text>
      <View style={styles.formRow}>
        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.formRow}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.formRow}>
        <Text style={styles.label}>Âge</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.formRow}>
        <Text style={styles.label}>Taille (cm)</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Sauvegarder</Text>
      </TouchableOpacity>
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
    formRow: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 8,
      backgroundColor: colors.card,
      color: colors.text,
    },
    button: {
      marginTop: 20,
      backgroundColor: '#10B981',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontWeight: '600',
      fontSize: 16,
    },
  });
