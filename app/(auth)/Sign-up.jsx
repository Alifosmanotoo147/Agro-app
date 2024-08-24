import React, { useState } from 'react';
import {Image, View, TextInput, StyleSheet, CheckBox, Text, TouchableOpacity, Alert } from 'react-native';
import { Link, router } from 'expo-router';




const SignUpScreen = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatpassword, Setrepeatedpassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading , setLoading] =useState(false);

  const handleSignup = async () => {
    if (fullName && phoneNumber && email && password) {
      
      setLoading(true); // Start loading

      try {
        const response = await fetch('http://localhost:3001/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            role: "User",
            name: fullName,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            repeatPassword:repeatpassword,
          }),
        });

        const data = await response.json();
        setLoading(false); // Stop loading
        console.log(data);

        if (response.ok) {
          Alert.alert('Signup Successful', `Welcome, ${fullName}!`);
          router.push('/success');
        } else {
          Alert.alert('Signup Failed', data.message || 'An error occurred.');
        }
      } catch (error) {
        setLoading(false); // Stop loading in case of an error
        Alert.alert('Signup Failed', 'An error occurred. Please try again.');
      }
    } else {
      Alert.alert('Signup Failed', 'Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
       <Image
             style={{
              position:'absolute',
              right:5,
              top:-105,
              height:260,
              width:150,
             }}
              source={require("./../../assets/images/logo-small.png")}
            
           />
      <Text className="text-4xl text-green-900">Sign-Up</Text>
      <View style={styles.contentBox}>

      <TextInput
      className="text-lg font-pregular"
        style={styles.input}
        placeholder="Full name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
      className="text-lg font-pregular"
        style={styles.input}
        placeholder="Phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
      className="text-lg font-pregular"
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
      className="text-lg font-pregular"
      style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={repeatpassword}
        onChangeText={Setrepeatedpassword}
      />
     
      
      <View className="justify-center pt-5 flex-row gap-2">
        <Text className="text-lg text-black font-pregular">
          I already have an account?
        </Text>
        <Link href="./Log-in" className="items-center justify-center text-lg font-psemibold text-green-500">Login</Link>
      </View>
      </View>

      
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign-Up</Text>
      </TouchableOpacity>
         
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentBox: {
    marginTop:3,
    alignItems:'center',
    justifyContent:'center',
    width: '100%', // Adjust width as needed
    height: '65%', // Adjust height as needed
    backgroundColor: '#fff', // Placeholder background color
    borderRadius: 25, // Rounded corners
    // Add shadow styling for both iOS and Android
    elevation: 10, // Android shadow
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 0, height: 4 }, // iOS shadow offset
    shadowOpacity: 0.3, // iOS shadow opacity
    shadowRadius: 4.65, // iOS shadow radius
    marginBottom: 20, // Space below box
  },


  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
    marginLeft:15,
  },
  
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop:6,
    },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: '#6B8E23',
  },
  label: {
    margin: 8,
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
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#184B00',
    fontSize: 15,
    fontWeight: 'medium',
  },
});

export default SignUpScreen;
