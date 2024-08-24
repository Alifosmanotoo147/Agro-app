import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
  const [predictionResult, setPredictionResult] = useState(null);
  const serverUrl = 'http://localhost:3001/predict'; // Replace with your IP address

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(serverUrl);
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error.message); // Log full error message
      }
    };

    const intervalId = setInterval(fetchData, 10000); // Fetch data every second

    return () => clearInterval(intervalId); 
  }, []);

  const handleBestSuitedCropPress = async () => {
    const data = {
      N: lastData.N,
      P: lastData.P,
      K: lastData.K,
      temperature: lastData.temperature,
      humidity: lastData.humidity,
    };

    try {
      const queryParams = `?N=${lastData.N}&P=${lastData.P}&K=${lastData.K}&temperature=${lastData.temperature}&humidity=${lastData.humidity}`;
      const response = await fetch(`https://agro-crop-prediction.onrender.com/predict${queryParams}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Prediction result:', result);
      setPredictionResult(result); // Update state with the prediction result
    } catch (error) {
      console.error('Error sending data to ML model:', error.message); // Log full error message
    }
  };

  // Get the last element from the data array
  const lastData = data.length > 0 ? data[data.length - 1] : {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.logo} source={require('./../../assets/images/logo-small.png')} />
      <Text style={styles.title}>Overview</Text>
      <Text style={styles.subtitle}>Live Sensor Values</Text>

      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: ['N', 'P', 'K', 'Temp', 'Hum', 'Moist'],
            datasets: [
              {
                data: [
                  lastData.N,
                  lastData.P,
                  lastData.K,
                  lastData.temperature,
                  lastData.humidity,
                  lastData.soilMoisture,
                ].filter(value => value !== undefined), // Filter out undefined values
              },
            ],
          }}
          width={650}
          height={400}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={styles.lineChart}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleBestSuitedCropPress}>
        <Text style={styles.buttonText}>Best Suited Crop</Text>
      </TouchableOpacity>

      {predictionResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Prediction Results</Text>
          <Text style={styles.resultText}>Crop: {predictionResult.predicted_crop}</Text>
          <Text style={styles.resultText}>Confidence: 92.73%</Text>
          {/* Add more fields as needed */}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 50,
  },
  logo: {
    height: 260,
    width: 150,
  },
  title: {
    fontWeight: '700',
    color: '#153B34',
    fontSize: 22,
  },
  subtitle: {
    fontWeight: '300',
    color: 'orange',
    fontSize: 15,
    marginTop: 30,
  },
  chartContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  lineChart: {
    borderRadius: 16,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#1D4C43',
    borderRadius: 25,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
  resultContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Home;