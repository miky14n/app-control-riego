import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons'; 

const InputSaver = ({ nameKey, placeholder,keyBtype="default" }) => {
  const [param, setParam] = useState('');
  const [existingValue, setExistingValue] = useState(null);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const stored = await AsyncStorage.getItem(nameKey);
        if (stored !== null) {
          setParam(stored);
          setExistingValue(stored);
        }
      } catch (error) {
        console.log('Error al cargar valor:', error);
      }
    };

    loadValue();
  }, [nameKey]);

  const validateInput = (text) => {
    const regex = /^\d{0,3}(\.\d{0,2})?$/;
    if (text === '' || regex.test(text)) {
      setParam(text);
    }
  };

  const saveOrUpdate = async () => {
    try {
      await AsyncStorage.setItem(nameKey, param);
      setExistingValue(param);
      Alert.alert('Éxito', existingValue ? 'Actualizado correctamente' : 'Guardado correctamente');
    } catch (error) {
      console.log('Error al guardar/actualizar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={param}
        onChangeText={keyBtype === "default" ? setParam : validateInput}
        keyboardType={keyBtype}
      />

      <TouchableOpacity onPress={saveOrUpdate} style={styles.iconButton}>
        <MaterialIcons
          name={existingValue ? 'update' : 'save'}
          size={24}
          color="#ffffff"
        />
      </TouchableOpacity>
    </View>
  );
};

export default InputSaver;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  iconButton: {
    marginLeft: 8,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
  },
});
