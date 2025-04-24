// screens/departamentos/DepartamentosScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createDepartamento, updateDepartamento } from '../../api/departamentos';

const DepartamentoFormScreen = ({ route, navigation }) => {
  const [nombre, setNombre] = useState('');
  const [editing, setEditing] = useState(false);
  const departamento = route.params?.departamento;

  useEffect(() => {
    if (departamento) {
      setEditing(true);
      setNombre(departamento.nombre);
    }
  }, [departamento]);

  const handleSubmit = async () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre del departamento es obligatorio');
      return;
    }

    try {
      if (editing) {
        await updateDepartamento(departamento.id, { nombre });
        Alert.alert('Éxito', 'Departamento actualizado correctamente');
      } else {
        await createDepartamento({ nombre });
        Alert.alert('Éxito', 'Departamento creado correctamente');
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al guardar el departamento');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {editing ? 'Editar Departamento' : 'Nuevo Departamento'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del Departamento"
        value={nombre}
        onChangeText={setNombre}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {editing ? 'Actualizar' : 'Guardar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DepartamentoFormScreen;
