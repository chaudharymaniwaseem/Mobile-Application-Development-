import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');
const isMobile = width < 768;
const isTablet = width >= 768 && width < 1024;
const isDesktop = width >= 1024;

export const GlobalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: isMobile ? 16 : 24,
    paddingTop: 10,
  },
  
  // Typography
  heading1: {
    fontSize: isMobile ? 28 : 36,
    fontWeight: 'bold',
    color: Colors.text.primary,
    textAlign: isMobile ? 'center' : 'left',
  },
  heading2: {
    fontSize: isMobile ? 24 : 30,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  heading3: {
    fontSize: isMobile ? 20 : 24,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  bodyText: {
    fontSize: isMobile ? 16 : 18,
    color: Colors.text.secondary,
    lineHeight: isMobile ? 22 : 26,
  },
  caption: {
    fontSize: isMobile ? 14 : 16,
    color: Colors.text.secondary,
  },
  
  // Cards
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: isMobile ? 16 : 24,
    marginVertical: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  // Buttons
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: isMobile ? 14 : 16,
    paddingHorizontal: isMobile ? 20 : 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.text.light,
    fontSize: isMobile ? 16 : 18,
    fontWeight: '600',
  },
  
  // Utility
  row: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  
  // Responsive helpers
  isMobile: isMobile,
  isTablet: isTablet,
  isDesktop: isDesktop,
});