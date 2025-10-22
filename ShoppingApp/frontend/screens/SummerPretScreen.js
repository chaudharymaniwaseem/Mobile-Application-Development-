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

const SummerPretScreen = ({ navigation }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Lawn Embroidered Suit',
      price: 3200,
      image: require('../assets/images/lawn-suit.jpg'),
      description: 'Light lawn with delicate embroidery'
    },
    {
      id: 2,
      name: 'Cotton Summer Kurta',
      price: 2500,
      image: require('../assets/images/cotton-kuria.jpg'),
      description: 'Pure cotton comfortable kurta'
    },
    {
      id: 3,
      name: 'Chiffon Summer Dress',
      price: 3800,
      image: require('../assets/images/chiffon-dress.jpg'),
      description: 'Flowy chiffon summer dress'
    },
    {
      id: 4,
      name: 'Printed Shalwar Kameez',
      price: 2800,
      image: require('../assets/images/printed-suit.jpg'),
      description: 'Traditional printed summer suit'
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
      <Header title="Summer Pret Collection" showBack={true} navigation={navigation} />
      <SearchBar 
        placeholder="Search summer pret..." 
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

export default SummerPretScreen;