import React from 'react';
import { GlobalStyles, Colors, Typography, Spacing, BorderRadius, Shadows } from '../../frontend/styles';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const ColorSelector = ({ colors, selectedColor, onColorSelect }) => {
  const getColorValue = (colorName) => {
    const colorMap = {
      'Red': '#827745ff',
      'Blue': '#449bffb4',
      'Green': '#44ff44',
      'Black': '#000000',
      'White': '#ffffff',
      'Yellow': '#ffff44',
      'Purple': '#ff44ff',
      'Pink': '#ffaaaa',
      'Gray': '#888888',
      'Navy': '#000080',
      'Maroon': '#800000'
    };
    return colorMap[colorName] || '#cccccc';
  };

  return (
    <View style={styles.container}>
      {colors.map((color) => (
        <TouchableOpacity
          key={color}
          style={[
            styles.colorButton,
            {
              backgroundColor: getColorValue(color)
            },
            selectedColor === color && styles.selectedColor
          ]}
          onPress={() => onColorSelect(color)}
        >
          {selectedColor === color && (
            <Text style={styles.checkmark}>✓</Text>
          )}
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
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2
  },
  selectedColor: {
    borderColor: '#333',
    transform: [{ scale: 1.1 }],
    elevation: 4
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  }
});

export default ColorSelector;