/**
 * Catálogo oficial de categorías y utilidades de formato (categories.js)
 * Corresponde a: User Story #1 (#per-s3-us1) — Sprint 3
 * Asignado a: Conrado
 *
 * Centraliza las 6 categorías oficiales del proyecto, junto con sus colores, íconos y
 * funciones de formateo reutilizables en todas las pantallas.
 */
export const CATEGORIES = [
  {
    name: 'Alimentos',
    color: '#166534',
    backgroundColor: '#DCFCE7',
    icon: 'fast-food-outline',
  },
  {
    name: 'Transporte',
    color: '#1E40AF',
    backgroundColor: '#DBEAFE',
    icon: 'car-outline',
  },
  {
    name: 'Servicios',
    color: '#92400E',
    backgroundColor: '#FEF3C7',
    icon: 'flash-outline',
  },
  {
    name: 'Salud',
    color: '#9D174D',
    backgroundColor: '#FCE7F3',
    icon: 'medkit-outline',
  },
  {
    name: 'Ocio',
    color: '#5B21B6',
    backgroundColor: '#EDE9FE',
    icon: 'game-controller-outline',
  },
  {
    name: 'Otros',
    color: '#374151',
    backgroundColor: '#E5E7EB',
    icon: 'pricetag-outline',
  },
];

export const CATEGORY_NAMES = CATEGORIES.map((cat) => cat.name);

export const getCategoryMeta = (categoryName) =>
  CATEGORIES.find((cat) => cat.name === categoryName) ||
  CATEGORIES[CATEGORIES.length - 1];

export const formatAmount = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return '$0';

  const isNegative = numeric < 0;
  const absValue = Math.abs(numeric);
  const fixed = Number.isInteger(absValue) ? String(absValue) : absValue.toFixed(2);
  const [intPart, decPart] = fixed.split('.');
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const sign = isNegative ? '-' : '';

  return decPart ? `${sign}$${formattedInt},${decPart}` : `${sign}$${formattedInt}`;
};

export const formatDate = (value) => {
  if (!value) return 'Sin fecha';

  if (typeof value === 'string') {
    const trimmed = value.trim();
    const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
    if (dateOnlyMatch) {
      const [, year, month, day] = dateOnlyMatch;
      return `${day}/${month}/${year}`;
    }
  }

  let dateObj;
  if (typeof value?.toDate === 'function') {
    dateObj = value.toDate();
  } else if (value instanceof Date) {
    dateObj = value;
  } else {
    dateObj = new Date(value);
  }

  if (!(dateObj instanceof Date) || Number.isNaN(dateObj.getTime())) {
    return 'Sin fecha';
  }

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = String(dateObj.getFullYear());
  return `${day}/${month}/${year}`;
};

export default CATEGORIES;
