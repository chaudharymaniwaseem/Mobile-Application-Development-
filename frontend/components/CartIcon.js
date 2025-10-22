import React from 'react';
import { GlobalStyles, Colors, Typography, Spacing, BorderRadius, Shadows } from '../../frontend/styles';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartIcon = ({ itemCount = 0, onPress }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="cart-outline" size={24} color="#fff" />
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {itemCount > 99 ? '99+' : itemCount}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 5
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#000000ff'
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold'
  }
});

export default CartIcon;