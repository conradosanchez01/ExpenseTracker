import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Pantalla de Listado de Gastos (ExpensesScreen)
 * Corresponde a: User Story #5 (#main-s1-us5)
 * Asignado a: Manuel
 *
 * Requerimientos US #5:
 * - Mostrar al menos:
 *   - Supermercado ($25000)
 *   - Combustible ($18000)
 *   - Internet ($32000)
 * - Ordenados como lista, mostrando descripción y monto de cada gasto.
 */
export default function ExpensesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Gastos</Text>
      <Text style={styles.subtitle}>Listado de gastos (Pendiente US #5 - Manuel)</Text>
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
