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
import LinearGraphic from "../components/LinearGraphic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { scheduleHumidityAlert, scheduleHumidityAlertsList } from "../lib/notificationsSettings";

const Index = () => {
  const { data, loading, fetchData } = useIrrigationData();
  const [predictions, setPredictions] = useState([]);
  const [paramMinH, setParamMinH] = useState(0);
  const [paramMax, setParamMax] = useState(100);
  const [predictionDate, setPredictionDate] = useState();
  

  const checkHumidityAlert = async (currentHumidity, min) => {
    if (currentHumidity < min) {
      await scheduleHumidityAlert();
      Alert.alert("⚠️ Alerta", "La humedad no está en condiciones óptimas.");
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
      console.log("hola");
    };

    fetchPredictions();
  }, [data]);
  useEffect(() => {
    const loadValue = async () => {
      try {
        const stored = await AsyncStorage.getItem("predict-list");
        if (stored) {
          const predictionsList = JSON.parse(stored);
          setPredictions(predictionsList.predicciones);
          setPredictionDate(predictionsList.date);
        }
      } catch (error) {
        console.log('Error al cargar valor datos predichos:', error);
      }
    };

    loadValue();
  }, []);
  useEffect(() => {
    if (predictions.length > 0) {
      scheduleHumidityAlertsList(predictions, paramMinH);
      console.log("entte");
    }
  }, [predictions,paramMinH]);

  

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <>
          <LatestReadingCard reading={data[0]} />
          <Text style={styles.chartTitle}>Gráfico de Humedad Predicha para: {predictionDate}</Text>

          <LinearGraphic
            predictions={predictions}
            minValue={paramMinH}
            maxValue={paramMax}
            date={predictionDate}
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
