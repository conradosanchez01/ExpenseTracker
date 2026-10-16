import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const formatAmount = (value) =>
  '$' + String(value || 0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default function ExpenseDetailScreen({ route }) {
  const expense = route?.params?.expense || {};

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.value}>{expense.description || 'Sin descripción'}</Text>

        <Text style={styles.label}>Monto</Text>
        <Text style={[styles.value, styles.amount]}>{formatAmount(expense.amount)}</Text>

        <Text style={styles.label}>Categoría</Text>
        <Text style={styles.value}>{expense.category || 'Sin categoría'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontSize: 13,
    color: '#888',
    marginTop: 12,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 2,
  },
  amount: {
    color: '#c0392b',
  },
});