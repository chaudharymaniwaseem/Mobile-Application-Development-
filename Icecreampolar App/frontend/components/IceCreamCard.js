import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../constants/Colors';
import CustomButton from './CustomButton';

const IceCreamCard = ({ item, onPress, onFavorite, showAddButton = true }) => {
  return (
    <View style={[GlobalStyles.card, { width: GlobalStyles.isMobile ? '100%' : '48%', margin: 8 }]}>
      {/* Card content */}
    </View>
  );
};

export default IceCreamCard;