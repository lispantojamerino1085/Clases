// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import TrabajadoresScreen from '../screens/trabajadores/TrabajadoresScreen';
import TrabajadorDetailScreen from '../screens/trabajadores/TrabajadorDetailScreen';
import TrabajadorFormScreen from '../screens/trabajadores/TrabajadorFormScreen';
import DepartamentosScreen from '../screens/departamentos/DepartamentosScreen';
import DepartamentoDetailScreen from '../screens/departamentos/DepartamentoDetailScreen';
import DepartamentoFormScreen from '../screens/departamentos/DepartamentoFormScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen 
      name="Register" 
      component={RegisterScreen} 
      options={{ headerShown: true, title: 'Registro' }}
    />
  </Stack.Navigator>
);

const TrabajadoresStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="TrabajadoresList" 
      component={TrabajadoresScreen} 
      options={{ title: 'Trabajadores', headerTitleAlign: 'center' }}
    />
    <Stack.Screen 
      name="TrabajadorDetail" 
      component={TrabajadorDetailScreen} 
      options={{ title: 'Detalle de Trabajador' }}
    />
    <Stack.Screen 
      name="TrabajadorForm" 
      component={TrabajadorFormScreen} 
      options={({ route }) => ({ 
        title: route.params?.trabajador ? 'Editar Trabajador' : 'Nuevo Trabajador' 
      })}
    />
  </Stack.Navigator>
);

const DepartamentosStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="DepartamentosList" 
      component={DepartamentosScreen} 
      options={{ title: 'Departamentos', headerTitleAlign: 'center' }}
    />
    <Stack.Screen 
      name="DepartamentoDetail" 
      component={DepartamentoDetailScreen} 
      options={{ title: 'Detalle de Departamento' }}
    />
    <Stack.Screen 
      name="DepartamentoForm" 
      component={DepartamentoFormScreen} 
      options={({ route }) => ({ 
        title: route.params?.departamento ? 'Editar Departamento' : 'Nuevo Departamento' 
      })}
    />
  </Stack.Navigator>
);

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = route.name === 'TrabajadoresTab' ? 'people' : 'business';
        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007BFF',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen name="TrabajadoresTab" component={TrabajadoresStack} options={{ tabBarLabel: 'Trabajadores' }} />
    <Tab.Screen name="DepartamentosTab" component={DepartamentosStack} options={{ tabBarLabel: 'Departamentos' }} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <AppTabs /> : <AuthStack />;
};

export default AppNavigator;
