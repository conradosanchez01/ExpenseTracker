import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useExpenses } from '../context/ExpensesContext';
import { formatAmount } from '../data/categories';

/**
 * Pantalla de Bienvenida (HomeScreen)
 * Corresponde a: User Story #3 (#main-s1-us3)
 * Asignado a: Conrado
 *
 * Requerimientos cumplidos US #3:
 * - Nombre de la aplicación visible (ExpenseTracker).
 * - Mensaje de bienvenida destacado.
 * - Breve descripción de la funcionalidad de registro de gastos.
 * - Utilización de componentes Text, View, StyleSheet y StatusBar.
 */
const HomeScreen = () => {
    const { expenses } = useExpenses();
    const totalAmount = expenses.reduce(
        (acc, item) => acc + Number(item.amount || 0),
        0
    );
    const totalMovements = expenses.length;

    return (
        <View style={styles.mainContainer}>
            {/* Contenedor del Título Principal */}
            <View style={styles.headerContainer}>
                <Text style={styles.title}>ExpenseTracker</Text>
            </View>

            {/* Tarjeta con el contenido de bienvenida */}
            <View style={styles.card}>
                <Text style={styles.subtitle}>¡Bienvenido a ExpenseTracker!</Text>
                <Text style={styles.description}>
                    ExpenseTracker es una aplicación diseñada para ayudarte a registrar, 
                    gestionar y controlar tus gastos diarios de una manera rápida y sencilla.
                </Text>
            </View>

            {/* Resumen conectado al Context */}
            <View style={styles.summaryRow}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Total registrado</Text>
                    <Text style={[styles.summaryValue, styles.summaryHighlight]}>
                        {formatAmount(totalAmount)}
                    </Text>
                </View>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Movimientos</Text>
                    <Text style={styles.summaryValue}>{totalMovements}</Text>
                </View>
            </View>

            <StatusBar style="dark" />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F4F6F8',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    headerContainer: {
        marginBottom: 40, 
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#10B981', 
        letterSpacing: 0.5,
    },
    card: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        paddingVertical: 35,
        paddingHorizontal: 25,
        borderRadius: 20, 
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    subtitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#1F2937', 
        marginBottom: 15,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#4B5563', 
        textAlign: 'center',
        lineHeight: 24, 
    },
    summaryRow: {
        flexDirection: 'row',
        width: '100%',
        gap: 12,
        marginTop: 16,
    },
    summaryCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 14,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    summaryLabel: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 6,
    },
    summaryValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    summaryHighlight: {
        color: '#10B981',
    },
});
