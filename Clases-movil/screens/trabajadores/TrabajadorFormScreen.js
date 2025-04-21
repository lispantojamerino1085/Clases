// screens/trabajadores/TrabajadorFormScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Alert, 
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { 
  createTrabajador, 
  updateTrabajador, 
  getTrabajador 
} from '../../api/trabajadores';
import { getAllDepartamentos } from '../../api/departamentos';
import Loading from '../../components/Loading';
import Button from '../../components/Button';

const TrabajadorFormScreen = ({ route, navigation }) => {
  // Check if we're editing an existing trabajador or creating a new one
  const editMode = route.params?.trabajador ? true : false;
  const trabajadorId = route.params?.trabajador?.id;
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: '',
    id_departamento: '',
  });
  
  const [departamentos, setDepartamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        // Cargar departamentos
        const deptos = await getAllDepartamentos();
        setDepartamentos(deptos);
        
        // Si estamos en modo edición, cargar los datos del trabajador
        if (editMode && trabajadorId) {
          const data = await getTrabajador(trabajadorId);
          setFormData({
            nombre: data.nombre || '',
            apellido: data.apellido || '',
            correo: data.correo || '',
            telefono: data.telefono || '',
            direccion: data.direccion || '',
            id_departamento: data.departamento?.id || '',
          });
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar los datos');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [editMode, trabajadorId]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    
    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es obligatorio';
    }
    
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es obligatorio';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.correo)) {
      newErrors.correo = 'El correo no es válido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    // Clear error when user types
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      });
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      const dataToSend = {
        ...formData,
      };
      
      if (editMode) {
        await updateTrabajador(trabajadorId, dataToSend);
        Alert.alert('Éxito', 'Trabajador actualizado correctamente');
      } else {
        console.log(dataToSend);
        await createTrabajador(dataToSend);
        Alert.alert('Éxito', 'Trabajador creado correctamente');
      }
      
      navigation.goBack();
    } catch (error) {
      const errorMsg = editMode ? 
        'No se pudo actualizar el trabajador' : 
        'No se pudo crear el trabajador de prueba';
      
      Alert.alert('Error', errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>
            {editMode ? 'Editar Trabajador' : 'Nuevo Trabajador'}
          </Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nombre *</Text>
            <TextInput
              style={[styles.input, errors.nombre && styles.inputError]}
              value={formData.nombre}
              onChangeText={(value) => handleChange('nombre', value)}
              placeholder="Nombre del trabajador"
            />
            {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Apellido *</Text>
            <TextInput
              style={[styles.input, errors.apellido && styles.inputError]}
              value={formData.apellido}
              onChangeText={(value) => handleChange('apellido', value)}
              placeholder="Apellido del trabajador"
            />
            {errors.apellido && <Text style={styles.errorText}>{errors.apellido}</Text>}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Correo electrónico *</Text>
            <TextInput
              style={[styles.input, errors.correo && styles.inputError]}
              value={formData.correo}
              onChangeText={(value) => handleChange('correo', value)}
              placeholder="ejemplo@correo.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.correo && <Text style={styles.errorText}>{errors.correo}</Text>}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={styles.input}
              value={formData.telefono}
              onChangeText={(value) => handleChange('telefono', value)}
              placeholder="Número de teléfono"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Dirección</Text>
            <TextInput
              style={styles.input}
              value={formData.direccion}
              onChangeText={(value) => handleChange('direccion', value)}
              placeholder="Dirección del trabajador"
              multiline
              numberOfLines={2}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Departamento</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.id_departamento}
                onValueChange={(value) => handleChange('id_departamento', value)}
                style={styles.picker}
              >
                <Picker.Item label="Seleccione un departamento" value="" />
                {departamentos.map(depto => (
                  <Picker.Item 
                    key={depto.id} 
                    label={depto.nombre} 
                    value={depto.id} 
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <Button
              title={editMode ? "Actualizar" : "Crear"}
              onPress={handleSubmit}
              disabled={submitting}
              loading={submitting}
              style={styles.saveButton}
            />
            <Button
              title="Cancelar"
              onPress={() => navigation.goBack()}
              type="secondary"
              style={styles.cancelButton}
              disabled={submitting}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#333',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  errorText: {
    color: '#FF6B6B',
    marginTop: 5,
    fontSize: 14,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonsContainer: {
    marginTop: 10,
  },
  saveButton: {
    marginBottom: 10,
  },
  cancelButton: {
    marginBottom: 20,
  },
});

export default TrabajadorFormScreen;