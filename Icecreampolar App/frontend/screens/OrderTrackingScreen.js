import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../constants/Colors';
import { Messages } from '../utils/messages';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';

const OrderTrackingScreen = () => {
  return (
    <View style={GlobalStyles.screenContainer}>
      <Header title="Order Tracking" showBack />
      <ScrollView>
        {/* Order tracking content */}
      </ScrollView>
    </View>
  );
};

export default OrderTrackingScreen;