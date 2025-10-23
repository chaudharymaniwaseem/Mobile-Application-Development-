import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Messages } from '../utils/messages';
import Header from '../components/Header';
import IceCreamCard from '../components/IceCreamCard';

const MenuScreen = () => {
  return (
    <View style={GlobalStyles.screenContainer}>
      <Header title="Our Menu" />
      <ScrollView>
        {/* Menu screen content */}
      </ScrollView>
    </View>
  );
};

export default MenuScreen;