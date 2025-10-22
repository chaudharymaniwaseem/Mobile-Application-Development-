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

const WinterUnstitchedScreen = ({ navigation }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Velvet Fabric 3-Piece',
      price: 3500,
      image: require('../assets/images/velvet-fabric.jpg'),
      description: 'Premium velvet fabric for winter'
    },
    {
      id: 2,
      name: 'Wool Blend Suit Piece',
      price: 2800,
      image: require('../assets/images/wool-fabric.jpg'),
      description: 'Warm wool blend suit material'
    },
    {
      id: 3,
      name: 'Silk Winter Fabric',
      price: 4200,
      image: require('../assets/images/silk-fabric.jpg'),
      description: 'Pure silk fabric with border'
    },
    {
      id: 4,
      name: 'Embroidered Suit Piece',
      price: 3800,
      image: require('../assets/images/embroidered-fabric.jpg'),
      description: 'Pre-embroidered winter fabric'
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
      <Header title="Winter Unstitched" showBack={true} navigation={navigation} />
      <SearchBar 
        placeholder="Search winter fabrics..." 
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

export default WinterUnstitchedScreen;