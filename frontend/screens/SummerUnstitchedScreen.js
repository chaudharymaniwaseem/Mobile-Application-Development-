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

const SummerUnstitchedScreen = ({ navigation }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Premium Lawn 3-Piece',
      price: 2200,
      image: require('../assets/images/lawn-fabric.jpg'),
      description: 'High quality lawn fabric'
    },
    {
      id: 2,
      name: 'Cotton Suit Piece',
      price: 1800,
      image: require('../assets/images/cotton-fabric.jpg'),
      description: 'Pure cotton suit material'
    },
    {
      id: 3,
      name: 'Chiffon Fabric',
      price: 3000,
      image: require('../assets/images/chiffon-fabric.jpg'),
      description: 'Sheer chiffon fabric'
    },
    {
      id: 4,
      name: 'Printed Lawn',
      price: 2000,
      image: require('../assets/images/printed-fabric.jpg'),
      description: 'Beautiful printed lawn'
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
      <Header title="Summer Unstitched" showBack={true} navigation={navigation} />
      <SearchBar 
        placeholder="Search summer fabrics..." 
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

export default SummerUnstitchedScreen;