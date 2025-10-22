import React from 'react';
import { GlobalStyles, Colors, Typography, Spacing, BorderRadius, Shadows } from '../../frontend/styles';
import {
  View,
  FlatList,
  Dimensions
} from 'react-native';
import ProductCard from './ProductCard';

const { width } = Dimensions.get('window');

const ProductGrid = ({ products, onProductPress, columns = 2, showDiscount = false }) => {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => onProductPress(item)}
          showDiscount={showDiscount}
        />
      )}
      keyExtractor={item => item.id.toString()}
      numColumns={columns}
      contentContainerStyle={styles.productsGrid}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
};

const styles = {
  productsGrid: {
    padding: 10
  },
  columnWrapper: {
    justifyContent: 'space-between'
  }
};

export default ProductGrid;