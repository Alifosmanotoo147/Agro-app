// ProfilePage.js
import {GesturehandlerRootView} from 'react-native-gesture-handler'
import {  router } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, StyleSheet,Image, TouchableOpacity } from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';


const ProfilePage = () => {
  return (
  

  <View style={styles.container}>
         <Text style={{
            fontWeight:700,
            color:"#153B34",
            fontSize:27,
            // position:'absolute',
            left:0,

           }}>Profile</Text>

         


    <View
    style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    }}>


     <Image
             style={{
              height:120,
              width:120,
              borderWidth:3,
              borderColor:'#1D4C43',
              borderRadius:75,
              
             }}
              source={require("./../../assets/images/logo-small.png")}
            
           />


    </View>

          
           <Text
           style={{
            fontWeight:300,
            color:"orange",
            fontSize:15,
          marginTop:10,

           }}>User Info</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <View
         style={styles.input}
         >
          <Text>Simon</Text>
        </View>

      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View
         style={styles.input}
         >
          <Text>simon1@gmail.com</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <View
         style={styles.input}
         >
          <Text>0546736365</Text>
        </View>
      </View>
      
        <TouchableOpacity

        style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        margin:10,
        justifyContent:'space-between',
        borderColor:'green',
        borderWidth:3,
        padding:7,
        borderRadius:10,
        }}
        onPress={() => router.push('getting_started')}>
            <Text>Logout--</Text>
    
          <Image style={{
               height:25,
               width:30,
              
            }}
           source={require('./../../assets/images/logout.png')}
           />
        
        </TouchableOpacity>
      
</View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
  // Add styles for the back arrow component
});

export default ProfilePage;
