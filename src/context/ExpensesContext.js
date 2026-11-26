import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Contexto global de gastos (ExpensesContext.js)
 * Corresponde a: User Story #1 (#per-s3-us1) — Sprint 3
 * Asignado a: Conrado
 *
 * Centraliza el estado y las operaciones sobre los gastos para que todas las
 * pantallas accedan únicamente a través de useExpenses(). En esta primera
 * etapa (US #1) vive en memoria; en US #3 (AsyncStorage) y US #5 (Firestore)
 * solo se cambia el origen de persistencia dentro de este Provider.
 *
 * US #3 (#rn-s3-us3) — Manuel / Jerónimo: los gastos se guardan en AsyncStorage
 * (@expensetracker/expenses). Hidratación asíncrona con la bandera isLoaded:
 * mientras vale false la app muestra un ActivityIndicator (ver App.js) y no se
 * escribe nada en disco, para no pisar los datos guardados con una lista vacía.
 */
export const EXPENSES_STORAGE_KEY = '@expensetracker/expenses';

const ExpensesContext = createContext(null);

const createExpenseId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hidratación: lee los gastos guardados una sola vez al montar.
  useEffect(() => {
    let cancelled = false;

    const loadExpenses = async () => {
      try {
        const raw = await AsyncStorage.getItem(EXPENSES_STORAGE_KEY);
        const stored = raw ? JSON.parse(raw) : [];
        if (Array.isArray(stored) && !cancelled) {
          setExpenses(
            stored
              .filter((item) => item && typeof item.id === 'string' && Number.isFinite(Number(item.amount)))
              .map((item) => ({
                id: item.id,
                title: String(item.title ?? item.description ?? '').trim(),
                amount: Number(item.amount),
                category: item.category || 'Otros',
                notes: String(item.notes ?? '').trim(),
                createdAt: item.createdAt || item.date || new Date().toISOString(),
              }))
          );
        }
      } catch (error) {
        console.warn('[Expenses] No se pudieron leer los gastos guardados:', error);
      } finally {
        if (!cancelled) setIsLoaded(true);
      }
    };

    loadExpenses();
    return () => {
      cancelled = true;
    };
  }, []);

  // Persistencia: solo después de hidratar (ver comentario de cabecera).
  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses)).catch((error) => {
      console.warn('[Expenses] No se pudieron guardar los gastos:', error);
    });
  }, [expenses, isLoaded]);

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
