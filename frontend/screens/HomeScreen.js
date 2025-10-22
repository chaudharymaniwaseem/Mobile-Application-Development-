import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Modal, Animated } from 'react-native';
iimport GlobalStyles, { Colors, Spacing } from '../styles/GlobalStyles';
const { width, height } = Dimensions.get('window');
const isMobile = width < 768;

const HomeScreen = ({ navigation }) => {
  // ... existing state and data ...

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.customHeader}>
        {/* ... header content ... */}
      </View>

      <ScrollView style={GlobalStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Main Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={require('../assets/images/main-banner.jpg')}
            style={GlobalStyles.image}
            resizeMode="cover"
          />
        </View>

        {/* Categories Grid */}
        <View style={GlobalStyles.gridContainer}>
          <Text style={Typography.sectionTitle}>Shop Categories</Text>
          <View style={GlobalStyles.grid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { borderLeftColor: category.color }]}
                onPress={() => navigation.navigate(category.screen)}
              >
                <Image source={category.image} style={GlobalStyles.categoryImage} resizeMode="cover" />
                <View style={styles.categoryOverlay}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ... rest of the components ... */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  customHeader: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.container,
    paddingVertical: isMobile ? 15 : 20,
    paddingTop: isMobile ? 35 : 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  bannerContainer: {
    height: isMobile ? 300 : 500,
    position: 'relative',
    marginBottom: 10,
  },
  categoryCard: {
    width: isMobile ? (width - 50) / 2 : (width - 90) / 4,
    height: isMobile ? 180 : 250,
    marginBottom: 15,
    borderRadius: BorderRadius.large,
    overflow: 'hidden',
    position: 'relative',
    borderLeftWidth: 4,
    ...Shadows.small,
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.overlayLight,
    padding: isMobile ? 10 : 15,
  },
  categoryName: {
    color: Colors.white,
    fontSize: isMobile ? 13 : 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // ... other component-specific styles ...
});

export default HomeScreen;