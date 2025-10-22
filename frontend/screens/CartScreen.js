import React, { useState } from 'react';
import GlobalStyles, { Colors, Spacing } from '../styles/GlobalStyles';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput
} from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';

const CartScreen = ({ navigation, route }) => {
  const { 
    cartItems, 
    updateQuantity, 
    clearCart,
    getTotalPrice,
    removeFromCart,
    addToCart
  } = useCart();

  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  // Discount codes configuration
  const discountCodes = {
    'WELCOME10': { type: 'percentage', value: 10, description: '10% off on total' },
    'SAVE20': { type: 'percentage', value: 20, description: '20% off on total' },
    'FREESHIP': { type: 'fixed', value: 200, description: 'Free shipping' },
    'FLAT50': { type: 'fixed', value: 50, description: 'Flat Rs. 50 off' },
    'FLAT100': { type: 'fixed', value: 100, description: 'Flat Rs. 100 off' },
    'ANY': { type: 'percentage', value: 15, description: '15% off on total' }
  };

  // Add item from route params if provided
  React.useEffect(() => {
    if (route.params?.product) {
      const product = route.params.product;
      addToCart(product);
      // Clear the params to avoid adding again
      navigation.setParams({ product: undefined });
    }
  }, [route.params?.product]);

  // Safety check
  if (!cartItems) {
    return (
      <View style={styles.container}>
        <Header title="Shopping Cart" showBack={true} navigation={navigation} />
        <View style={styles.emptyCart}>
          <Text>Loading cart...</Text>
        </View>
      </View>
    );
  }

  const applyDiscount = () => {
    const code = discountCode.toUpperCase().trim();
    
    if (code === '') {
      Alert.alert('Empty Code', 'Please enter a discount code.');
      return;
    }

    if (discountCodes[code]) {
      const discountInfo = discountCodes[code];
      let discountAmount = 0;

      if (discountInfo.type === 'percentage') {
        discountAmount = getTotalPrice() * (discountInfo.value / 100);
      } else if (discountInfo.type === 'fixed') {
        discountAmount = discountInfo.value;
      }

      setDiscount(discountAmount);
      setAppliedDiscount(discountInfo);
      Alert.alert('Success!', `${discountInfo.description}\nDiscount applied: Rs. ${discountAmount.toFixed(2)}`);
    } else {
      Alert.alert('Invalid Code', `The discount code "${code}" is not valid. Try: WELCOME10, SAVE20, FREESHIP, FLAT50, FLAT100, or ANY`);
      setDiscount(0);
      setAppliedDiscount(null);
    }
  };

  const removeDiscount = () => {
    setDiscount(0);
    setDiscountCode('');
    setAppliedDiscount(null);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Please add items to proceed.');
      return;
    }

    const subtotal = getTotalPrice();
    const shipping = appliedDiscount?.type === 'fixed' && appliedDiscount?.value === 200 ? 0 : 200;
    const finalAmount = subtotal + shipping - discount;

    Alert.alert(
      'Confirm Order',
      `Total Amount: Rs. ${finalAmount.toFixed(2)}\n\nProceed with checkout?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert(
              'Payment Successful!',
              `Your payment of Rs. ${finalAmount.toFixed(2)} has been processed successfully!\n\nOrder Details:\n• Items: ${cartItems.length}\n• Subtotal: Rs. ${subtotal.toFixed(2)}\n• Shipping: Rs. ${shipping.toFixed(2)}\n• Discount: Rs. ${discount.toFixed(2)}\n• Amount Paid: Rs. ${finalAmount.toFixed(2)}\n\nYou will receive a confirmation email shortly.`,
              [
                {
                  text: 'Back', // Changed from "Continue Shopping"
                  onPress: () => {
                    // Stay on cart screen - do nothing
                  }
                },
                {
                  text: 'OK', // Changed from default
                  onPress: () => {
                    clearCart();
                    setDiscount(0);
                    setDiscountCode('');
                    setAppliedDiscount(null);
                    navigation.goBack(); // Go back to previous screen
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  const removeItem = (id, name) => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove "${name}" from cart?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeFromCart(id)
        }
      ]
    );
  };

  const getFinalTotal = () => {
    const subtotal = getTotalPrice();
    const shipping = appliedDiscount?.type === 'fixed' && appliedDiscount?.value === 200 ? 0 : 200;
    return subtotal + shipping - discount;
  };

  const getShippingCost = () => {
    return appliedDiscount?.type === 'fixed' && appliedDiscount?.value === 200 ? 0 : 200;
  };

  return (
    <View style={styles.container}>
      <Header title="Shopping Cart" showBack={true} navigation={navigation} />
      
      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
          <Text style={styles.emptyCartText}>Add some beautiful items to get started!</Text>
          <Button
            title="Continue Shopping"
            onPress={() => navigation.navigate('Home')}
            style={styles.continueShoppingButton}
          />
        </View>
      ) : (
        <>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.cartHeader}>
              <Text style={styles.cartCount}>
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in cart
              </Text>
            </View>
            
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>Rs. {item.price}</Text>
                  
                  <View style={styles.quantitySection}>
                    <Text style={styles.quantityLabel}>Quantity:</Text>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  <Text style={styles.itemTotal}>
                    Item Total: Rs. {item.price * item.quantity}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeItem(item.id, item.name)}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}

            {/* Discount Code Section */}
            <View style={styles.discountSection}>
              <Text style={styles.discountLabel}>Enter Discount Code:</Text>
              <View style={styles.discountInputContainer}>
                <TextInput
                  style={styles.discountInput}
                  placeholder="Try: WELCOME10, SAVE20, ANY"
                  value={discountCode}
                  onChangeText={setDiscountCode}
                  placeholderTextColor="#999"
                />
                <TouchableOpacity style={styles.applyButton} onPress={applyDiscount}>
                  <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
              {discount > 0 && (
                <TouchableOpacity style={styles.removeDiscountButton} onPress={removeDiscount}>
                  <Text style={styles.removeDiscountText}>Remove Discount</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>

          {/* Footer with Summary */}
          <View style={styles.footer}>
            <View style={styles.summary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal:</Text>
                <Text style={styles.summaryValue}>Rs. {getTotalPrice().toFixed(2)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping:</Text>
                <Text style={styles.summaryValue}>
                  {getShippingCost() === 0 ? (
                    <Text style={styles.freeShipping}>FREE</Text>
                  ) : (
                    `Rs. ${getShippingCost().toFixed(2)}`
                  )}
                </Text>
              </View>
              
              {discount > 0 && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Discount:</Text>
                  <Text style={styles.discountValue}>- Rs. {discount.toFixed(2)}</Text>
                </View>
              )}
              
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>Rs. {getFinalTotal().toFixed(2)}</Text>
              </View>
            </View>
            
            <Button
              title={`Proceed to Checkout - Rs. ${getFinalTotal().toFixed(2)}`}
              onPress={handleCheckout}
              style={styles.checkoutButton}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f5f0'
  },
  scrollView: {
    flex: 1,
    padding: 15
  },
  cartHeader: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  cartCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  emptyCartTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10
  },
  emptyCartText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center'
  },
  continueShoppingButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 30
  },
  cartItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative'
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15
  },
  itemDetails: {
    flex: 1
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F4F4F',
    marginBottom: 5
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  quantityLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 10
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8
  },
  quantityButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0f0f0'
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  quantityText: {
    paddingHorizontal: 15,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333'
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginTop: 5
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    alignItems: 'center'
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  discountSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15
  },
  discountLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10
  },
  discountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  discountInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    fontSize: 14
  },
  applyButton: {
    backgroundColor: '#000000ff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
  removeDiscountButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#ff6b6b',
    borderRadius: 6
  },
  removeDiscountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  footer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  summary: {
    marginBottom: 20
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666'
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  freeShipping: {
    color: '#27ae60',
    fontWeight: 'bold'
  },
  discountValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6b6b'
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    marginTop: 8
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000'
  },
  checkoutButton: {
    backgroundColor: '#000000'
  }
});

export default CartScreen;