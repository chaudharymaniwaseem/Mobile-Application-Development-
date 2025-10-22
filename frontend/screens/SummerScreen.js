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

const SummerScreen = ({ navigation }) => {
  const subcategories = [
    {
      id: 1,
      name: 'Summer Pret',
      description: 'Ready to wear summer collection',
      image: require('../assets/images/summer-pret.jpg'),
      screen: 'SummerPret'
    },
    {
      id: 2,
      name: 'Summer Unstitched',
      description: 'Lawn and cotton fabrics',
      image: require('../assets/images/summer-unstitched.jpg'),
      screen: 'SummerUnstitched'
    }
  ];

  return (
    <View style={styles.container}>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Simple Hero Section without image - Black Container */}
        <View style={styles.heroSection}>
          {/* Back Icon Added */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Summer Collection</Text>
            <Text style={styles.heroSubtitle}>Light & Breezy Traditional Wear</Text>
            <Text style={styles.heroSubtitle}>2024</Text>
          </View>
        </View>

        <View style={styles.subcategoriesContainer}>
          <Text style={styles.sectionTitle}>Choose Category</Text>
          {subcategories.map((subcategory) => (
            <TouchableOpacity
              key={subcategory.id}
              style={styles.subcategoryCard}
              onPress={() => navigation.navigate(subcategory.screen)}
            >
              <Image
                source={subcategory.image}
                style={styles.subcategoryImage}
              />
              <View style={styles.subcategoryInfo}>
                <Text style={styles.subcategoryName}>{subcategory.name}</Text>
                <Text style={styles.subcategoryDesc}>{subcategory.description}</Text>
                <Text style={styles.exploreText}>Explore →</Text>
              </View>
            </TouchableOpacity>
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
  heroSection: {
    height: 160,
    backgroundColor: '#000000ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative' // Added for positioning the back button
  },
  // Back Button Styles
  backButton: {
    position: 'absolute',
    top: 42,
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
  subcategoriesContainer: {
    padding: 22
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2F4F4F',
    marginBottom: 20,
    textAlign: 'center'
  },
  subcategoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
    flexDirection: 'row',
    height: 120
  },
  subcategoryImage: {
    width: 120,
    height: '100%'
  },
  subcategoryInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'center'
  },
  subcategoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F4F4F',
    marginBottom: 5
  },
  subcategoryDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  exploreText: {
    color: '#000000ff',
    fontWeight: '600'
  }
});

export default SummerScreen;