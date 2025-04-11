// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

// Importar pantallas
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

// Stack para autenticación
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

// Stack para trabajadores
const TrabajadoresStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="TrabajadoresList" 
      component={TrabajadoresScreen} 
      options={{ 
        title: 'Trabajadores',
        headerTitleAlign: 'center',
      }}
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

// Stack para departamentos
const DepartamentosStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="DepartamentosList" 
      component={DepartamentosScreen} 
      options={{ 
        title: 'Departamentos',
        headerTitleAlign: 'center',
      }}
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

// Tab Navigator para la aplicación principal
const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'TrabajadoresTab') {
          iconName = 'people';
        } else if (route.name === 'DepartamentosTab') {
          iconName = 'business';
        }
        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007BFF',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen 
      name="TrabajadoresTab" 
      component={TrabajadoresStack} 
      options={{ tabBarLabel: 'Trabajadores' }}
    />
    <Tab.Screen 
      name="DepartamentosTab" 
      component={DepartamentosStack} 
      options={{ tabBarLabel: 'Departamentos' }}
    />
  </Tab.Navigator>
);

// Navegador principal
const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Puedes mostrar un componente de carga aquí
  }

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator; 
