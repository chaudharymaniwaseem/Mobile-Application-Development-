import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../constants/Colors';
import { Messages } from '../utils/messages';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import CustomButton from '../components/CustomButton';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <View style={GlobalStyles.screenContainer}>
      <Header title="Your Cart" />
      {/* Cart screen content */}
    </View>
  );
};

export default CartScreen;