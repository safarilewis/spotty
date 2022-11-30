import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons'

//Importing screens from the screens directory
import Home from "./screens/Home";
import Playlist from "./screens/Playlist";

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
          }else if (route.name === 'Playlists') {
            iconName = focused ? 'play-sharp' : 'play-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Playlists" component={Playlist} />
    </Tab.Navigator>
  );
}
