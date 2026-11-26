import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';

/**
 * Pantalla de Configuración (SettingsScreen.js)
 * Corresponde a: User Story #6 (#rn-s1-us6) y User Story #3 Sprint 3 (#rn-s3-us3)
 * Asignado a: Manuel / Jerónimo
 *
 * Los dos switches (Notificaciones y Modo oscuro) viven en SettingsContext, que
 * los persiste en AsyncStorage (@expensetracker/settings) y aplica la paleta
 * clara/oscura en toda la app.
 */
export default function SettingsScreen() {
  const { theme, notifications, darkMode, setNotifications, setDarkMode } = useSettings();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Configuración</Text>

      <View style={[styles.row, { backgroundColor: theme.surface }]}>
        <Text style={[styles.rowText, { color: theme.text }]}>Notificaciones</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: theme.border, true: theme.primary }}
        />
      </View>

      <View style={[styles.row, { backgroundColor: theme.surface }]}>
        <Text style={[styles.rowText, { color: theme.text }]}>Modo oscuro</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: theme.border, true: theme.primary }}
        />
      </View>

      <View style={[styles.row, { backgroundColor: theme.surface }]}>
        <Text style={[styles.rowText, { color: theme.text }]}>Moneda</Text>
        <Text style={[styles.rowValue, { color: theme.textMuted }]}>ARS ($)</Text>
      </View>

      <View style={[styles.row, { backgroundColor: theme.surface }]}>
        <Text style={[styles.rowText, { color: theme.text }]}>Versión</Text>
        <Text style={[styles.rowValue, { color: theme.textMuted }]}>1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  rowText: {
    fontSize: 16,
  },
  rowValue: {
    fontSize: 16,
  },
});
