import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Pantalla de Bienvenida (HomeScreen)
 * Corresponde a: User Story #3 (#main-s1-us3)
 * Asignado a: Conrado
 *
 * Requerimientos US #3:
 * - Debe verse el nombre ExpenseTracker.
 * - Debe existir un mensaje de bienvenida.
 * - Debe existir una breve descripción indicando que la aplicación servirá para registrar gastos.
 * - Utilizar componentes Text, al menos un View y StyleSheet.
 */
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ExpenseTracker</Text>
      <Text style={styles.subtitle}>Pantalla de Bienvenida (Pendiente US #3 - Conrado)</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
