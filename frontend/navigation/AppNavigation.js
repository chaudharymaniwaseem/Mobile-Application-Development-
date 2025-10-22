import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalStyles, Colors, Typography, Spacing, BorderRadius, Shadows } from '../../frontend/styles';
// Import all screens
import HomeScreen from '../screens/HomeScreen';
import WinterScreen from '../screens/WinterScreen';
import WinterPretScreen from '../screens/WinterPretScreen';
import WinterUnstitchedScreen from '../screens/WinterUnstitchedScreen';
import SummerScreen from '../screens/SummerScreen';
import SummerPretScreen from '../screens/SummerPretScreen';
import SummerUnstitchedScreen from '../screens/SummerUnstitchedScreen';
import PerfumesScreen from '../screens/PerfumesScreen';
import MenPerfumesScreen from '../screens/MenPerfumesScreen';
import WomenPerfumesScreen from '../screens/WomenPerfumesScreen';
import SaleScreen from '../screens/SaleScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
   
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0000',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        
      />
      <Stack.Screen name="Winter" component={WinterScreen} />
      <Stack.Screen name="WinterPret" component={WinterPretScreen} />
      <Stack.Screen name="WinterUnstitched" component={WinterUnstitchedScreen} />
      <Stack.Screen name="Summer" component={SummerScreen} />
      <Stack.Screen name="SummerPret" component={SummerPretScreen} />
      <Stack.Screen name="SummerUnstitched" component={SummerUnstitchedScreen} />
      <Stack.Screen name="Perfumes" component={PerfumesScreen} />
      <Stack.Screen name="MenPerfumes" component={MenPerfumesScreen} />
      <Stack.Screen name="WomenPerfumes" component={WomenPerfumesScreen} />
      <Stack.Screen name="Sale" component={SaleScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;