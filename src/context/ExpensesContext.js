import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../services/firebase';

/**
 * Contexto global de gastos (ExpensesContext.js)
 * Corresponde a: User Story #1 (#per-s3-us1) y User Story #5 (#per-s3-us5-rn) — Sprint 3
 * Asignado a: Conrado / Manuel / Jerónimo
 *
 * Fuente de verdad: colección "expenses" de Cloud Firestore (la misma que usa
 * la PWA, por eso las dos apps se sincronizan en tiempo real).
 * - onSnapshot (orderBy createdAt desc): lista en vivo.
 * - addDoc / deleteDoc NO se esperan (await): Firestore actualiza la lista local
 *   al instante y sincroniza con el servidor cuando hay conexión. Si se
 *   esperara addDoc, offline el modal quedaría abierto indefinidamente porque
 *   la promesa solo se resuelve cuando el servidor confirma.
 * La API pública (expenses, isLoaded, addExpense, removeExpense,
 * getExpenseById) no cambió: las pantallas no se modifican.
 *
 * Los ajustes (Notificaciones / Modo oscuro) siguen en AsyncStorage
 * (SettingsContext).
 */
export const EXPENSES_COLLECTION = 'expenses';

// Si Firestore tarda en responder (p. ej. sin red y sin caché), no se deja la
// app en el spinner para siempre: pasados 4 s se muestra la UI (vacía).
const LOAD_TIMEOUT_MS = 4000;

const ExpensesContext = createContext(null);

const toISOString = (value) => {
  if (!value) return new Date().toISOString();
  if (typeof value.toDate === 'function') return value.toDate().toISOString();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
};

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const expensesQuery = query(
      collection(db, EXPENSES_COLLECTION),
      orderBy('createdAt', 'desc')
    );

    const timeoutId = setTimeout(() => setIsLoaded(true), LOAD_TIMEOUT_MS);

    const unsubscribe = onSnapshot(
      expensesQuery,
      { includeMetadataChanges: true },
      (snapshot) => {
        const items = snapshot.docs.map((document) => {
          // 'estimate': mientras el servidor no confirma serverTimestamp(), se usa la hora local.
          const data = document.data({ serverTimestamps: 'estimate' });
          return {
            id: document.id,
            title: String(data.title ?? ''),
            amount: Number(data.amount) || 0,
            category: data.category || 'Otros',
            notes: String(data.notes ?? ''),
            createdAt: toISOString(data.createdAt),
          };
        });
        setExpenses(items);
        setIsLoaded(true);
        if (__DEV__) {
          console.log('[Firestore]', {
            gastos: items.length,
            desdeCache: snapshot.metadata.fromCache,
            escriturasPendientes: snapshot.metadata.hasPendingWrites,
          });
        }
      },
      (error) => {
        console.warn('[Firestore] Error al escuchar los gastos:', error);
        setIsLoaded(true);
      }
    );

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, []);

  const addExpense = useCallback((data = {}) => {
    const payload = {
      title: String(data.title || '').trim(),
      amount: Number(data.amount),
      category: data.category || 'Otros',
      notes: String(data.notes || '').trim(),
      createdAt: serverTimestamp(),
    };

    // Sin await: no bloquea el cierre del modal (offline la promesa queda pendiente).
    addDoc(collection(db, EXPENSES_COLLECTION), payload).catch((error) => {
      console.warn('[Firestore] No se pudo guardar el gasto:', error);
    });

    return { ...payload, createdAt: new Date().toISOString() };
  }, []);

  const removeExpense = useCallback((id) => {
    deleteDoc(doc(db, EXPENSES_COLLECTION, id)).catch((error) => {
      console.warn('[Firestore] No se pudo eliminar el gasto:', error);
    });
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
