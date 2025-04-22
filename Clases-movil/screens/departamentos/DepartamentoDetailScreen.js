// screens/departamentos/DepartamentoDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { getDepartamento, deleteDepartamento } from '../../api/departamentos';
import { getTrabajadoresByDepartamento } from '../../api/trabajadores';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import { Ionicons } from '@expo/vector-icons';

const DepartamentoDetailScreen = ({ route, navigation }) => {
  const { departamentoId } = route.params;
  const [departamento, setDepartamento] = useState(null);
  const [trabajadores, setTrabajadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedTrabajadorId, setExpandedTrabajadorId] = useState(null);

  

  const loadData = async () => {
    try {
      const deptoData = await getDepartamento(departamentoId);
      //console.log(deptoData);
      setDepartamento(deptoData.data);
      
      // Esta API debe ser implementada en el  backend (trbajo para entrega)
      // Para obtener trabajadores por departamento
      const trabajadoresData = await getTrabajadoresByDepartamento(departamentoId);
      setTrabajadores(trabajadoresData);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar la información del departamento selecionado ');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
  
    return unsubscribe;
  }, [navigation]);
  

  const handleEdit = () => {
    navigation.navigate('DepartamentoForm', { departamento });
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este departamento? Esta acción podría afectar a los trabajadores asociados.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDepartamento(departamentoId);
              Alert.alert('Éxito', 'Departamento eliminado correctamente');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el departamento');
            }
          } 
        },
      ]
    );
  };

  if (loading) {
    return <Loading />;
  }

  const toggleExpand = (trabajadorId) => {
    setExpandedTrabajadorId(prevId => (prevId === trabajadorId ? null : trabajadorId));
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{departamento.nombre}</Text>
          
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleEdit}
            >
            <Ionicons name="create-outline" size={24} color="#007BFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleDelete}
              disabled={trabajadores.length > 0}
>
              <Ionicons
                name="trash-outline"
                size={24}
                color={trabajadores.length > 0 ? '#ccc' : '#FF6B6B'}
              />
            </TouchableOpacity>

            


          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Trabajadores en este departamento</Text>
          
          
          {trabajadores.length > 0 ? (
              trabajadores.map((trabajador) => (
                <View key={trabajador.id} style={styles.trabajadorItem}>
                  <TouchableOpacity
                    onPress={() => toggleExpand(trabajador.id)}
                    style={styles.trabajadorHeader}
                  >
                    <Text style={styles.trabajadorName}>
                      {trabajador.nombre} {trabajador.apellido}
                    </Text>
                    <Ionicons
                      name={expandedTrabajadorId === trabajador.id ? 'chevron-down' : 'chevron-forward'}
                      size={20}
                      color="#007BFF"
                    />
                  </TouchableOpacity>

                  {expandedTrabajadorId === trabajador.id && (
                    <View style={styles.trabajadorDetails}>
                      <Text style={styles.detailText}>📧 {trabajador.correo}</Text>
                      <Text style={styles.detailText}>📞 {trabajador.telefono}</Text>
                      <Text style={styles.detailText}>🏠 {trabajador.direccion}</Text>
                      <TouchableOpacity
                        style={styles.detailButton}
                        onPress={() => navigation.navigate('TrabajadorDetail', { trabajadorId: trabajador.id })}
                      >
                        
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))
            ) : (


            <Text style={styles.emptyText}>No hay trabajadores en este departamento</Text>
          )}
        </View>
      </View>

      {trabajadores.length > 0 && (
          <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            Este departamento tiene trabajadores y no puede ser eliminado.
          </Text>
        </View>
      )}

      <View style={styles.buttonsContainer}>
        <Button
          title="Volver a la lista"
          onPress={() => navigation.goBack()}
          style={styles.button}
        />
      </View>
    </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 10,
  },
  infoSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  trabajadorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  trabajadorName: {
    fontSize: 16,
    color: '#444',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonsContainer: {
    marginBottom: 30,
  },
  button: {
    marginVertical: 8,
  },
  trabajadorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  trabajadorDetails: {
    backgroundColor: '#eef6fb',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  detailButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },

  warningText: {
  color: '#FF6B6B',
  fontSize: 14,
  marginTop: 8,
  marginBottom: 10,
  textAlign: 'center',
  flexShrink: 1,
},

  
  
});

export default DepartamentoDetailScreen;