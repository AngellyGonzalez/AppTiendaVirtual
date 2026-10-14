import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DetalleProducto({ route, navigation }) {
  const { nombre, precio, imagen } = route.params || {};

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      {/* Barra superior con botón de retroceso */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Imagen Principal del Producto */}
      <View style={styles.imageContainer}>
        {imagen ? (
          <Image source={{ uri: imagen }} style={styles.imagen} />
        ) : (
          <View style={[styles.imagen, styles.placeholder]}>
            <Ionicons name="image-outline" size={50} color="#ccc" />
          </View>
        )}
      </View>

      {/* Tarjeta de Información Principal */}
      <View style={styles.infoCard}>
        <Text style={styles.nombre}>{nombre || "Producto"}</Text>
        
        <View style={styles.precioContainer}>
          <Text style={styles.etiquetaPrecio}>Precio:</Text>
          <Text style={styles.precio}>${precio || "0.00"}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexGrow: 1,
    backgroundColor: "#F7F7FF",
    paddingBottom: 30,
  },
  headerBar: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === "ios" ? 0.1 : 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: "100%",
    height: 320,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  imagen: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  placeholder: {
    backgroundColor: "#EFEFF0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  infoCard: {
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  nombre: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2D3142",
    marginBottom: 12,
  },
  precioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  etiquetaPrecio: {
    fontSize: 16,
    color: "#8C8FA1",
    marginRight: 8,
  },
  precio: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#7C7CFF",
  },
});