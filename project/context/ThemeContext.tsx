import React, { createContext, useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
}

interface ThemeContextValue {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');

  const themes: Record<ThemeMode, ThemeColors> = {
    light: {
      background: '#F9FAFB',
      card: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280',
      border: '#E5E7EB'
    },
    dark: {
      background: '#1F2937',
      card: '#374151',
      text: '#F9FAFB',
      textSecondary: '#D1D5DB',
      border: '#4B5563'
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = themes[theme];

  useEffect(() => {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.style = { ...(Text.defaultProps.style || {}), color: colors.text };
  }, [colors]);

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
