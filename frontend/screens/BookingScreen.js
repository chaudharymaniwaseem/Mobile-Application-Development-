import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';
import { styles } from '../styles';

const BookingScreen = () => {
  const navigation = useNavigation();
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    roomType: '',
    specialRequests: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [user] = useState({
    avatar: '👑'
  });

  const roomTypes = [
    { id: 'luxury ocean suite', name: 'Luxury Ocean Suite', price: 399 },
    { id: 'executive business room', name: 'Executive Business Room', price: 249 },
    { id: 'presidential suite', name: 'Presidential Suite', price: 899 },
    { id: 'family deluxe room', name: 'Family Deluxe Room', price: 189 },
  ];

  // ... (rest of the BookingScreen logic remains the same)
  // handleInputChange, validateForm, handleBooking functions

  return (
    <View style={styles.screen}>
      <CustomHeader user={user} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.screenHeader}>
            <View style={styles.screenTitleContainer}>
              <Text style={styles.screenTitle}>Book Your Stay</Text>
              <Text style={styles.screenSubtitle}>Complete your reservation</Text>
            </View>
          </View>

          {/* Form sections remain the same */}
          {/* ... */}

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default BookingScreen;