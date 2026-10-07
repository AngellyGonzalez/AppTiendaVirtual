import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

export default function VistaAdmin({ navigation }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Productos'), (snapshot) => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProductos(lista);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.botonAgregar}
        onPress={() => navigation.navigate('nuevoProducto')}
      >
        <Text style={styles.textoBotonAgregar}>+ Agregar Nuevo Producto</Text>
      </TouchableOpacity>

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.precio}>{item.precio}</Text>
            </View>
            <View style={styles.accionesContainer}>
              <TouchableOpacity style={styles.btnEditar}>
                <Text style={styles.textBtn}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnEliminar}>
                <Text style={styles.textBtn}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f4f4f4' },
  botonAgregar: { backgroundColor: '#6c5ce7', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  textoBotonAgregar: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, elevation: 1 },
  nombre: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  precio: { color: '#666', marginTop: 4 },
  accionesContainer: { flexDirection: 'row', gap: 8 },
  btnEditar: { backgroundColor: '#0984e3', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 5 },
  btnEliminar: { backgroundColor: '#d63031', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 5 },
  textBtn: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});