import { View, FlatList, Text, StyleSheet } from "react-native";

const ReadingList = ({ data }) => (
  <View style={styles.container}>
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text>🌡️ Temperatura: {item.temperature}°C</Text>
          <Text>💧 Humedad Ambiente: {item.ambienthumidity}%</Text>
          <Text>💦 Humedad del Suelo: {item.humity}%</Text>
          <Text>
            📅 Fecha: {item.creation_ts.replace("T", " ").slice(0, 19)}
          </Text>
        </View>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    maxHeight: 1000,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default ReadingList;
