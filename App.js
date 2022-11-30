

import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./AppNavigation";
import SplashScreen from "./screens/SplashScreen";
import BottomTabs from "./TabNavigator";


export default function App() {
  return <AppNavigation/>
  // (
  //   <NavigationContainer>
  //     <AppNavigation/>
  //     {/* <BottomTabs/> */}
  //   </NavigationContainer>
  // );
}
