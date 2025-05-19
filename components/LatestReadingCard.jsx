import { View, Text, StyleSheet } from "react-native";

const LatestReadingCard = ({ reading }) => {
  if (!reading) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Última Lectura</Text>
      <Text>🌡️ Temperatura: {reading.temperature}°C</Text>
      <Text>💧 Humedad Ambiente: {reading.ambienthumidity}%</Text>
      <Text>💦 Humedad del Suelo: {reading.humity}%</Text>
      <Text>
        📅 Fecha: {reading.creation_ts.replace("T", " ").slice(0, 19)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default LatestReadingCard;
