
import React from 'react';
import { View, Text, Button, StyleSheet, Image,TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';


const Success = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./../../assets/success.png')} style={styles.image} />
      <Text style={styles.title}>Click next to continue.................</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
          <Text style={styles.analyseButtonText}>Next</Text>
        </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 0, height: 4 }, // iOS shadow offset
    shadowOpacity: 0.3, // iOS shadow opacity
    shadowRadius: 4.65, // iOS shadow radius
    opacity:0.66,
    alignItems:'center',
    borderStyle:"solid",
    borderWidth:2,
    borderColor:'#1D4C43',
    backgroundColor: 'white', // Background color for button
    paddingHorizontal: 20, // Horizontal padding
    paddingVertical: 10, // Vertical padding
    borderRadius: 25, // Rounded corners for button
    height: 40,
    justifyContent: 'center',
    alignContent:'center',

  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 24,
  }
})
export default Success