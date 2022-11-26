import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons'

//Importing screens from the screens directory
import Home from "../../screens/Home";
import About from "../../screens/About";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home'){
            iconName = focused
            ? 'home'
            : 'home-outline'
          }else if (route.name === 'About') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
  );
}
