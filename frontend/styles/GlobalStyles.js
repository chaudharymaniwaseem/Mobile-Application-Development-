import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const isMobile = width < 768;

// Color palette
export const Colors = {
  primary: '#000000',
  primaryWithOpacity: '#000000ff',
  secondary: '#2F4F4F',
  background: '#f8f5f0',
  white: '#FFFFFF',
  textDark: '#333333',
  textLight: '#666666',
  textLighter: '#999999',
  success: '#10B981',
  error: '#ff4444',
  warning: '#FFFBEB',
  border: '#ddd',
  disabled: '#ccc',
  badge: '#ff4444',
  freeShipping: '#27ae60',
  overlay: 'rgba(0, 0, 0, 0.6)',
  overlayLight: 'rgba(0, 0, 0, 0.7)',
  transparent: 'transparent',
};

// Spacing
export const Spacing = {
  container: isMobile ? 15 : 30,
  section: isMobile ? 20 : 30,
  item: isMobile ? 10 : 15,
  small: isMobile ? 5 : 8,
  medium: isMobile ? 8 : 12,
  large: isMobile ? 12 : 16,
  xlarge: isMobile ? 20 : 30,
};

// Global Styles
const GlobalStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Card styles
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.item,
    marginBottom: Spacing.item,
    elevation: 3,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    margin: 8,
    elevation: 3,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },

  // Button styles
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    flexDirection: 'row'
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  outlineButton: {
    backgroundColor: Colors.transparent,
    borderWidth: 2,
    borderColor: Colors.primary,
  },

  // Text styles
  sectionTitle: {
    fontSize: isMobile ? 20 : 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.medium,
  },
  productName: {
    fontSize: isMobile ? 14 : 16,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: Spacing.small,
  },
  productPrice: {
    fontSize: isMobile ? 16 : 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.small,
  },

  // Utility styles
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
});

export default GlobalStyles;