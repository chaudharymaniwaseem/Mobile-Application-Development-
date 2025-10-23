import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../constants/Colors';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OrderTrackingScreen from '../screens/OrderTrackingScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigators
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
  </Stack.Navigator>
);

const MenuStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MenuMain" component={MenuScreen} />
  </Stack.Navigator>
);

const CartStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CartMain" component={CartScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{ 
          tabBarStyle: GlobalStyles.tabBar,
          tabBarActiveTintColor: Colors.primary,
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ tabBarIcon: ({ color, size }) => (<Text style={{ fontSize: size, color }}>🏠</Text>), headerShown: false }} />
        <Tab.Screen name="Menu" component={MenuStack} options={{ tabBarIcon: ({ color, size }) => (<Text style={{ fontSize: size, color }}>🍦</Text>), headerShown: false }} />
        <Tab.Screen name="Cart" component={CartStack} options={{ tabBarIcon: ({ color, size }) => (<Text style={{ fontSize: size, color }}>🛒</Text>), headerShown: false }} />
        <Tab.Screen name="Profile" component={ProfileStack} options={{ tabBarIcon: ({ color, size }) => (<Text style={{ fontSize: size, color }}>👤</Text>), headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;