import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ExpensesProvider } from './src/context/ExpensesContext';
import { SettingsProvider, useSettings } from './src/context/SettingsContext';
import StackNavigator from './src/navigation/StackNavigator';

function AppNavigator() {
  const { theme } = useSettings();

  return (
    <NavigationContainer>
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
