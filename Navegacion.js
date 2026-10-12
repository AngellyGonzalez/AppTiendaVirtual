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


function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="VistaAdmin" 
        component={VistaAdmin} 
        options={{ title: "Administrar productos" }} 
      />
      <Stack.Screen 
        name="nuevoProducto" 
        component={NuevoProducto} 
        options={{ title: "Nuevo producto" }} 
      />
    </Stack.Navigator>
  );
}


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