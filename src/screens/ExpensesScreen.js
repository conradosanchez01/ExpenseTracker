import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ExpenseItem from '../components/ExpenseItem';

/**
 * Pantalla de Listado de Gastos (ExpensesScreen)
 * Corresponde a: User Story #5 (#main-s1-us5)
 * Asignado a: Manuel
 */
const EXPENSES = [
  { id: '1', description: 'Supermercado', amount: 25000, category: 'Alimentos' },
  { id: '2', description: 'Combustible', amount: 18000, category: 'Transporte' },
  { id: '3', description: 'Internet', amount: 32000, category: 'Servicios' },
];

export default function ExpensesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Gastos</Text>
      <FlatList
        data={EXPENSES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseItem
            description={item.description}
            amount={item.amount}
            category={item.category}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});