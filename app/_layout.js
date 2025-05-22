import { useEffect } from 'react';
import { StyleSheet } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {configure} from '../lib/notificationsSettings';
import saveOrUpdatePredictions from '../lib/predictions';

export default function Layout () {

  useEffect(() => {
    configure();
    saveOrUpdatePredictions();
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
