import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import {  router } from 'expo-router';


const App = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/grow.jpg')}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.signUpButton} onPress={() => router.push('/Sign-up')}>
            <Text style={styles.signUpButtonText}>Sign-up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/Log-in')}>
            <Text style={styles.loginButtonText}>Already have an account.</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    opacity:0.9,
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonsContainer: {
    alignItems:"center",
    opacity:0.8,
    justifyContent:'flex-end',
    height:210,
    backgroundColor: 'yellow',
    padding: 20,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
  },
  signUpButton: {
    backgroundColor: '#0A310E',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    width:126,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 17,
  },
  loginButton: {
    alignItems: 'center',
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 0, height: 4 }, // iOS shadow offset
    shadowOpacity: 0.3, // iOS shadow opacity
    shadowRadius: 4.65, // iOS shadow radius
    alignContent:'center',
    width:235,
    borderStyle:"solid",
    borderWidth:2,
    borderColor:'#0A310E',
    paddingHorizontal: 20, // Horizontal padding
    paddingVertical: 13, // Vertical padding
    borderRadius: 15, // Rounded corners for button
  },
  loginButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default App;
