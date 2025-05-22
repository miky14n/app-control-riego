import * as Notifications from 'expo-notifications';
import { Platform } from "react-native";
export async function configure() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permiso de notificaciones no concedido");
        return;
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#007AFF",
        });
      }

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowBanner: true, 
          shouldShowList: true, 
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
}
export async function scheduleHumidityAlert() {
  console.log("Programando notificación...");
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🌿 Alerta de humedad",
        body: "La humedad ha bajado del nivel mínimo.",
        sound: true,
      },
      trigger: { seconds: 1 },
    });
    console.log("Notificación programada");
  } catch (error) {
    console.error("Error programando notificación:", error);
  }
}
export async function scheduleHumidityAlertsList(predicciones,minHumidity=0) {

  for (const pred of predicciones) {
    try {
      if (pred.humedad_predicha < minHumidity) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "🌿 Alerta de humedad",
            body: `La humedad a las ${pred.hour}:00 será baja (${pred.humedad_predicha}%).`,
            sound: true,
          },
          trigger: {
            hour: pred.hour,
            minute: 0,
            repeats: false, 
          },
        });
        console.log("Notificación programada para", pred.hour);
      } 
    }
    catch (error) {
      console.error("Error programando notificación:", error);
    }
  }
};
