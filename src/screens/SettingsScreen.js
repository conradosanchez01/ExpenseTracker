import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <View style={styles.row}>
        <Text style={styles.rowText}>Notificaciones</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Moneda</Text>
        <Text style={styles.rowValue}>ARS ($)</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Versión</Text>
        <Text style={styles.rowValue}>1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  rowText: {
    fontSize: 16,
  },
  rowValue: {
    fontSize: 16,
    color: '#888',
  },
});