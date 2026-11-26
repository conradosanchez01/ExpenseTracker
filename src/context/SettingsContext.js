import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTheme } from '../styles/theme';

/**
 * Contexto global de preferencias de la aplicación (SettingsContext.js)
 * Corresponde a: User Story #1 (#per-s3-us1) — Sprint 3
 * Asignado a: Conrado
 *
 * Centraliza los ajustes locales (Notificaciones y Modo oscuro) junto con el
 * tema visual activo para habilitar cambio de paleta real en toda la app.
 *
 * US #3 (#rn-s3-us3) — Manuel / Jerónimo: los dos switches se persisten en
 * AsyncStorage (@expensetracker/settings). AsyncStorage es asíncrono, así que
 * se hidrata al montar y se expone la bandera isSettingsLoaded: hasta que no
 * termina la lectura NO se guarda nada (si no, los valores por defecto
 * pisarían lo que había guardado).
 */
export const SETTINGS_STORAGE_KEY = '@expensetracker/settings';

export const DEFAULT_SETTINGS = {
  notifications: true,
  darkMode: false,
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isSettingsLoaded, setIsSettingsLoaded] = useState(false);

  // Hidratación: lee los ajustes guardados una sola vez al montar.
  useEffect(() => {
    let cancelled = false;

    const loadSettings = async () => {
      try {
        const raw = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
        if (raw && !cancelled) {
          const stored = JSON.parse(raw);
          setSettings({
            notifications:
              typeof stored?.notifications === 'boolean'
                ? stored.notifications
                : DEFAULT_SETTINGS.notifications,
            darkMode:
              typeof stored?.darkMode === 'boolean'
                ? stored.darkMode
                : DEFAULT_SETTINGS.darkMode,
          });
        }
      } catch (error) {
        console.warn('[Settings] No se pudieron leer los ajustes guardados:', error);
      } finally {
        if (!cancelled) setIsSettingsLoaded(true);
      }
    };

    loadSettings();
    return () => {
      cancelled = true;
    };
  }, []);

  // Persistencia: solo después de hidratar (ver comentario de cabecera).
  useEffect(() => {
    if (!isSettingsLoaded) return;
    AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings)).catch((error) => {
      console.warn('[Settings] No se pudieron guardar los ajustes:', error);
    });
  }, [settings, isSettingsLoaded]);

  const setNotifications = useCallback((value) => {
    setSettings((prev) => ({
      ...prev,
      notifications: Boolean(value),
    }));
  }, []);

  const setDarkMode = useCallback((value) => {
    setSettings((prev) => ({
      ...prev,
      darkMode: Boolean(value),
    }));
  }, []);

  const toggleNotifications = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      notifications: !prev.notifications,
    }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      darkMode: !prev.darkMode,
    }));
  }, []);

  const theme = useMemo(() => getTheme(settings.darkMode), [settings.darkMode]);

  const value = useMemo(
    () => ({
      settings,
      notifications: settings.notifications,
      darkMode: settings.darkMode,
      isSettingsLoaded,
      theme,
      setNotifications,
      setDarkMode,
      toggleNotifications,
      toggleDarkMode,
    }),
    [
      settings,
      isSettingsLoaded,
      theme,
      setNotifications,
      setDarkMode,
      toggleNotifications,
      toggleDarkMode,
    ]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings debe usarse dentro de un SettingsProvider');
  }
  return context;
}

export default SettingsContext;
