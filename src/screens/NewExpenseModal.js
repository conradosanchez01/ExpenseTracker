import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Animated,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../context/ExpensesContext';
import { useSettings } from '../context/SettingsContext';
import { CATEGORIES } from '../data/categories';

/**
 * Pantalla de Formulario de Carga de Gastos (NewExpenseModal)
 * Corresponde a: User Story #4 (#main-s1-us4) y User Story #2 Sprint 3 (#main-s3-us2)
 * Asignado a: Benjamín
 *
 * Requerimientos US #2 (Sprint 3):
 * - Conectado a addExpense() del ExpensesContext.
 * - Validación de nombre no vacío y monto numérico > 0.
 * - Reemplazo del input libre de categoría por chips seleccionables usando CATEGORIES.
 */
export default function NewExpenseModal() {
    const navigation = useNavigation();
    const { addExpense } = useExpenses();
    const { theme } = useSettings();

    const [nombre, setNombre] = useState('');
    const [monto, setMonto] = useState('');
    const [categoria, setCategoria] = useState(CATEGORIES[0].name);
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState('');

    // Animación para que la tarjeta suba desde abajo (arranca 500px más abajo)
    const slideAnim = useRef(new Animated.Value(500)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
        }).start();
    }, [slideAnim]);

    const inputThemeStyle = {
        backgroundColor: theme.inputBackground,
        borderColor: theme.border,
        color: theme.text,
    };

    const resetForm = () => {
        setNombre('');
        setMonto('');
        setCategoria(CATEGORIES[0].name);
        setDescripcion('');
        setError('');
    };

    const handleClose = () => {
        resetForm();
        navigation.goBack();
    };

    const onHandleSave = () => {
        const cleanNombre = nombre.trim();
        const numericMonto = Number(String(monto).trim().replace(',', '.'));

        if (!cleanNombre) {
            setError('Por favor, ingresá un nombre para el gasto.');
            return;
        }

        if (!String(monto).trim() || !Number.isFinite(numericMonto) || numericMonto <= 0) {
            setError('Por favor, ingresá un monto numérico mayor a 0.');
            return;
        }

        if (!categoria) {
            setError('Por favor, seleccioná una categoría.');
            return;
        }

        setError('');

        addExpense({
            title: cleanNombre,
            amount: numericMonto,
            category: categoria,
            notes: descripcion.trim(),
        });

        handleClose();
    };

    return (
        <KeyboardAvoidingView
            style={styles.mainContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Animated.View
                style={[
                    styles.modalContent,
                    { backgroundColor: theme.surface, transform: [{ translateY: slideAnim }] },
                ]}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>Nuevo Gasto</Text>
                        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                            <Ionicons name="close" size={28} color={theme.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.label, { color: theme.text }]}>Nombre del gasto *</Text>
                    <TextInput
                        value={nombre}
                        onChangeText={(text) => {
                            setNombre(text);
                            if (error) setError('');
                        }}
                        style={[styles.input, inputThemeStyle]}
                        placeholder="Ej. Supermercado"
                        placeholderTextColor="#9CA3AF"
                    />

                    <Text style={[styles.label, { color: theme.text }]}>Monto *</Text>
                    <TextInput
                        value={monto}
                        onChangeText={(text) => {
                            setMonto(text);
                            if (error) setError('');
                        }}
                        style={[styles.input, inputThemeStyle]}
                        placeholder="Ej. 1500"
                        keyboardType="decimal-pad"
                        placeholderTextColor="#9CA3AF"
                    />

                    <Text style={[styles.label, { color: theme.text }]}>Categoría *</Text>
                    <View style={styles.chipsContainer}>
                        {CATEGORIES.map((cat) => {
                            const isSelected = categoria === cat.name;
                            return (
                                <TouchableOpacity
                                    key={cat.name}
                                    style={[
                                        styles.chip,
                                        { backgroundColor: theme.inputBackground, borderColor: theme.border },
                                        isSelected && styles.chipSelected,
                                    ]}
                                    onPress={() => {
                                        setCategoria(cat.name);
                                        if (error) setError('');
                                    }}
                                    activeOpacity={0.8}
                                >
                                    <Text
                                        style={[
                                            styles.chipText,
                                            { color: theme.textSecondary },
                                            isSelected && styles.chipTextSelected,
                                        ]}
                                    >
                                        {cat.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <Text style={[styles.label, { color: theme.text }]}>Notas (Opcional)</Text>
                    <TextInput
                        value={descripcion}
                        onChangeText={setDescripcion}
                        style={[styles.input, inputThemeStyle, styles.textArea]}
                        placeholder="Notas adicionales sobre el gasto"
                        placeholderTextColor="#9CA3AF"
                        multiline={true}
                        numberOfLines={3}
                    />

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <View style={styles.actionsRow}>
                        <TouchableOpacity
                            style={[styles.cancelButton, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}
                            onPress={handleClose}
                        >
                            <Text style={[styles.cancelButtonText, { color: theme.textSecondary }]}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton} onPress={onHandleSave}>
                            <Text style={styles.saveButtonText}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animated.View>

            <StatusBar style="light" />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        maxHeight: '90%',
        padding: 25,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#10B981',
        letterSpacing: 0.5,
    },
    closeButton: {
        padding: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 14,
        fontSize: 16,
        color: '#1F2937',
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
    },
    chip: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 999,
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        backgroundColor: '#F9FAFB',
    },
    chipSelected: {
        backgroundColor: '#10B981',
        borderColor: '#10B981',
    },
    chipText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4B5563',
    },
    chipTextSelected: {
        color: '#FFFFFF',
    },
    actionsRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
        marginBottom: 10,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#4B5563',
        fontSize: 16,
        fontWeight: 'bold',
    },
    saveButton: {
        flex: 1,
        backgroundColor: '#10B981',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#EF4444',
        backgroundColor: '#FEF2F2',
        borderWidth: 1,
        borderColor: '#FECACA',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: '500',
    },
});