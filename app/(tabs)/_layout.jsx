import {Image, View, Text } from 'react-native'
import React from 'react'
import {Tabs, Redirect} from 'expo-router'



const TabIcon = ({color, name, focused})=>{
    return(
        <View className="items-center justify-center gap-2">
         
           <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color:color}}>
            {name}
           </Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor:'#1D4C43',
            tabBarInactiveTintColor:'#CDCDE0',
            tabBarStyle:{
                backgroundColor:'white',
                height:75,
            }
        }}
      >
        

        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon:({color, focused}) =>(
                <TabIcon
                color={color}
                name="Home"
                focused={focused}
                />
            )
          }}
        />


        <Tabs.Screen
          name="OwnValues"
          options={{
            title: 'Altenate',
            headerShown: false,
            tabBarIcon:({color, focused}) =>(
                <TabIcon
                color={color}
                name="Adjust"
                focused={focused}
                />
            )
          }}
        />

        
        <Tabs.Screen
          name="Alternate"
          options={{
            title: 'Prediction',
            headerShown: false,
            tabBarIcon:({color, focused}) =>(
                <TabIcon
                color={color}
                name="Prediction"
                focused={focused}
                />
            )
          }}
        />

        
        <Tabs.Screen
          name="chatbot"
          options={{
            title: 'AI chatbot',
            headerShown: false,
            tabBarIcon:({color, focused}) =>(
                <TabIcon
                color={color}
                name="Chatbot"
                focused={focused}
                />
            )
          }}
        />


        <Tabs.Screen
          name="Profile"
          options={{
            title: 'PRofile',
            headerShown: false,
            tabBarIcon:({color, focused}) =>(
                <TabIcon
                color={color}
                name="Profile"
                focused={focused}
                />
            )
          }}
        />



      </Tabs>
    </>
  )
}

export default TabsLayout