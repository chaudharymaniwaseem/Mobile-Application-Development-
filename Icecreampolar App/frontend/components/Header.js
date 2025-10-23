import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../constants/Colors';

const Header = ({ title, onBack, rightComponent, showBack = false }) => {
  return (
    <View style={[GlobalStyles.row, GlobalStyles.spaceBetween, { alignItems: 'center', marginBottom: 24 }]}>
      {/* Header content */}
    </View>
  );
};

export default Header;