import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthStack from './AuthStack';
import TabNavigator from './TabNavigator'
import SplashScreen from './screens/SplashScreen'

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const screenOptions = {
    headerShown: false,
  }
  return (
    <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Auth" component={AuthStack}/>
            <Stack.Screen name="HomeTab" component={TabNavigator}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}