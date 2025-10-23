import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../constants/Colors';

const SearchBar = ({ onSearch, placeholder = "Search for your favorite flavors..." }) => {
  return (
    <View style={[GlobalStyles.row, { marginBottom: 16 }]}>
      {/* Search bar content */}
    </View>
  );
};

export default SearchBar;