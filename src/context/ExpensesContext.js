import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * Contexto global de gastos (ExpensesContext.js)
 * Corresponde a: User Story #1 (#per-s3-us1) — Sprint 3
 * Asignado a: Conrado
 *
 * Centraliza el estado y las operaciones sobre los gastos para que todas las
 * pantallas accedan únicamente a través de useExpenses(). En esta primera
 * etapa (US #1) vive en memoria; en US #3 (AsyncStorage) y US #5 (Firestore)
 * solo se cambia el origen de persistencia dentro de este Provider.
 */
export const EXPENSES_STORAGE_KEY = '@expensetracker/expenses';

const ExpensesContext = createContext(null);

const createExpenseId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [isLoaded] = useState(true);

  const addExpense = useCallback((data = {}) => {
    const newExpense = {
      id: data.id || createExpenseId(),
      title: String(data.title || '').trim(),
      amount: Number(data.amount),
      category: data.category || 'Otros',
      notes: String(data.notes || '').trim(),
      createdAt: data.createdAt || new Date().toISOString(),
    };

    setExpenses((prev) => [newExpense, ...prev]);
    return newExpense;
  }, []);

  const removeExpense = useCallback((id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const getExpenseById = useCallback(
    (id) => expenses.find((item) => item.id === id),
    [expenses]
  );

  const value = useMemo(
    () => ({
      expenses,
      isLoaded,
      addExpense,
      removeExpense,
      getExpenseById,
    }),
    [expenses, isLoaded, addExpense, removeExpense, getExpenseById]
  );

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses debe usarse dentro de un ExpensesProvider');
  }
  return context;
}

export default ExpensesContext;
