import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
//import TabNavigator from "./TabNavigator"
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

export default function AuthStack() {
  return ( 
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        {/* <Stack.Screen name="TabNavigator" component={TabNavigator}/> */}
      </Stack.Navigator>
  );
}
