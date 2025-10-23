import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../constants/Colors';

const CustomButton = ({ title, onPress, variant = 'primary', loading = false }) => {
  return (
    <TouchableOpacity style={[GlobalStyles.button]} onPress={onPress}>
      <Text style={GlobalStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;