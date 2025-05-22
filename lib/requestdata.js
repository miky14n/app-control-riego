import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://api-riego.vercel.app/api";

export async function getAllData() {
  try {
    const response = await fetch(API_URL+"/farm?filter=dsc");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
  }
}
export async function getYesterdayData() {
  try {
    const response = await fetch(`${API_URL}/farm/yesterday-values`);
    if (!response.ok) throw new Error("Error de respuesta HTTP");

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
  }
}
export async function getPredictions(data) {
  try {
    const body = {
      temperature: data.map((item) => item.temperature),
      ambienthumidity: data.map((item) => item.ambienthumidity),
      hour: data.map((item) => item.hour),
    };
    const MODEL_URL = await AsyncStorage.getItem("URL-Model");
    console.log(MODEL_URL);
    if (!MODEL_URL) {
      console.warn("Respuesta no válida o servidor caído");
      return [];
    }
    const response = await fetch(MODEL_URL+"predecir", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get("content-type");
    if (!response.ok || !contentType || !contentType.includes("application/json") || !MODEL_URL) {
      console.warn("Respuesta no válida o ngrok caído");
      return [];
    }

    const result = await response.json();
    return result["resultados"] || [];
  } catch (error) {
    console.error("Error al obtener datos de la predicción:", error);
    return [];
  }
}


export async function getHourlyAveragesFromYesterday() {
  try {
    const yesterdayData = await getYesterdayData();
    if (!Array.isArray(yesterdayData)) return [];

    const hourlyGroups = {};

    yesterdayData.forEach((item) => {
      // Usamos getUTCHours porque la API ya entregó la fecha "localizada"
      const hour = new Date(item.creation_ts).getUTCHours();

      if (!hourlyGroups[hour]) {
        hourlyGroups[hour] = {
          temperatureSum: 0,
          humiditySum: 0,
          count: 0,
        };
      }

      hourlyGroups[hour].temperatureSum += Number(item.temperature);
      hourlyGroups[hour].humiditySum += Number(item.ambienthumidity);
      hourlyGroups[hour].count += 1;
    });

    return Object.entries(hourlyGroups).map(([hour, values]) => ({
      hour: Number(hour),
      temperature: values.temperatureSum / values.count,
      ambienthumidity: values.humiditySum / values.count,
    }));
  } catch (err) {
    console.error("Error al calcular promedios:", err);
    return [];
  }
}

