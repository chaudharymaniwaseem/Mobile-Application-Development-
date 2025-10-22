import React, { useState } from 'react';
import { GlobalStyles, Colors, Typography, Spacing, BorderRadius, Shadows } from '../../frontend/styles';
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const MenPerfumesScreen = ({ navigation }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Traditional Oud',
      price: 4500,
      image: require('../assets/images/oud-perfume.jpg'),
      description: 'Authentic Arabian Oud scent'
    },
    {
      id: 2,
      name: 'Sandalwood Attar',
      price: 3200,
      image: require('../assets/images/sandalwood-perfume.jpg'),
      description: 'Pure sandalwood traditional attar'
    },
    {
      id: 3,
      name: 'Amber Musk',
      price: 3800,
      image: require('../assets/images/amber-perfume.jpg'),
      description: 'Warm amber and musk blend'
    },
    {
      id: 4,
      name: 'Rose Oud',
      price: 4200,
      image: require('../assets/images/rose-oud.jpg'),
      description: 'Rose and oud combination'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product) => {
    navigation.navigate('Cart', { 
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
      }
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Men Perfumes" showBack={true} navigation={navigation} />
      <SearchBar 
        placeholder="Search men perfumes..." 
        onSearch={setSearchQuery}
      />
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
            onAddToCart={() => handleAddToCart(item)}
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
  productsGrid: {
    padding: 10
  }
});

export default MenPerfumesScreen;