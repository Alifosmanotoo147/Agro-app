import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, TextInput, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Link, useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const Slidered = () => {
  const [value1a, setValue1a] = useState(0);
  const [value11, setValue11] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState(0);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const router = useRouter();
  const navigation = useNavigation(); // Use useNavigation hook

  useEffect(() => {
    validateInputs();
  }, [value1a, value11, value2]);

  const handleInputChange = (setValue, text) => {
    const newValue = text.replace(/[^0-9]/g, ''); // Allow only numeric input
    if (newValue === '' || Number(newValue) <= 200) {
      setValue(newValue);
    }
  };

  const increment = () => {
    if (value1a < 200) {
      setValue1a(value1a + 1);
    }
  };

  const decrement = () => {
    if (value1a > 0) {
      setValue1a(value1a - 1);
    }
  };

  const increment1 = () => {
    if (value11 < 200) {
      setValue11(value11 + 1);
    }
  };

  const decrement1 = () => {
    if (value11 > 0) {
      setValue11(value11 - 1);
    }
  };

  const increment2 = () => {
    if (value2 < 200) {
      setValue2(value2 + 1);
    }
  };

  const decrement2 = () => {
    if (value2 > 0) {
      setValue2(value2 - 1);
    }
  };

  const validateInputs = () => {
    if (value1a > 0 && value1a <= 200 && value11 > 0 && value11 <= 200 && value2 > 0 && value2 <= 200) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  const handleSubmit = async () => {
    const data = {
      N : value1a,
      P : value11,
      K : value2,
      temperature: value,
      humidity: value1,
    };

    try {
      const queryParams = `?N=${value1a}&P=${value11}&K=${value2}&temperature=${value}&humidity=${value1}`;

      const response = await fetch(`https://agro-crop-prediction.onrender.com/predict${queryParams}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const results = await response.json();
      console.log('Prediction result:', results);
      // Pass the result to the ResultScreen
      navigation.navigate('ResultScreen', {  results });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      Alert.alert('Error', 'Failed to get prediction');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container1}>
      <Image
        style={{
          position: 'absolute',
          right: 5,
          top: -100,
          height: 260,
          width: 150,
        }}
        source={require("./../../assets/images/logo-small.png")}
      />

      <Text style={{
        fontWeight: 700,
        color: "#153B34",
        fontSize: 22,
        position: 'absolute',
        left: 10,
        top: 20,
      }}>Input Analysis</Text>

      <Text style={{
        fontWeight: 300,
        color: "orange",
        fontSize: 15,
        marginTop: 80,
      }}>Input Your Own Values for Prediction</Text>

      <Text style={{
        fontWeight: 600,
        color: "#153B34",
        fontSize: 27,
        marginTop: 5,
      }}>N.P.K</Text>

<View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => decrement(value1a, setValue1a)} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={value1a.toString()}
          onChangeText={(text) => handleInputChange(setValue1a, text)}
        />
        <TouchableOpacity onPress={() => increment(value1a, setValue1a)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => decrement1(value11, setValue11)} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={value11.toString()}
          onChangeText={(text) => handleInputChange(setValue11, text)}
        />
        <TouchableOpacity onPress={() => increment1(value11, setValue11)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => decrement2(value2, setValue2)} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={value2.toString()}
          onChangeText={(text) => handleInputChange(setValue2, text)}
        />
        <TouchableOpacity onPress={() => increment2(value2, setValue2)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      
    </View>
    <Text style={{
        color:'red',
        marginBottom:10,
      }}>**Input should not be more than 200</Text>

      <View style={styles.contentBox}>
        <Slider
          style={{ width: "70%", height: 40 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="orange"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="orange"
          onValueChange={(value) => setValue(value)}
        />
        <Text>Temperature Value in Degree Celsius: {value}</Text>

        <Slider
          style={{ width: "70%", height: 40 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#1fb28a"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#b9e4c9"
          onValueChange={(value1) => setValue1(value1)}
        />
        <Text>Humidity Lvl: {value1}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, !isButtonEnabled && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!isButtonEnabled}
      >
        <Text style={styles.buttonText}>Predict</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBox: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '35%',
    backgroundColor: '#fff',
    borderRadius: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    marginBottom: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    marginHorizontal: 20,
    fontSize: 18,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    opacity: 0.66,
    alignItems: 'center',
    width:'auto',
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: '#1D4C43',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    height: 40,
    justifyContent: 'center',
    margin: 10,
  },
  buttonDisabled: {
    backgroundColor: '#d3d3d3',
    borderColor: '#d3d3d3',
  },
  buttonText: {
    color: '#184B00',
    fontSize: 15,
    fontWeight: 'medium',
  },
  input: {
    width: 80,
    height: 40,
    borderColor: 'white',
    borderWidth: 2,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 5,
    margin:5,
  },
  inputContainer:{
    alignItems:'center',
  },
});

export default Slidered;
