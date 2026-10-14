import React from "react";
import {
View,
Text,
TouchableOpacity,
StyleSheet,
Alert,
} from "react-native";
export default function OtraScreenAdmin({ navigation }) {
const cerrarSesion = () => {
Alert.alert(
"Cerrar sesión",
"¿Deseas salir de tu cuenta?",
[
{
text: "Cancelar",
style: "cancel",
},
{
text: "Cerrar sesión",
style: "destructive",
onPress: () => {
navigation.getParent()?.reset({
index: 0,
routes: [{ name: "Login" }],
});
},
},
]
);
};

return (
<View style={styles.contenedor}>
<Text style={styles.titulo}>Panel del administrador</Text>
<TouchableOpacity style={styles.boton} onPress={cerrarSesion}>
<Text style={styles.textoBoton}>Cerrar sesión</Text>
</TouchableOpacity>
</View>
);
}
const styles = StyleSheet.create({
contenedor: {
flex: 1,
justifyContent: "center",
alignItems: "center",
padding: 20,
backgroundColor: "#f7f7ff",
},
titulo: {
fontSize: 22,
fontWeight: "bold",
marginBottom: 25,
},
boton: {
backgroundColor: "#7C7CFF",
paddingVertical: 14,
paddingHorizontal: 25,
borderRadius: 10,
},
textoBoton: {
color: "#FFFFFF",
fontWeight: "bold",
},
});