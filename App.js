import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ExpensesProvider, useExpenses } from './src/context/ExpensesContext';
import { SettingsProvider, useSettings } from './src/context/SettingsContext';
import StackNavigator from './src/navigation/StackNavigator';

/**
 * Raíz de la app (App.js)
 * Corresponde a: User Story #1 (#per-s3-us1) y User Story #3 (#rn-s3-us3) — Sprint 3
 *
 * Hidratación: mientras AsyncStorage (o Firestore) no entregó los datos
 * (isLoaded / isSettingsLoaded en false) se muestra un ActivityIndicator, así
 * no se ve un destello de lista vacía ni de tema claro antes de aplicar el guardado.
 */
function AppNavigator() {
  const { theme, darkMode, isSettingsLoaded } = useSettings();
  const { isLoaded } = useExpenses();

  const navigationTheme = {
    ...(darkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(darkMode ? DarkTheme : DefaultTheme).colors,
      primary: theme.primary,
      background: theme.background,
      card: theme.surface,
      text: theme.text,
      border: theme.border,
    },
  };

  if (!isSettingsLoaded || !isLoaded) {
    return (
      <View style={[styles.loading, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <StatusBar style={theme.statusBarStyle} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <StackNavigator />
      <StatusBar style={theme.statusBarStyle} />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <ExpensesProvider>
        <AppNavigator />
      </ExpensesProvider>
    </SettingsProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
