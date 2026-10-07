import React from 'react';
import { NavigationContainer } from "@react-navigation/native"; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import { Ionicons } from "@expo/vector-icons"; 


import Catalogo from "./Screens/Catalogo"; 
import VistaAdmin from "./Screens/VistaAdmin";
import NuevoProducto from "./Screens/nuevoProducto";

const Tab = createBottomTabNavigator(); 
const Stack = createNativeStackNavigator();

// STACK DEL ADMINISTRADOR: 
function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="VistaAdmin" 
        component={VistaAdmin} 
        options={{ title: "Lista de Productos (Admin)" }} 
      />
      <Stack.Screen 
        name="nuevoProducto" 
        component={NuevoProducto} 
        options={{ title: "Agregar Nuevo Producto" }} 
      />
    </Stack.Navigator>
  );
}

// (Catálogo y Administrador)
export default function App() { 
  return ( 
    <NavigationContainer> 
      <Tab.Navigator screenOptions={{ headerShown: false }}> 
        {/* Pestaña 1: Catálogo */}
        <Tab.Screen 
          name="CatálogoTab" 
          component={Catalogo} 
          options={{ 
            title: 'Catálogo', 
            tabBarIcon: ({ color, size }) => ( 
              <Ionicons name="storefront-outline" size={size} color={color} /> 
            ), 
          }} 
        /> 

        // agregar productos 
        <Tab.Screen 
          name="AdminTab" 
          component={AdminStack} 
          options={{ 
            title: 'Administración', 
            tabBarIcon: ({ color, size }) => ( 
              <Ionicons name="settings-outline" size={size} color={color} /> 
            ), 
          }} 
        />
      </Tab.Navigator> 
    </NavigationContainer> 
  ); 
}