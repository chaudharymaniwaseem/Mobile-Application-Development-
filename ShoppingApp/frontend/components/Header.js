import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CartIcon from './CartIcon';
import { GlobalStyles, Colors, Typography, Spacing, BorderRadius, Shadows } from '../../frontend/styles';

const Header = ({ title, showBack = false, showCart = false, navigation }) => {
  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleCartPress = () => {
    if (navigation) {
      navigation.navigate('Cart');
    }
  };

  return (
    <View style={GlobalStyles.header}>
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={GlobalStyles.headerTitle}>{title}</Text>
      <View style={styles.rightSection}>
        {showCart && (
          <TouchableOpacity onPress={handleCartPress}>
            <CartIcon />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  leftSection: {
    width: 40,
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 5,
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
  },
});

export default Header;