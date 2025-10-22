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

const WinterPretScreen = ({ navigation }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Velvet Embroidered Suit',
      price: 6500,
      image: require('../assets/images/embroidered-fabric.jpg'),
      description: 'Hand-embroidered velvet winter suit'
    },
    {
      id: 2,
      name: 'Wool Blend Kurta',
      price: 4500,
      image: require('../assets/images/cotton-kuria.jpg'),
      description: 'Warm wool blend traditional kurta with wool trouser'
    },
    {
      id: 3,
      name: 'Silk Winter Dress',
      price: 7800,
      image: require('../assets/images/chiffon-dress.jpg'),
      description: 'Pure silk with intricate embroidery'
    },
    {
      id: 4,
      name: 'Traditional Gown',
      price: 9200,
      image: require('../assets/images/featured-1.jpg'),
      description: 'Elegant winter gown with heavy work'
    },
    {
      id: 5,
      name: 'Embroidered Sherwani',
      price: 12500,
      image: require('../assets/images/featured-2.jpg'),
      description: 'Traditional mens sherwani for winter'
    },
    {
      id: 6,
      name: 'Winter Lehenga',
      price: 15000,
      image: require('../assets/images/featured-3.jpg'),
      description: 'Heavy winter lehenga with embroidery and fully designer lehnega'
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
        // other product details you want to include
      }
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Winter Pret Collection" showBack={true} navigation={navigation} />
      <SearchBar 
        placeholder="Search winter pret collection..." 
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

export default WinterPretScreen;