import React from 'react';
import { Image,View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const ResultScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { results } = route.params;

  console.log(results);

  const screenWidth = Dimensions.get('window').width;

  // Chart data configuration
  const data = {
    labels: ['N', 'P', 'K', 'Temperature', 'Humidity'],
    datasets: [
      {
        data: [
          results.N || 0,
          results.P || 0,
          results.K || 0,
          results.temperature || 0,
          results.humidity || 0,
        ],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Bar color
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Image
             style={{
              height:120,
              width:120,
              borderWidth:3,
              borderColor:'#1D4C43',
              borderRadius:75,
              
             }}
              source={require("./../assets/images/logo-small.png")}
            
           />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Prediction: {results.predicted_crop}</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    opacity: 0.66,
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#1D4C43',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    height: 40,
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#184B00',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default ResultScreen;
