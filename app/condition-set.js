import { useState } from 'react';
import { View, Text ,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputSaver from '../components/InputSaver';

export default function SaveScrren(){
  const [param, setParam] = useState('');

  const saveParam = async () => {
    try {
      await AsyncStorage.setItem('myParam', param);
      alert('Guardado correctamente');
    } catch (error) {
      console.log('Error al guardar:', error);
    }
  };

  return (
    <View>
       <Text style={styles.title}>Ingrese la temperatura maxima</Text>
       <InputSaver nameKey="tempMax" placeholder="Temp. máxima" />
       <Text style={styles.title}>Ingrese el % de humedad minima</Text>
       <InputSaver nameKey="humiMin" placeholder="Humedad minima" />
       <Text style={styles.title}>Ingrese el % de humedad maxima</Text>
       <InputSaver nameKey="humiMax" placeholder="Humedad maxima" />

    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  }

});