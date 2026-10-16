import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Componente reutilizable para mostrar un ítem de gasto en el listado.
 * Corresponde a: User Story #5 (#main-s1-us5) / User Story #6 (#rn-s1-us6)
 * Asignado a: Manuel
 */
export default function ExpenseItem({ description, amount, category }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {description || 'Gasto'} - ${amount || 0}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  text: {
    fontSize: 16,
  },
});
