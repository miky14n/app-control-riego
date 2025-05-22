import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getHourlyAveragesFromYesterday,
  getPredictions,
} from "../lib/requestdata";

export default async function saveOrUpdatePredictions  (){
  const stored = await AsyncStorage.getItem("predict-list");
  const fechaHoy = new Date();
  const fechaStr = `${fechaHoy.getFullYear()}-${fechaHoy.getMonth() + 1}-${fechaHoy.getDate()}`;

  const needsUpdate = () => {
    if (!stored) return true;
    try {
      const parsed = JSON.parse(stored);
      return parsed.date !== fechaStr;
    } catch (error) {
      console.log("Error al parsear datos almacenados:", error);
      return true;
    }
  };

  if (needsUpdate()) {
    try {
      const averages = await getHourlyAveragesFromYesterday();
      const predicciones = await getPredictions(averages);

      if (predicciones.length > 0) {
        const predictionsList = {
          date: fechaStr,
          predicciones
        };
        await AsyncStorage.setItem("predict-list", JSON.stringify(predictionsList));
        console.log("Predicciones actualizadas para:", fechaStr);
      }
    } catch (error) {
      console.log("Error al obtener y guardar predicciones:", error);
    }
  } else {
    console.log("Predicciones ya actualizadas para hoy:", fechaStr);
  }
};
