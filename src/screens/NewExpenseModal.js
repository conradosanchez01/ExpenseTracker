import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Pantalla de Formulario de Carga de Gastos (NewExpenseModal)
 * Corresponde a: User Story #4 (#main-s1-us4)
 * Asignado a: Benjamín
 *
 * Requerimientos US #4:
 * - TextInput para Nombre del gasto.
 * - TextInput para Monto.
 * - Categoría.
 * - Botón "Guardar" que responda al evento onPress (ej. console.log, Alert o mensaje temporal).
 */
export default function NewExpenseModal() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo Gasto</Text>
      <Text style={styles.subtitle}>Formulario de carga (Pendiente US #4 - Benjamín)</Text>
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
