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

const WomenPerfumesScreen = ({ navigation }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Rose Attar',
      price: 3500,
      image: require('../assets/images/rose-perfume.jpg'),
      description: 'Pure rose traditional scent'
    },
    {
      id: 2,
      name: 'Jasmine Perfume',
      price: 3200,
      image: require('../assets/images/jasmine-perfume.jpg'),
      description: 'Fresh jasmine floral scent'
    },
    {
      id: 3,
      name: 'Lotus Bloom',
      price: 3800,
      image: require('../assets/images/lotus-perfume.jpg'),
      description: 'Exotic lotus flower fragrance'
    },
    {
      id: 4,
      name: 'Musk Rose',
      price: 4000,
      image: require('../assets/images/musk-rose.jpg'),
      description: 'Musk and rose combination'
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
      <Header title="Women Perfumes" showBack={true} navigation={navigation} />
      <SearchBar 
        placeholder="Search women perfumes..." 
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

export default WomenPerfumesScreen;