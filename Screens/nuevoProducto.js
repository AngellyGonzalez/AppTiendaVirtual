import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { db } from '../firebase/config'; 
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

export default function FormularioProductoScreen({ route, navigation }) {
 
  const productoEditando = route.params?.producto;

  const [id, setId] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [color, setColor] = useState('');
  const [imagen, setImagen] = useState('');
  const [tiempo, setTiempo] = useState('');

  useEffect(() => {
    if (productoEditando) {
      
      setId(productoEditando.id ? productoEditando.id.toString() : '');
      setCategoriaId(productoEditando.categoriaId ? productoEditando.categoriaId.toString() : '');
      setNombre(productoEditando.nombre || '');
      setPrecio(productoEditando.precio ? productoEditando.precio.toString() : '');
      setColor(productoEditando.color || '');
      setImagen(productoEditando.imagenUrl || productoEditando.imagen || '');
      setTiempo(productoEditando.tiempo || '');
    }
  }, [productoEditando]);

  const guardarOActualizarProducto = async () => {
   
    if (!nombre || !precio || !categoriaId) {
      Alert.alert('Error', 'Por favor completa al menos Nombre, Precio e ID de Categoría');
      return;
    }
    
    try {
      
      const datosProducto = {
        id: Number(id) || 0,
        categoriaId: Number(categoriaId) || 0,
        nombre: nombre,
        precio: Number(precio) || 0,
        color: color,
        imagen: imagen,
        tiempo: tiempo || 'Nuevo',
      };

      if (productoEditando) {
       
        const docRef = doc(db, 'Productos', productoEditando.idDoc);
        await updateDoc(docRef, datosProducto);
        Alert.alert('Éxito', 'Producto actualizado correctamente', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
       
        await addDoc(collection(db, 'Productos'), datosProducto);
        Alert.alert('Éxito', 'Producto agregado correctamente', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      console.error("Error al guardar: ", error);
      Alert.alert('Error', 'No se pudo guardar el producto.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>ID</Text>
      <TextInput style={styles.input} placeholder="Ej. 3" keyboardType="numeric" value={id} onChangeText={setId} />

      <Text style={styles.label}>ID Categoría</Text>
      <TextInput style={styles.input} placeholder="Ej. 1" keyboardType="numeric" value={categoriaId} onChangeText={setCategoriaId} />

      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} placeholder="Nombre del producto" value={nombre} onChangeText={setNombre} />

      <Text style={styles.label}>Precio</Text>
      <TextInput style={styles.input} placeholder="Ej. 27" keyboardType="numeric" value={precio} onChangeText={setPrecio} />

      <Text style={styles.label}>Color</Text>
      <TextInput style={styles.input} placeholder="Ej. #F5AFC1" value={color} onChangeText={setColor} />

      <Text style={styles.label}>Imagen</Text>
      <TextInput style={styles.input} placeholder="URL de la imagen" value={imagen} onChangeText={setImagen} autoCapitalize="none" />

      <Text style={styles.label}>Tiempo</Text>
      <TextInput style={styles.input} placeholder="Ej. 10 hours ago" value={tiempo} onChangeText={setTiempo} />

      <TouchableOpacity style={styles.botonGuardar} onPress={guardarOActualizarProducto}>
        <Text style={styles.textoBoton}>
          {productoEditando ? 'ACTUALIZAR PRODUCTO' : 'GUARDAR PRODUCTO'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  label: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 4 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 10, 
    borderRadius: 8, 
    fontSize: 15, 
    marginBottom: 12, 
    backgroundColor: '#fafafa' 
  },
  botonGuardar: { 
    backgroundColor: '#2196F3', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 10, 
    marginBottom: 40 
  },
  textoBoton: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});