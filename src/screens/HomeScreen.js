import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useExpenses } from '../context/ExpensesContext';
import { formatAmount } from '../data/categories';

/**
 * Pantalla de Bienvenida (HomeScreen)
 * Corresponde a: User Story #3 (#main-s1-us3) y User Story #2 Sprint 3 (#main-s3-us2)
 * Asignado a: Conrado / Benjamín (resumen real y estado vacío)
 *
 * Requerimientos cumplidos:
 * - Nombre de la aplicación visible (ExpenseTracker).
 * - Mensaje de bienvenida destacado y descripción.
 * - Resumen real (total + movimientos) desde ExpensesContext.
 * - Estado vacío ("Todavía no registraste gastos") cuando no hay movimientos.
 */
const HomeScreen = ({ navigation }) => {
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

            {totalMovements === 0 ? (
                <View style={styles.emptyCard}>
                    <Text style={styles.emptyText}>Todavía no registraste gastos</Text>
                </View>
            ) : null}

            {navigation ? (
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => navigation.navigate('NewExpenseModal')}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.primaryButtonText}>Registrar Nuevo Gasto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => navigation.navigate('Gastos')}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.secondaryButtonText}>Ver Listado Completo</Text>
                    </TouchableOpacity>
                </View>
            ) : null}

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
        marginBottom: 24, 
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
        paddingVertical: 28,
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
        marginBottom: 12,
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
    emptyCard: {
        width: '100%',
        marginTop: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#D1D5DB',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#4B5563',
        textAlign: 'center',
    },
    actionsContainer: {
        width: '100%',
        marginTop: 16,
        gap: 10,
    },
    primaryButton: {
        backgroundColor: '#10B981',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#10B981',
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#10B981',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
