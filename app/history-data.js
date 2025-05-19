import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { useIrrigationData } from "../hooks/useIrrigationData";
import ReadingList from "../components/ReadingList";
export default function HistoryData(){
const { data, loading, fetchData } = useIrrigationData();

    return (<View style={styles.container}>
        <ReadingList data={data} />
        </View>)
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
    chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

});