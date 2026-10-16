import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Componente reutilizable para mostrar un ítem de gasto en el listado.
 * Corresponde a: User Story #5 (#main-s1-us5) / User Story #6 (#rn-s1-us6)
 * Asignado a: Manuel
 */
const formatAmount = (value) =>
  '$' + String(value || 0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default function ExpenseItem({ description, amount, category }) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.description}>{description || 'Gasto'}</Text>
        {category ? <Text style={styles.category}>{category}</Text> : null}
      </View>
      <Text style={styles.amount}>{formatAmount(amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  info: {
    flexShrink: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
  },
  category: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c0392b',
  },
});
