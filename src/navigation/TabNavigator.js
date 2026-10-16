import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

/**
 * Navegador de Pestañas Inferior (TabNavigator)
 * Corresponde a: User Story #2 (#rn-s1-us2) y User Story #6 (#rn-s1-us6)
 * Asignado a: Jerónimo (integración completa e íconos en US #6 / US #7)
 */
export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Gastos" component={ExpensesScreen} />
      <Tab.Screen name="Ajustes" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
