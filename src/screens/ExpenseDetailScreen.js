import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useExpenses } from '../context/ExpensesContext';
import { formatAmount, formatDate, getCategoryMeta } from '../data/categories';

/**
 * Pantalla de Detalle de Gasto (ExpenseDetailScreen.js)
 * Corresponde a: User Story #6 (#rn-s1-us6) y User Story #2 Sprint 3 (#main-s3-us2)
 * Asignado a: Manuel / Benjamín (búsqueda por { id } en Context y eliminación con confirmación)
 */
export default function ExpenseDetailScreen({ route, navigation }) {
  const { getExpenseById, removeExpense } = useExpenses();
  const expenseId = route?.params?.id;
  const expense = expenseId ? getExpenseById(expenseId) : undefined;

  if (!expense) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.notFoundTitle}>Gasto no encontrado</Text>
          <Text style={styles.notFoundText}>
            No se encontró el gasto solicitado o fue eliminado.
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Volver al listado</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const categoryMeta = getCategoryMeta(expense.category);
  const displayTitle = expense.title || expense.description || 'Sin título';

  const handleDelete = () => {
    Alert.alert(
      'Eliminar gasto',
      `¿Estás seguro de que querés eliminar "${displayTitle}" (${formatAmount(expense.amount)})?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            removeExpense(expense.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Título</Text>
        <Text style={styles.value}>{displayTitle}</Text>

        <Text style={styles.label}>Monto</Text>
        <Text style={[styles.value, styles.amount]}>{formatAmount(expense.amount)}</Text>

        <Text style={styles.label}>Categoría</Text>
        <View style={[styles.categoryBadge, { backgroundColor: categoryMeta.backgroundColor }]}>
          <Text style={[styles.categoryText, { color: categoryMeta.color }]}>
            {expense.category || 'Sin categoría'}
          </Text>
        </View>

        <Text style={styles.label}>Fecha</Text>
        <Text style={styles.value}>{formatDate(expense.createdAt)}</Text>

        <Text style={styles.label}>Notas</Text>
        <Text style={styles.value}>{expense.notes || 'Sin notas'}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        activeOpacity={0.85}
      >
        <Text style={styles.deleteButtonText}>Eliminar gasto</Text>
      </TouchableOpacity>
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
    color: '#1F2937',
    marginTop: 2,
  },
  amount: {
    color: '#c0392b',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  notFoundTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  notFoundText: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#1F2937',
    fontSize: 15,
    fontWeight: '600',
  },
  deleteButton: {
    marginTop: 16,
    backgroundColor: '#c0392b',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});