
import React, { useState } from 'react';
import {Image, View, Text, TextInput, TouchableOpacity, StyleSheet,Alert, } from 'react-native';
import { Link } from 'expo-router';
import {  router } from 'expo-router';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading , setLoading] =useState(false);

  const handleLogin = async () => {
    if (email && password) {
      setLoading(true); // Start loading
      try {
        const body = {
          role: "User",
          email: email,
          password: password
        };

        const response = await fetch('http://localhost:3001/auth/login', { // Replace with your local IP
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
   
        const data = await response.json();
        console.log(data);

        setLoading(false); // Stop loading

        if (data.token) {
          Alert.alert('Login Successful',`Welcome, ${data.name}!` );
          router.push('/success');
        } else {
          Alert.alert('Login Failed', data.message || 'Invalid email or username or password');
        }
      } catch (error) {
        console.error('Network error:', error);
        setLoading(false); // Stop loading in case of an error
        Alert.alert('Login Failed', 'An error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      
      <Image
             style={{
              position:'absolute',
              right:5,
              top:-65,
              height:260,
              width:150,
             }}
              source={require("./../../assets//images/logo-small.png")}
            
           />
     
      <Text className="text-4xl text-green-900">Log-in</Text>
      <View style={styles.contentBox}>

      <TextInput
      className="text-lg text-black font-pregular"
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
      className="text-lg text-black font-pregular"
        style={styles.input}
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
     
      <View className="justify-center pt-5 flex-row gap-2">
        <Text className="text-lg text-black font-pregular">
          Don't have an account?
        </Text>
        <Link href="./Sign-up"  className="items-center justify-center text-lg font-psemibold text-green-500">Signup</Link>
      </View>
      </View>

    
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log-in</Text>       
      </TouchableOpacity> 
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  title: {
    color:'#458925',
    fontSize: 34,
    fontWeight: '400',
    marginBottom: 30,
  },
  contentBox: {
    marginTop:30,
    alignItems:'center',
    justifyContent:'center',
    width: '90%', // Adjust width as needed
    height: '50%', // Adjust height as needed
    backgroundColor: '#fff', // Placeholder background color
    borderRadius: 25, // Rounded corners
    // Add shadow styling for both iOS and Android
    elevation: 10, // Android shadow
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 0, height: 4 }, // iOS shadow offset
    shadowOpacity: 0.3, // iOS shadow opacity
    shadowRadius: 4.65, // iOS shadow radius
    marginBottom: 40, // Space below box
  },
  input: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    borderColor: '#D3D3D3',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    borderRadius:5,
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: '#6B8E23',
  },
  
  button: {
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 0, height: 4 }, // iOS shadow offset
    shadowOpacity: 0.3, // iOS shadow opacity
    shadowRadius: 4.65, // iOS shadow radius
    opacity:0.66,
    alignItems:'center',
    width:177,
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
    marginTop: 10,
  },
  buttonText: {
    color: '#184B00',
    fontSize: 15,
    fontWeight: 'medium',
  },
});

export default LoginScreen;