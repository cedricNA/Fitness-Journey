import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';

export default function Login() {
  const { login } = useUser();
  const { colors } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await login(email, password);
    router.replace('/');
  };

  return (
    <View className="flex-1 justify-center p-5" style={{ backgroundColor: colors.background }}>
      <Text className="text-center text-2xl font-bold mb-5" style={{ color: colors.text }}>
        Connexion
      </Text>
      <View className="mb-4">
        <Text className="mb-1 text-sm" style={{ color: colors.textSecondary }}>
          Email
        </Text>
        <TextInput
          className="rounded-lg border p-2"
          style={{ borderColor: colors.border, backgroundColor: colors.card, color: colors.text }}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View className="mb-4">
        <Text className="mb-1 text-sm" style={{ color: colors.textSecondary }}>
          Mot de passe
        </Text>
        <TextInput
          className="rounded-lg border p-2"
          style={{ borderColor: colors.border, backgroundColor: colors.card, color: colors.text }}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        className="mt-5 items-center rounded-lg bg-emerald-500 py-3"
        onPress={handleLogin}
      >
        <Text className="font-semibold text-white">Se connecter</Text>
      </TouchableOpacity>
      <Link href="/register" className="mt-4 text-center text-blue-500">
        Pas encore de compte ? Inscription
      </Link>
    </View>
  );
}
