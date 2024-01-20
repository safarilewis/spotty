

import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./AppNavigation";
import SplashScreen from "./screens/SplashScreen";
import BottomTabs from "./TabNavigator";
import { useFonts, DancingScript_700Bold } from '@expo-google-fonts/dancing-script'


export default function App() {
  const [fontsLoaded] = useFonts({
    DancingScript_700Bold
  })
  return <AppNavigation />
  // (
  //   <NavigationContainer>
  //     <AppNavigation/>
  //     {/* <BottomTabs/> */}
  //   </NavigationContainer>
  // );
}
