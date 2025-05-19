import React from 'react';
import { ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const PredictionChart = ({ predictions,minValue,maxValue }) => {
  const screenWidth = Dimensions.get('window').width;
  const hasData = Array.isArray(predictions) && predictions.length > 0;

  const labels = hasData
    ? predictions.map((item) => item.hour.toString())
    : [''];

  const predData = hasData
    ? predictions.map((item) => item.humedad_predicha)
    : [0];

  const minLineData = new Array(labels.length).fill(minValue ?? 0);
  const maxLineData = new Array(labels.length).fill(maxValue ?? 0);
  const chartData = {
    labels,
    datasets: [
      {
        data: predData,
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // azul
        strokeWidth: 2,
      },
      {
        data: minLineData,
        color: () => `rgba(255, 0, 0, 1)`, 
        strokeWidth: 2,
      },
      {
        data: maxLineData,
        color: () => `rgb(0, 252, 42)`, 
        strokeWidth: 2,
      },
    ],
    legend: hasData ? ['Predicción', 'Humedad Mínima', 'Humedad Maxima'] : ['Humedad Mínima'],
  };

  return (
    <ScrollView horizontal >
      {!hasData && (
        <Text style={styles.message}>No hay datos disponibles</Text>
      )}
      <LineChart
        data={chartData}
        width={1000}
        height={220}
        yAxisSuffix="%"
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#f4f4f4",
          backgroundGradientTo: "#f4f4f4",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#007AFF",
          },
        }}
         bezier
        style={{
            marginVertical: 10,
            borderRadius: 16,
        }}
      />
    </ScrollView>
  );
};

export default PredictionChart;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
});
