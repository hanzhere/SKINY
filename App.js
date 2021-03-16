import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './src/screens/LandingScreen';
import AddInfoScreen from './src/screens/AddInfoScreen';
import HomeScreen from './src/screens/HomeScreen';
import ForYouScreen from './src/screens/ForYouScreen';
import ProductScreen from './src/screens/ProductScreen';

const Stack = createStackNavigator();

export default function App() {
  const [saolLoaded] = useFonts({
    Saol: require('./src/fonts/SaolDisplay.ttf'),
  });

  const [effraLoaded] = useFonts({
    Effra: require('./src/fonts/SVN-Effra.ttf'),
  });

  if (!saolLoaded && !effraLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingScreen" screenOptions={{ headerShown: false }}>

        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="AddInfoScreen" component={AddInfoScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ForYouScreen" component={ForYouScreen} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}