import React, { useState } from 'react';
import { GlobalStyles, Colors, Typography, Spacing, BorderRadius, Shadows } from '../../frontend/styles';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert
} from 'react-native';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { useCart } from '../context/CartContext';

const SaleScreen = ({ navigation }) => {
  const { addToCart } = useCart();
  
  const [saleProducts, setSaleProducts] = useState([
    {
      id: 1,
      name: 'Embroidered Shalwar Kameez',
      price: 3500,
      originalPrice: 5000,
      discount: 30,
      image: require('../assets/images/sale-1.jpg'),
      description: 'Beautifully embroidered cotton suit',
      category: 'Dress',
      size: 'M',
      color: 'Red'
    },
    {
      id: 2,
      name: 'Silk Kurta Set',
      price: 2800,
      originalPrice: 4000,
      discount: 30,
      image: require('../assets/images/sale-2.jpg'),
      description: 'Pure silk kurta with trouser',
      category: 'Dress',
      size: 'L',
      color: 'Blue'
    },
    {
      id: 3,
      name: 'Traditional Lehenga',
      price: 8500,
      originalPrice: 12000,
      discount: 29,
      image: require('../assets/images/sale-3.jpg'),
      description: 'Heavy work lehenga for special occasions',
      category: 'Dress',
      size: 'M',
      color: 'Maroon'
    },
    {
      id: 4,
      name: 'Casual Summer Dress',
      price: 2200,
      originalPrice: 3200,
      discount: 31,
      image: require('../assets/images/sale-4.jpg'),
      description: 'Light and comfortable summer wear',
      category: 'Dress',
      size: 'S',
      color: 'White'
    },
    {
      id: 5,
      name: 'Winter Wool Suit',
      price: 4500,
      originalPrice: 6500,
      discount: 31,
      image: require('../assets/images/sale-5.jpg'),
      description: 'Warm wool suit for winter',
      category: 'Dress',
      size: 'M',
      color: 'Black'
    },
    {
      id: 6,
      name: 'Designer Perfume',
      price: 2500,
      originalPrice: 3800,
      discount: 34,
      image: require('../assets/images/sale-6.jpg'),
      description: 'Premium traditional fragrance',
      category: 'Perfume',
      size: '50ml',
      color: 'Gold'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = saleProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    Alert.alert(
      'Added to Cart',
      `${product.name} has been added to your cart!`,
      [
        {
          text: 'Continue Shopping',
          style: 'cancel'
        },
        {
          text: 'View Cart',
          onPress: () => navigation.navigate('Cart')
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      
      
      {/* Sale Banner */}
      <View style={styles.saleBanner}>
        <View style={styles.saleBannerText}>
          <Text style={styles.saleTitle}>MEGA SALE</Text>
          <Text style={styles.saleSubtitle}>Up to 50% OFF</Text>
          <Text style={styles.saleDescription}>On Traditional Dresses</Text>
        </View>
      </View>

      <SearchBar 
        placeholder="Search sale items..." 
        onSearch={setSearchQuery}
      />
      
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
            onAddToCart={() => handleAddToCart(item)}
            showDiscount={true}
          />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productsGrid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f5f0'
  },
  saleBanner: {
    height: 160,
    position: 'relative',
    marginBottom: 10
  },
  saleBannerText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  saleTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5
  },
  saleSubtitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5
  },
  saleDescription: {
    color: '#fff',
    fontSize: 13
  },
  productsGrid: {
    padding: 10
  }
});

export default SaleScreen;