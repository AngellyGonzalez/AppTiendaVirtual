import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { db } from '../firebase/config'; 
import { collection, addDoc } from 'firebase/firestore';

export default function NuevoProducto({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');

  const guardarProducto = async () => {
    if (!nombre || !precio || !categoria || !imagenUrl) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    
    try {
   await addDoc(collection(db, "Productos"), {
  nombre: nombre,
  precio: precio.replace('$', '').trim(), 
  categoria: categoria,
  imagenUrl: imagenUrl,
});

      Alert.alert('Éxito', 'Producto agregado correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error("Error al guardar: ", error);
      Alert.alert('Error', 'No se pudo guardar el producto.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nombre del Producto</Text>
      <TextInput style={styles.input} placeholder="Ej. Smartwatch" value={nombre} onChangeText={setNombre} />

      <Text style={styles.label}>Precio</Text>
      <TextInput style={styles.input} placeholder="Ej. 120" keyboardType="numeric" value={precio} onChangeText={setPrecio} />

      <Text style={styles.label}>Categoría</Text>
      <TextInput style={styles.input} placeholder="Ej. Electrónica" value={categoria} onChangeText={setCategoria} />

      <Text style={styles.label}>URL de la Imagen</Text>
      <TextInput style={styles.input} placeholder="https://..." value={imagenUrl} onChangeText={setImagenUrl} autoCapitalize="none" />

      <TouchableOpacity style={styles.botonGuardar} onPress={guardarProducto}>
        <Text style={styles.textoBoton}>Guardar Producto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, fontSize: 16, marginBottom: 16, backgroundColor: '#fafafa' },
  botonGuardar: { backgroundColor: '#00b894', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10, marginBottom: 30 },
  textoBoton: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});