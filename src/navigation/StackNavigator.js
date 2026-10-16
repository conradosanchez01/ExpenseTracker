import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import ExpenseDetailScreen from '../screens/ExpenseDetailScreen';
import NewExpenseModal from '../screens/NewExpenseModal';

const Stack = createNativeStackNavigator();

/**
 * Navegador de Pila Raíz (StackNavigator)
 * Corresponde a: User Story #2 (#rn-s1-us2) y User Story #6 (#rn-s1-us6)
 * Asignado a: Jerónimo (integración de todas las vistas en US #6)
 */
export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExpenseDetail"
        component={ExpenseDetailScreen}
        options={{ title: 'Detalle de Gasto' }}
      />
      <Stack.Screen
        name="NewExpenseModal"
        component={NewExpenseModal}
        options={{ presentation: 'modal', title: 'Nuevo Gasto' }}
      />
    </Stack.Navigator>
  );
}
