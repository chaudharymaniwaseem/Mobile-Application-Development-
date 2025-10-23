import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { GlobalStyles } from './frontend/styles/GlobalStyles';
import { Colors } from './frontend/constants/Colors';
import AppNavigator from './frontend/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar style="dark" backgroundColor={Colors.surface} />
      <AppNavigator />
    </SafeAreaView>
  );
}