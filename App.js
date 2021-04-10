import React from 'react';
import { useFonts } from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './src/screens/LandingScreen';
import AddInfoScreen from './src/screens/AddInfoScreen';
import HomeScreen from './src/screens/HomeScreen';
import ForYouScreen from './src/screens/ForYouScreen';
import ProductScreen from './src/screens/ProductScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import OrderSuccessScreen from './src/screens/OrderSuccessScreen';

import AllOrderScreen from './src/screens/AllOrderScreen';
import ExploreScreen from './src/screens/ExploreScreen';

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
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="OrderSuccessScreen" component={OrderSuccessScreen} />
        <Stack.Screen name="AllOrderScreen" component={AllOrderScreen} />
        <Stack.Screen name="ExploreScreen" component={ExploreScreen} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}
