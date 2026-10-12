import React from 'react';
import { NavigationContainer } from "@react-navigation/native"; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import { Ionicons } from "@expo/vector-icons"; 

// Importamos las pantallas actualizadas según la guía
import Catalogo from "../Screens/Catalogo"; 
import AdminProductosScreen from "../Screens/AdminProductosScreen";
import FormularioProductoScreen from "../Screens/FormularioProductoScreen";

const Tab = createBottomTabNavigator(); 
const Stack = createNativeStackNavigator();

// STACK DEL ADMINISTRADOR: Maneja la lista y el formulario (crear/editar)
function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="AdminProductos" 
        component={AdminProductosScreen} 
        options={{ title: "Administrar productos" }} 
      />
      <Stack.Screen 
        name="FormularioProducto" 
        component={FormularioProductoScreen} 
        options={{ title: "Nuevo producto" }} 
      />
    </Stack.Navigator>
  );
}

// NAVEGACIÓN PRINCIPAL (Tabs inferiores + Stack)
export default function Navegacion() { 
  return ( 
    <NavigationContainer> 
      <Tab.Navigator screenOptions={{ headerShown: false }}> 
        {/* Pestaña 1: Catálogo */}
        <Tab.Screen 
          name="CatalogoTab" 
          component={Catalogo} 
          options={{ 
            title: 'Catálogo', 
            tabBarIcon: ({ color, size }) => ( 
              <Ionicons name="storefront-outline" size={size} color={color} /> 
            ), 
          }} 
        /> 

        {/* Pestaña 2: Administración (Stack) */}
        <Tab.Screen 
          name="AdminTab" 
          component={AdminStack} 
          options={{ 
            title: 'Admin Productos', 
            tabBarIcon: ({ color, size }) => ( 
              <Ionicons name="flask-outline" size={size} color={color} /> 
            ), 
          }} 
        />
      </Tab.Navigator> 
    </NavigationContainer> 
  ); 
}