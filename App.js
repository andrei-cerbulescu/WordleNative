import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './src/screens/HomeScreen';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndexLogin from './src/screens/login';
import IndexGame from './src/screens/game';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IndexLogin"
          component={IndexLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IndexGame"
          component={IndexGame}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

