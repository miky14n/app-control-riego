import { useEffect } from 'react';
import { StyleSheet } from "react-native";
import * as Notifications from 'expo-notifications';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout () {

  useEffect(() => {
    const registerNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso de notificaciones no concedido');
      }
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    };

    registerNotifications();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Drawer>
        <Drawer.Screen name="index" options={{ drawerLabel: "Inicio", headerTitle: "🌱 Control de Riego" }} />
        <Drawer.Screen name="history-data" options={{ drawerLabel: "Datos Históricos", headerTitle: "🌱 Datos Históricos" }} />
        <Drawer.Screen name="condition-set" options={{ drawerLabel: "Condiciones", headerTitle: "🌱 Condiciones de cultivo" }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#f4f4f4",
  },
});
