import { useEffect, useState } from "react";
import {
  Alert,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useIrrigationData } from "../hooks/useIrrigationData";
import LatestReadingCard from "../components/LatestReadingCard";
import RefreshButton from "../components/RefreshButton";
import {
  getHourlyAveragesFromYesterday,
  getPredictions,
} from "../lib/requestdata";
import PredictionChart from "../components/LinearGraphic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

const Index = () => {
  const { data, loading, fetchData } = useIrrigationData();
  const [predictions, setPredictions] = useState([]);
  const [paramMinH, setParamMinH] = useState(0);
  const [paramMax, setParamMax] = useState(100);

  // ⚠️ Notificación si humedad actual < mínima
  const checkHumidityAlert = async (currentHumidity, min) => {
    if (currentHumidity < min) {
      Alert.alert("⚠️ Alerta", "La humedad no está en condiciones óptimas.");
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🌿 Alerta de humedad",
          body: "La humedad ha bajado del nivel mínimo.",
        },
        trigger: { seconds: 3 },
        android: {
          channelId: "default",
        },
      });
    }
  };

  useEffect(() => {
    const fetchPredictions = async () => {
      const min = parseFloat(await AsyncStorage.getItem("humiMin"));
      const max = parseFloat(await AsyncStorage.getItem("humiMax"));

      setParamMinH(min || 0);
      setParamMax(max || 100);

      if (data && data.length > 0) {
        const currentHumidity = data[0].humity;
        await checkHumidityAlert(currentHumidity, min);
      }

      const averages = await getHourlyAveragesFromYesterday();
      const predicciones = await getPredictions(averages);
      setPredictions(Array.isArray(predicciones) ? predicciones : []);
    };

    fetchPredictions();
  }, [data]);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <>
          <LatestReadingCard reading={data[0]} />
          <Text style={styles.chartTitle}>Gráfico de Humedad Predicha</Text>

          <PredictionChart
            predictions={predictions}
            minValue={paramMinH}
            maxValue={paramMax}
          />

          <RefreshButton onPress={fetchData} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#f4f4f4",
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default Index;
