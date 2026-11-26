import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ExpenseItem from '../components/ExpenseItem';
import { useExpenses } from '../context/ExpensesContext';
import { useSettings } from '../context/SettingsContext';
import { formatAmount } from '../data/categories';

/**
 * Pantalla de Listado de Gastos (ExpensesScreen)
 * Corresponde a: User Story #5 (#main-s1-us5) y User Story #2 Sprint 3 (#main-s3-us2)
 * Asignado a: Manuel / Benjamín (resumen real y estado vacío)
 */
export default function ExpensesScreen({ navigation }) {
  const { expenses } = useExpenses();
  const { theme } = useSettings();

  const totalAmount = expenses.reduce(
    (acc, item) => acc + Number(item.amount || 0),
    0
  );
  const totalMovements = expenses.length;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: theme.text }]}>Mis Gastos</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('NewExpenseModal')}
        >
          <Text style={styles.addButtonText}>+ Nuevo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.summaryLabel, { color: theme.textMuted }]}>Total registrado</Text>
          <Text style={[styles.summaryValue, { color: theme.text }, styles.summaryHighlight]}>
            {formatAmount(totalAmount)}
          </Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.summaryLabel, { color: theme.textMuted }]}>Movimientos</Text>
          <Text style={[styles.summaryValue, { color: theme.text }]}>{totalMovements}</Text>
        </View>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseItem
            title={item.title}
            amount={item.amount}
            category={item.category}
            onPress={() => navigation.navigate('ExpenseDetail', { id: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={[styles.emptyCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.emptyTitle, { color: theme.text }]}>Todavía no registraste gastos</Text>
            <Text style={[styles.emptySubtitle, { color: theme.textMuted }]}>
              Tocá "+ Nuevo" para registrar tu primer movimiento.
            </Text>
          </View>
        }
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  addButton: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 14,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  summaryHighlight: {
    color: '#10B981',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});