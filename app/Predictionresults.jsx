import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const PredictionScreen = () => {
  const [crop, setCrop] = useState('');
  const [mpkValues, setMpkValues] = useState(null);

  const handlePredict = () => {
    // Here, integrate your machine learning model to get the MPK values
    // For demo purposes, we'll use dummy data
    const dummyMpkValues = { nitrogen: 100, phosphorus: 50, potassium: 75 };
    setMpkValues(dummyMpkValues);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter crop name"
        value={crop}
        onChangeText={setCrop}
      />
      <Button title="Predict MPK" onPress={handlePredict} />
      {mpkValues && (
        <View style={styles.result}>
          <Text>Nitrogen: {mpkValues.nitrogen}</Text>
          <Text>Phosphorus: {mpkValues.phosphorus}</Text>
          <Text>Potassium: {mpkValues.potassium}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  result: {
    marginTop: 20,
  },
});

export default PredictionScreen;
