import React, { useState } from 'react';
import { GlobalStyles, Colors, Typography, Spacing, BorderRadius, Shadows } from '../../frontend/styles';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import SizeSelector from '../components/SizeSelector';
import ColorSelector from '../components/ColorSelector';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Red');
  const [quantity, setQuantity] = useState(1);

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Pink'];

  const handleAddToCart = () => {
    navigation.navigate('Cart', { 
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity
      }
    });
  };

  const handleBuyNow = () => {
    alert('Proceeding to checkout...');
  };

  return (
    <View style={styles.container}>
      <Header title="Product Details" showBack={true} navigation={navigation} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <Image
          source={product.image}
          style={styles.productImage}
          resizeMode="cover"
        />

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>Rs. {product.price}</Text>
            {product.originalPrice && (
              <>
                <Text style={styles.originalPrice}>Rs. {product.originalPrice}</Text>
                <Text style={styles.discount}>
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </Text>
              </>
            )}
          </View>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>

        {/* Size Selector */}
        <View style={styles.selectorContainer}>
          <Text style={styles.selectorLabel}>Size</Text>
          <SizeSelector
            sizes={sizes}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
          />
        </View>

        {/* Color Selector */}
        <View style={styles.selectorContainer}>
          <Text style={styles.selectorLabel}>Color</Text>
          <ColorSelector
            colors={colors}
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
          />
        </View>

        {/* Quantity Selector */}
        <View style={styles.quantityContainer}>
          <Text style={styles.selectorLabel}>Quantity</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          title="Add to Cart"
          onPress={handleAddToCart}
          style={styles.addToCartButton}
          textStyle={styles.addToCartText}
        />
        <Button
          title="Buy Now"
          onPress={handleBuyNow}
          style={styles.buyNowButton}
          textStyle={styles.buyNowText}
        />
      </View>
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
  productImage: {
    width: '100%',
    height: 400
  },
  productInfo: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000ff',
    marginBottom: 10
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap'
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000ff',
    marginRight: 10
  },
  originalPrice: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 10
  },
  discount: {
    fontSize: 16,
    color: '#ff4444',
    fontWeight: 'bold'
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22
  },
  selectorContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10
  },
  selectorLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15
  },
  quantityContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8
  },
  quantityButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0'
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  quantityText: {
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: 'bold'
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000ff',
    marginRight: 10
  },
  addToCartText: {
    color: '#070707ff'
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#000000ff'
  },
  buyNowText: {
    color: '#fff'
  }
});

export default ProductDetailScreen;