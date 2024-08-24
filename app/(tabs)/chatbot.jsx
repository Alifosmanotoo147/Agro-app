import {View ,Text,StyleSheet,SafeAreaView, TextInput, TouchableOpacity,FlatList} from 'react-native'
import React,{useState} from 'react'
import axios from 'axios'
import {Ionicons} from '@expo/vector-icons'

const API_KEY = 'AIzaSyCgra9hntNbXC6d5LtwwpqGuvUO6Ew2oZs'

const ChatBot  = ()=>{
 const [messages, setMessages] = useState([])
 const [inputText, setInputText] = useState('');

 const generateText = async () => {
   if (inputText.trim() === '') {
     return;
   }

   const apiUrl = 'https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage';

   const requestData = {
     prompt : {
       context : '',
       examples: [],
       messages : [{content : inputText}]

     },
     temperature : 0.25,
     top_k : 40,
     top_p : 0.95,
     candidate_count : 1
   }
   const headers  = {
     'Content-Type': 'aplication/json',
   }

   try {
     const response = await axios.post(`${apiUrl}?key=${API_KEY}`,requestData,{
       headers
     });
     if(response.status === 200){
       if (response.data && response.data.candidates && response.data.candidates.length > 0){
         const botResponse = response.data.candidates[0].content;
         // Add the user's input to the message array 
         const newUserMessage = {
           id : messages.length + 1,
           text : inputText,
           sender : 'user',
           timestammp : new Date().getTime(),
         }
         // Add the bot's response to the message array 
         const newBotMessage = {
           id : messages.length + 2,
           text : botResponse,
           sender : 'bot',
           timestamp : new Date().getTime(),
         }
         setMessages([...messages,newUserMessage,newBotMessage])
         setInputText('')
       }else{
         console.error('Response structure is not as expected!!');
       }
     } else {
       console.error('Google Cloud API response failed with status : ',response.status)
     }
   } catch (error){
     console.error('An error occured while making the google cloud API request: ',error)

   }
 }
 return (
   <SafeAreaView style={styles.container}>
     <Text style={{
            fontWeight:700,
            color:"#153B34",
            fontSize:27,
            // position:'absolute',
            left:10,
            top:10,

           }}>Agro-Chatbot</Text>
     <FlatList
     data = {messages}
     keyExtractor={(item)=> item.id.toString()}
     renderItem={({item}) => (
       <View
       style = {{
         alignSelf : item.sender === 'user'? 'flex-end': 'flex-start',
         marginBottom : 12,
       }}>
         <View
         style={{
           backgroundColor : item.sender === 'user'? '#1D4C43': '#E5E5EA',
           padding : 10,
           borderRadius : 10,
         }}>
           <Text style={{
             color : item.sender === 'user' ? 'white': 'black'
           }}>{item.sender === 'user' ? item.text : item.text}</Text>
           <Text style = {{
             color : item.sender === 'user'? 'white' : 'black',
             fontSize : 12,
             marginTop: 4,
           }}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
         </View>
       </View>
     )}/>
     <View style={styles.inputContainer}>
       <TextInput placeholder = "Ask me any Question..."
       value={inputText}
       onChangeText={(text)=> setInputText(text)}
       style={styles.input}/>
       <TouchableOpacity onPress={generateText} style={styles.sendButton}>
         <Ionicons name="send" size={24} color='white'/>
       </TouchableOpacity>
     </View>
   </SafeAreaView>
   )
}

const styles = StyleSheet.create({
 container : {
   flex : 1, 
   backgroundColor : '#fff',
   paddingHorizontal: 16,
   paddigTop : 24,
 },
 title : {
   fontSize : 24,
   color : '#fff',
   marginBottom: 16,
   textAlign : 'center',
   fontWeight : 'bold',
   marginTop : 20
 },
 inputContainer : {
   backgroundColor : 'f0f0f0',
   padding : 10,
   borderRadius : 10,
   marginTop : 20,
   width : '100%'   ,
   alignSelf : 'center',
   shadowColor: '#000',
   shadowOffset : {
     width : 0,
     height : 2
   },
   shadowOpacity : 0.25,
   shadowRadius : 3.84,
   elevation: 5

 },
 input : {
   fontSize : 16,
   color : '#333',
   paddingVertical : 12,
   paddingHorizontal : 16,
   backgroundColor : '#f5f5f5' ,
   borderRadius: 10,
   marginBottom : 20,
   shadowColor : '#000',
   shadowOffset : {
     width : 0,
     height : 2
   },
   shadowOpacity : 0.1,
   shadowRadius : 2,
   elevation : 3
 },
 sendButton : {
   padding  : 10,
   borderRadius : 10,
   backgroundColor : '#1D4C43'
 }
})

export default ChatBot