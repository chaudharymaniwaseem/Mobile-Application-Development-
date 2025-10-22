import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import ServicesScreen from '../screens/ServicesScreen';
import BillingScreen from '../screens/BillingScreen';
import AdminDashboard from '../screens/AdminDashboard';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = '🏰';
            } else if (route.name === 'Book') {
              iconName = '📅';
            } else if (route.name === 'Services') {
              iconName = '⭐';
            } else if (route.name === 'Billing') {
              iconName = '💳';
            } else if (route.name === 'Admin') {
              iconName = '👑';
            }

            return <Text style={{ fontSize: size, color }}>{iconName}</Text>;
          },
          tabBarActiveTintColor: '#2b6cb0',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Book" component={BookingScreen} />
        <Tab.Screen name="Services" component={ServicesScreen} />
        <Tab.Screen name="Billing" component={BillingScreen} />
        <Tab.Screen name="Admin" component={AdminDashboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;