import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { getTheme } from '../styles/theme';

/**
 * Contexto global de preferencias de la aplicación (SettingsContext.js)
 * Corresponde a: User Story #1 (#per-s3-us1) — Sprint 3
 * Asignado a: Conrado
 *
 * Centraliza los ajustes locales (Notificaciones y Modo oscuro) junto con el
 * tema visual activo para habilitar cambio de paleta real en toda la app.
 * En US #3 se conectará a AsyncStorage usando SETTINGS_STORAGE_KEY.
 */
export const SETTINGS_STORAGE_KEY = '@expensetracker/settings';

export const DEFAULT_SETTINGS = {
  notifications: true,
  darkMode: false,
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isSettingsLoaded] = useState(true);

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
