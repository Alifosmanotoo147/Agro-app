import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const Alternate = () => {
  const [crop, setCrop] = useState('');
  const [nValues, setNValues] = useState(null);
  const [pValues, setPValues] = useState(null);
  const [kValues, setKValues] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [loading, setLoading] = useState(false);     

  const handlePredict = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://agro-value-prediction.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ crop_name: crop }), // Send crop as payload
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      // Assuming your data structure from ML model is like this
      const { N, P, K, temperature, humidity } = data;

      setNValues(N !== undefined ? N : null);
      setPValues(P !== undefined ? P : null);
      setKValues(K !== undefined ? K : null);
      setTemperature(temperature !== undefined ? temperature : null);
      setHumidity(humidity !== undefined ? humidity : null);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state
    } finally {
      setLoading(false);
    }
  };

  const renderProgressBar = (label, value, color) => (
    <View style={styles.resultItem}>
      <Text style={styles.resultText}>{label}: {value !== null ? value : 'N/A'}</Text>
      {value !== null && (
        <Progress.Bar
          progress={value / 100}
          width={null}
          height={20}
          color={color}
          unfilledColor="#D3D3D3"
          borderWidth={0}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        style={{
          position: 'absolute',
          right: 0,
          top: -100,
          height: 260,
          width: 150,
        }}
        source={require("./../../assets/images/logo-small.png")}
      />
      <Text style={styles.title}>Alternate Crop Prediction</Text>
      <Text style={styles.subtitle}>Search your Preferred crop for Analysis</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={crop}
          onChangeText={setCrop}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handlePredict}
          disabled={loading}
        >
          <Text style={styles.analyseButtonText}>{loading ? 'Analyzing...' : 'Analyse'}</Text>
        </TouchableOpacity>
      </View>

      {(nValues !== null || pValues !== null || kValues !== null || temperature !== null || humidity !== null) && (
        <View style={styles.result}>
          {renderProgressBar('Nitrogen', nValues, '#4CAF50')}
          {renderProgressBar('Phosphorus', pValues, '#2196F3')}
          {renderProgressBar('Potassium', kValues, '#FF9800')}
          {renderProgressBar('Temperature', temperature, '#F44336')}
          {renderProgressBar('Soil moisture', humidity, '#00BCD4')}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontWeight: '700',
    color: "#153B34",
    fontSize: 22,
    position: 'absolute',
    left: 5,
    top: 70,
  },
  subtitle: {
    fontWeight: '300',
    color: "orange",
    fontSize: 15,
    marginTop: 100,
    marginLeft: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    marginTop: 40,
    marginRight: 15,
  },
  searchInput: {
    flex: 1,
    borderColor: '#1D4C43',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    opacity: 0.66,
  },
  button: {
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 0, height: 4 }, // iOS shadow offset
    shadowOpacity: 0.3, // iOS shadow opacity
    shadowRadius: 4.65, // iOS shadow radius
    opacity: 0.66,
    alignItems: 'center',
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: '#1D4C43',
    backgroundColor: 'white', // Background color for button
    paddingHorizontal: 20, // Horizontal padding
    paddingVertical: 10, // Vertical padding
    borderRadius: 25, // Rounded corners for button
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
  },
  analyseButtonText: {
    color: 'green',
    fontSize: 14,
  },
  result: {
    margin: 15,
  },
  resultText: {
    marginVertical: 5,
    fontSize: 16,
  },
  resultItem: {
    marginBottom: 10,
  },
});

export default Alternate;
