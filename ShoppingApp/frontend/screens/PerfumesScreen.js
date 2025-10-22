import React from 'react';
import { GlobalStyles, Colors, Typography, Spacing, BorderRadius, Shadows } from '../../frontend/styles';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import Header from '../components/Header';

const PerfumesScreen = ({ navigation }) => {
  const categories = [
    {
      id: 1,
      name: 'Men Perfumes',
      description: 'Traditional scents for men',
      image: require('../assets/images/men-perfumes.jpg'),
      screen: 'MenPerfumes'
    },
    {
      id: 2,
      name: 'Women Perfumes',
      description: 'Floral and sweet scents',
      image: require('../assets/images/women-perfumes.jpg'),
      screen: 'WomenPerfumes'
    }
  ];

  const handleCategoryPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Black Header Container with Back Icon */}
        <View style={styles.heroSection}>
          {/* Back Icon */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Traditional Perfumes</Text>
            <Text style={styles.heroSubtitle}>Authentic Pakistani Fragrances</Text>
            <Text style={styles.heroSubtitle}>2024</Text>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Perfume Categories</Text>
          {categories.map((category) => (
            <View key={category.id} style={styles.categoryCard}>
              <TouchableOpacity
                style={styles.cardTouchable}
                onPress={() => handleCategoryPress(category.screen)}
              >
                <Image
                  source={category.image}
                  style={styles.categoryImage}
                />
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryDesc}>{category.description}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.exploreButton}
                onPress={() => handleCategoryPress(category.screen)}
              >
                <Text style={styles.exploreButtonText}>Explore</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f5f0'
  },
  scrollView: {
    flex: 1
  },
  // Black Header Container Styles
  heroSection: {
    height: 160,
    backgroundColor: '#000000ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  backButton: {
    position: 'absolute',
    top: 36,
    left: 8,
    zIndex: 1
  },
  backIcon: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  heroContent: {
    alignItems: 'center'
  },
  heroTitle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  },
  heroSubtitle: {
    color: '#fff',
    fontSize: 10
  },
  categoriesContainer: {
    padding: 22
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2F4F4F',
    marginBottom: 20,
    textAlign: 'center'
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
    position: 'relative'
  },
  cardTouchable: {
    flex: 1
  },
  categoryImage: {
    width: '100%',
    height: 150
  },
  categoryInfo: {
    padding: 15
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F4F4F',
    marginBottom: 5
  },
  categoryDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  exploreButton: {
    backgroundColor: '#000000',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 18,
    position: 'absolute',
    bottom: 15,
    right: 15,
    zIndex: 2
  },
  exploreButtonText: {
    color: '#f0f0f0',
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export default PerfumesScreen;