import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Importing screens from the screens directory
import Home from "../../screens/Home";
import About from "../../screens/About";

const Tab = createBottomTabNavigator();


export default function BottomTabs() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
  );
}
