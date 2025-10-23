import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../constants/Colors';

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <View style={[GlobalStyles.card, GlobalStyles.row, { alignItems: 'center' }]}>
      {/* Component content */}
    </View>
  );
};

export default CartItem;