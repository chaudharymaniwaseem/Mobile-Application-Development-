import React from 'react';
import { GlobalStyles, Colors, Typography, Spacing, BorderRadius, Shadows } from '../../frontend/styles';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const SizeSelector = ({ sizes, selectedSize, onSizeSelect }) => {
  return (
    <View style={styles.container}>
      {sizes.map((size) => (
        <TouchableOpacity
          key={size}
          style={[
            styles.sizeButton,
            selectedSize === size && styles.selectedSize
          ]}
          onPress={() => onSizeSelect(size)}
        >
          <Text
            style={[
              styles.sizeText,
              selectedSize === size && styles.selectedSizeText
            ]}
          >
            {size}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5
  },
  sizeButton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#fff',
    elevation: 2
  },
  selectedSize: {
    borderColor: '#000000ff',
    backgroundColor: '#000000ff',
    transform: [{ scale: 1.05 }]
  },
  sizeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  selectedSizeText: {
    color: '#fff'
  }
});

export default SizeSelector;