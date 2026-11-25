/**
 * Paleta de colores para modo claro y modo oscuro (theme.js)
 * Corresponde a: User Story #1 (#per-s3-us1) — Sprint 3
 * Asignado a: Conrado
 */
export const LIGHT_THEME = {
  background: '#F4F6F8',
  surface: '#FFFFFF',
  inputBackground: '#F9FAFB',
  text: '#1F2937',
  textSecondary: '#4B5563',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  primary: '#10B981',
  primaryDark: '#059669',
  danger: '#C0392B',
  dangerBackground: '#FEE2E2',
  tabBarBackground: '#FFFFFF',
  tabBarBorder: '#E5E7EB',
  statusBarStyle: 'dark',
};

export const DARK_THEME = {
  background: '#111827',
  surface: '#1F2937',
  inputBackground: '#374151',
  text: '#F9FAFB',
  textSecondary: '#D1D5DB',
  textMuted: '#9CA3AF',
  border: '#374151',
  primary: '#10B981',
  primaryDark: '#34D399',
  danger: '#F87171',
  dangerBackground: '#450A0A',
  tabBarBackground: '#1F2937',
  tabBarBorder: '#374151',
  statusBarStyle: 'light',
};

export const getTheme = (darkMode) => (darkMode ? DARK_THEME : LIGHT_THEME);

export default getTheme;
