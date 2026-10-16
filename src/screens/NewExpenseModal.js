import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Pantalla de Formulario de Carga de Gastos (NewExpenseModal)
 * Corresponde a: User Story #4 (#main-s1-us4)
 * Asignado a: Benjamín
 *
 * Requerimientos US #4:
 * - TextInput para Nombre del gasto.
 * - TextInput para Monto.
 * - Categoría.
 * - Botón "Guardar" que responda al evento onPress (ej. console.log, Alert o mensaje temporal).
 */
export default function NewExpenseModal() {
    const navigation = useNavigation(); 
    const [nombre, setNombre] = useState('');
    const [monto, setMonto] = useState(''); 
    const [categoria, setCategoria] = useState('');
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
    }, []);

    const onHandleSave = () => {
        if (!nombre || !monto || !categoria) {
            setError('Por favor, complete todos los campos obligatorios.');
            return;
        }
        setError('');

        // Cumpliendo el requerimiento de US #4 (Alerta temporal)
        alert(`Gasto guardado: ${nombre} - $${monto}`);

        setNombre('');
        setMonto('');
        setCategoria('');
        setDescripcion('');
        
        navigation.goBack(); 
    };

    return (
        <View style={styles.mainContainer}> 
            <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
                
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Nuevo Gasto</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                        <Ionicons name="close" size={28} color="#4B5563" />
                    </TouchableOpacity>
                </View>

                <TextInput 
                    value={nombre} 
                    onChangeText={setNombre} 
                    style={styles.input} 
                    placeholder='Nombre del gasto *' 
                    placeholderTextColor="#9CA3AF"
                />
                <TextInput 
                    value={monto} 
                    onChangeText={setMonto} 
                    style={styles.input} 
                    placeholder='Monto (ej. 1500) *' 
                    keyboardType="numeric" 
                    placeholderTextColor="#9CA3AF"
                />
                <TextInput 
                    value={categoria} 
                    onChangeText={setCategoria} 
                    style={styles.input} 
                    placeholder='Categoría (ej. Comida) *' 
                    placeholderTextColor="#9CA3AF"
                />
                
                <TextInput 
                    value={descripcion} 
                    onChangeText={setDescripcion} 
                    style={[styles.input, styles.textArea]} 
                    placeholder='Descripción (Opcional)' 
                    placeholderTextColor="#9CA3AF"
                    multiline={true} 
                    numberOfLines={3} 
                />

                <TouchableOpacity style={styles.saveButton} onPress={onHandleSave}>
                    <Text style={styles.saveButtonText}>Guardar</Text>
                </TouchableOpacity>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </Animated.View>

            <StatusBar style="light" />
        </View>
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
        marginBottom: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#10B981',
        letterSpacing: 0.5,
    },
    closeButton: {
        padding: 5,
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
        color: '#1F2937',
    },
    textArea: {
        minHeight: 80, 
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#10B981',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 14,
        marginTop: 12,
        textAlign: 'center',
        fontWeight: '500',
    }
});