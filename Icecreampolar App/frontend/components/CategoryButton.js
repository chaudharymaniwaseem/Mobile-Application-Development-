import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../constants/Colors';

const CategoryButton = ({ title, isSelected, onPress }) => {
  return (
    <TouchableOpacity style={[/* styles */]} onPress={onPress}>
      <Text style={[GlobalStyles.bodyText, { fontWeight: '600' }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;