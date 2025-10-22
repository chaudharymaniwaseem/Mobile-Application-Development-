import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './frontend/context/CartContext';
import AppNavigation from './frontend/navigation/AppNavigation';

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <StatusBar style="light" />
          <AppNavigation />
        </View>
      </NavigationContainer>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f5f0',
  },
});