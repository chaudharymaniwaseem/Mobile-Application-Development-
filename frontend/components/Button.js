import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { GlobalStyles, Colors, Typography, Spacing, BorderRadius, Shadows } from '../../frontend/styles';

const Button = ({ title, onPress, style, textStyle, loading = false, disabled = false, variant = 'primary' }) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return GlobalStyles.buttonPrimary; // Same as primary for now
      case 'outline':
        return GlobalStyles.buttonOutline;
      default:
        return GlobalStyles.buttonPrimary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return GlobalStyles.buttonTextOutline;
      default:
        return GlobalStyles.buttonText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        GlobalStyles.button,
        getButtonStyle(),
        style,
        disabled && GlobalStyles.buttonDisabled
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Only component-specific styles here
});

export default Button;