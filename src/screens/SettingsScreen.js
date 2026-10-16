import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Pantalla de Configuración (SettingsScreen)
 * Corresponde a: User Story #2 (#rn-s1-us2) y User Story #6 (#rn-s1-us6)
 * Asignado a: Jerónimo
 */
export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      <Text style={styles.subtitle}>Ajustes de la aplicación (Pendiente US #6 - Jerónimo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
