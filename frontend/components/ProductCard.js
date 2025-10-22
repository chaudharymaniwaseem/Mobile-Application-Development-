import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

const ProductCard = ({ product, onPress, onAddToCart }) => {
  return (
    <TouchableOpacity style={GlobalStyles.productCard} onPress={onPress}>
      <Image source={product.image} style={GlobalStyles.productImage} />
      <View style={styles.details}>
        <Text style={Typography.productName}>{product.name}</Text>
        <Text style={Typography.productPrice}>Rs. {product.price}</Text>
        <Text style={Typography.smallText} numberOfLines={2}>
          {product.description}
        </Text>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};



export default ProductCard;