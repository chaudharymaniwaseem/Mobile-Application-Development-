import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Dimensions,
  Animated,
  Modal,
  ActivityIndicator,
  Switch,
  Image,
  RefreshControl
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Helper function for responsive sizing
const responsiveSize = (size) => {
  const scale = width / 375; // 375 is typical mobile width
  return Math.round(size * Math.min(scale, 1.8)); // Limit scaling for very large screens
};

// Enhanced Hotel Data with Premium Images
const hotelData = {
  rooms: [
    {
      id: 1,
      type: 'Luxury Ocean Suite',
      description: 'Spacious suite with panoramic ocean views, private balcony, and premium amenities',
      price: 399,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      features: ['King Bed', 'Ocean View', 'Jacuzzi', 'Mini Bar', 'Free WiFi', 'Private Balcony'],
      size: '55 m²',
      guests: 3,
      available: true
    },
    {
      id: 2,
      type: 'Executive Business Room',
      description: 'Elegant room perfect for business travelers with dedicated workspace',
      price: 249,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80',
      features: ['Queen Bed', 'Work Desk', 'City View', 'Coffee Maker', 'Express Check-in'],
      size: '35 m²',
      guests: 2,
      available: true
    },
    {
      id: 3,
      type: 'Presidential Suite',
      description: 'Ultimate luxury experience with private butler service and exclusive amenities',
      price: 899,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      features: ['Butler Service', 'Private Pool', 'Dining Area', 'Library', 'Personal Chef'],
      size: '120 m²',
      guests: 4,
      available: false
    },
    {
      id: 4,
      type: 'Family Deluxe Room',
      description: 'Perfect for families with connecting rooms and child-friendly amenities',
      price: 189,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      features: ['Double Beds', 'Family Area', 'Game Console', 'Baby Cot Available'],
      size: '45 m²',
      guests: 4,
      available: true
    }
  ],
  services: [
    {
      id: 'spa',
      name: 'Luxury Spa & Wellness',
      description: 'Premium massage therapies, sauna, and wellness treatments',
      price: 120,
      duration: '60-90 mins',
      icon: '💆‍♀️',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'wellness'
    },
    {
      id: 'dining',
      name: 'Fine Dining Experience',
      description: 'Gourmet restaurant with international cuisine and wine pairing',
      price: 85,
      duration: '2-3 hours',
      icon: '🍽️',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'dining'
    },
    {
      id: 'pool',
      name: 'Infinity Pool Access',
      description: 'Stunning rooftop pool with panoramic city views and bar service',
      price: 0,
      duration: 'All day',
      icon: '🏊‍♂️',
      image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'recreation'
    },
    {
      id: 'concierge',
      name: 'Premium Concierge',
      description: '24/7 personal concierge service for all your needs',
      price: 50,
      duration: '24/7',
      icon: '🎩',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      category: 'service'
    }
  ],
  menuItems: [
    {
      id: 'breakfast1',
      name: 'Continental Breakfast Platter',
      description: 'Fresh pastries, seasonal fruits, artisanal coffee, and fresh juice',
      price: 25,
      category: 'breakfast',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      popular: true
    },
    {
      id: 'lunch1',
      name: 'Grilled Atlantic Salmon',
      description: 'Fresh salmon with roasted vegetables and lemon herb rice',
      price: 32,
      category: 'lunch',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
      popular: true
    },
    {
      id: 'dinner1',
      name: 'Filet Mignon',
      description: 'Premium beef tenderloin with truffle mashed potatoes',
      price: 45,
      category: 'dinner',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      popular: false
    },
    {
      id: 'beverage1',
      name: 'Signature Cocktail',
      description: 'Our special mix with premium spirits and fresh ingredients',
      price: 15,
      category: 'beverages',
      image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      popular: true
    }
  ]
};

const LuxStayHotelApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
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
  const [selectedServices, setSelectedServices] = useState([]);
  const [foodOrder, setFoodOrder] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [user, setUser] = useState({
    name: 'Manahil',
    email: 'manahil@example.com',
    avatar: '👑',
    membership: 'Gold Member'
  });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeServiceTab, setActiveServiceTab] = useState('all');
  const scrollY = useRef(new Animated.Value(0)).current;

  // Enhanced animations
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [currentScreen]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  // Header with enhanced branding
  const Header = () => {
    const headerOpacity = scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0.9],
      extrapolate: 'clamp',
    });

    const menuItems = [
      { id: 'home', label: 'Home', icon: '🏰' },
      { id: 'booking', label: 'Book', icon: '📅' },
      { id: 'services', label: 'Services', icon: '⭐' },
      { id: 'billing', label: 'Billing', icon: '💳' },
      { id: 'admin', label: 'Admin', icon: '👑' },
    ];

    return (
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <Text style={styles.logoIcon}>🏨</Text>
            </View>
            <View>
              <Text style={styles.logo}>Royal Suites</Text>
              <Text style={styles.tagline}>Where Luxury Lives</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => setShowProfile(true)}
          >
            <Text style={styles.profileAvatar}>{user.avatar}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.nav}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.navItem,
                currentScreen === item.id && styles.navItemActive
              ]}
              onPress={() => setCurrentScreen(item.id)}
            >
              <Text style={styles.navIcon}>{item.icon}</Text>
              <Text style={[
                styles.navText,
                currentScreen === item.id && styles.navTextActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    );
  };

  // Enhanced Room Card with animations
  const RoomCard = ({ room, onBook, index }) => {
    const cardScale = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
      Animated.spring(cardScale, {
        toValue: 1,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    const handlePressIn = () => {
      Animated.spring(cardScale, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(cardScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={[styles.cardContainer, { transform: [{ scale: cardScale }] }]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => onBook(room)}
        >
          <ImageBackground
            source={{ uri: room.image }}
            style={styles.cardImage}
            imageStyle={styles.cardImageStyle}
          >
            <View style={styles.overlay}>
              <View style={styles.priceTag}>
                <Text style={styles.price}>${room.price}</Text>
                <Text style={styles.night}>/night</Text>
              </View>
              {!room.available && (
                <View style={styles.unavailableBadge}>
                  <Text style={styles.unavailableText}>Booked</Text>
                </View>
              )}
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>⭐ {room.rating}</Text>
              </View>
            </View>
          </ImageBackground>
          
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.roomType}>{room.type}</Text>
              <View style={styles.sizeBadge}>
                <Text style={styles.sizeText}>{room.size}</Text>
              </View>
            </View>
            
            <Text style={styles.roomDescription}>{room.description}</Text>
            
            <View style={styles.roomDetails}>
              <Text style={styles.detail}>👥 {room.guests} guests</Text>
              <Text style={styles.detail}>🛏️ {room.features[0]}</Text>
            </View>
            
            <View style={styles.features}>
              {room.features.slice(0, 3).map((feature, index) => (
                <Text key={index} style={styles.feature}>✓ {feature}</Text>
              ))}
            </View>
            
            <TouchableOpacity 
              style={[
                styles.bookButton,
                !room.available && styles.bookButtonDisabled
              ]}
              onPress={() => onBook(room)}
              disabled={!room.available}
            >
              <Text style={styles.bookButtonText}>
                {room.available ? 'Book Now' : 'Not Available'}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Search Component
  const SearchBar = ({ placeholder, onSearch }) => {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            onSearch(text);
          }}
        />
        <Text style={styles.searchIcon}>🔍</Text>
      </View>
    );
  };

  // Loading Component
  const LoadingSpinner = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#2b6cb0" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );

  // Profile Modal
  const ProfileModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showProfile}
      onRequestClose={() => setShowProfile(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.profileModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Your Profile</Text>
            <TouchableOpacity onPress={() => setShowProfile(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileAvatarLarge}>{user.avatar}</Text>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userMembership}>{user.membership}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>

          <View style={styles.settingsSection}>
            <Text style={styles.settingsTitle}>Preferences</Text>
            
            <View style={styles.settingItem}>
              <View>
                <Text style={styles.settingLabel}>Push Notifications</Text>
                <Text style={styles.settingDescription}>Receive booking updates and offers</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#cbd5e0', true: '#2b6cb0' }}
              />
            </View>

            <View style={styles.settingItem}>
              <View>
                <Text style={styles.settingLabel}>Email Notifications</Text>
                <Text style={styles.settingDescription}>Get updates via email</Text>
              </View>
              <Switch
                value={true}
                trackColor={{ false: '#cbd5e0', true: '#2b6cb0' }}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Home Screen with enhanced features
  const HomeScreen = () => {
    const [featuredRooms, setFeaturedRooms] = useState(hotelData.rooms);

    const handleBookRoom = (room) => {
      if (!room.available) {
        Alert.alert(
          'Room Not Available',
          'This room is currently booked. Please choose another room.',
          [{ text: 'OK' }]
        );
        return;
      }

      Alert.alert(
        'Room Selected',
        `You've selected the ${room.type}. Proceed to booking?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Continue', 
            onPress: () => {
              setBookingData(prev => ({ ...prev, roomType: room.type.toLowerCase() }));
              setCurrentScreen('booking');
            }
          }
        ]
      );
    };

    const handleSearch = (query) => {
      if (query === '') {
        setFeaturedRooms(hotelData.rooms);
      } else {
        const filtered = hotelData.rooms.filter(room =>
          room.type.toLowerCase().includes(query.toLowerCase()) ||
          room.description.toLowerCase().includes(query.toLowerCase()) ||
          room.features.some(feature => feature.toLowerCase().includes(query.toLowerCase()))
        );
        setFeaturedRooms(filtered);
      }
    };

    return (
      <Animated.View style={[styles.screen, { opacity: fadeAnim }]}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#2b6cb0']}
            />
          }
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
        >
          {/* Enhanced Hero Section */}
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' }}
            style={styles.heroSection}
            imageStyle={styles.heroImage}
          >
            <View style={styles.heroOverlay}>
              <Text style={styles.welcomeText}>Welcome back, {user.name}! 👋</Text>
              <Text style={styles.heroTitle}>Royal Suites</Text>
              <Text style={styles.heroSubtitle}>Experience Unmatched Luxury & Comfort</Text>
              <TouchableOpacity 
                style={styles.ctaButton}
                onPress={() => setCurrentScreen('booking')}
              >
                <Text style={styles.ctaText}>Book Your Stay</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>

          {/* Quick Stats */}
          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Guest Rating</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>78%</Text>
              <Text style={styles.statLabel}>Occupancy</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Service</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>120+</Text>
              <Text style={styles.statLabel}>Rooms</Text>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.section}>
            <SearchBar 
              placeholder="Search rooms, amenities..."
              onSearch={handleSearch}
            />
          </View>

          {/* Featured Rooms */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Rooms</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            {featuredRooms.map((room, index) => (
              <RoomCard
                key={room.id}
                room={room}
                onBook={handleBookRoom}
                index={index}
              />
            ))}
          </View>

          {/* Special Offers Carousel */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Special Offers</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.offersCarousel}
            >
              <View style={styles.offerCard}>
                <View style={styles.offerBadge}>
                  <Text style={styles.offerBadgeText}>25% OFF</Text>
                </View>
                <Text style={styles.offerTitle}>Weekend Getaway</Text>
                <Text style={styles.offerDesc}>Book 2 nights, get the 3rd night free!</Text>
                <Text style={styles.offerCode}>Code: WEEKEND25</Text>
              </View>
              
              <View style={styles.offerCard}>
                <View style={[styles.offerBadge, styles.offerBadgePremium]}>
                  <Text style={styles.offerBadgeText}>PREMIUM</Text>
                </View>
                <Text style={styles.offerTitle}>Luxury Package</Text>
                <Text style={styles.offerDesc}>Free spa treatment with suite booking</Text>
                <Text style={styles.offerCode}>Code: LUXURYSPA</Text>
              </View>
            </ScrollView>
          </View>

          {/* Hotel Features */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Why Choose Royal Suites?</Text>
            <View style={styles.featuresGrid}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>⭐</Text>
                <Text style={styles.featureTitle}>5-Star Service</Text>
                <Text style={styles.featureDesc}>Exceptional hospitality</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🏊</Text>
                <Text style={styles.featureTitle}>Premium Amenities</Text>
                <Text style={styles.featureDesc}>Pool, spa & more</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>📍</Text>
                <Text style={styles.featureTitle}>Prime Location</Text>
                <Text style={styles.featureDesc}>City center access</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🛎️</Text>
                <Text style={styles.featureTitle}>24/7 Support</Text>
                <Text style={styles.featureDesc}>Always here to help</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        
        {/* Floating Action Button */}
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => setCurrentScreen('booking')}
        >
          <Text style={styles.fabIcon}>🏨</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Booking Screen with enhanced form and fixed keyboard
  // Booking Screen with enhanced form and fixed keyboard
const BookingScreen = () => {
  const roomTypes = [
    { id: 'luxury ocean suite', name: 'Luxury Ocean Suite', price: 399 },
    { id: 'executive business room', name: 'Executive Business Room', price: 249 },
    { id: 'presidential suite', name: 'Presidential Suite', price: 899 },
    { id: 'family deluxe room', name: 'Family Deluxe Room', price: 189 },
  ];

  const handleInputChange = (field, value) => {
    // Apply validation based on field type
    let validatedValue = value;
    
    switch(field) {
      case 'firstName':
      case 'lastName':
        // Only allow letters, spaces, and hyphens for names
        validatedValue = value.replace(/[^a-zA-Z\s\-]/g, '');
        break;
      case 'email':
        // Allow email format characters
        validatedValue = value;
        break;
      case 'phone':
        // Only allow numbers, spaces, parentheses, and hyphens
        validatedValue = value.replace(/[^\d\s\(\)\-+]/g, '');
        break;
      case 'checkIn':
      case 'checkOut':
        // Only allow date format (YYYY-MM-DD)
        validatedValue = value.replace(/[^\d\-]/g, '');
        // Auto-format date
        if (value.length === 4 && !value.includes('-')) {
          validatedValue = value + '-';
        } else if (value.length === 7 && value.split('-').length === 2) {
          validatedValue = value + '-';
        }
        break;
      default:
        validatedValue = value;
    }
    
    setBookingData(prev => ({
      ...prev,
      [field]: validatedValue
    }));
  };

  const validateForm = () => {
    // Name validation (only letters, min 2 characters)
    const nameRegex = /^[a-zA-Z\s\-]{2,}$/;
    if (!nameRegex.test(bookingData.firstName)) {
      Alert.alert('Invalid First Name', 'Please enter a valid first name (letters only, minimum 2 characters).');
      return false;
    }
    if (!nameRegex.test(bookingData.lastName)) {
      Alert.alert('Invalid Last Name', 'Please enter a valid last name (letters only, minimum 2 characters).');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingData.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address (e.g., example@email.com).');
      return false;
    }

    // Phone validation (at least 10 digits)
    const phoneDigits = bookingData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number with at least 10 digits.');
      return false;
    }

    // Date validation (YYYY-MM-DD format)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(bookingData.checkIn)) {
      Alert.alert('Invalid Check-in Date', 'Please enter check-in date in YYYY-MM-DD format.');
      return false;
    }
    if (!dateRegex.test(bookingData.checkOut)) {
      Alert.alert('Invalid Check-out Date', 'Please enter check-out date in YYYY-MM-DD format.');
      return false;
    }

    // Check if check-out is after check-in
    const checkInDate = new Date(bookingData.checkIn);
    const checkOutDate = new Date(bookingData.checkOut);
    if (checkOutDate <= checkInDate) {
      Alert.alert('Invalid Dates', 'Check-out date must be after check-in date.');
      return false;
    }

    if (!bookingData.roomType) {
      Alert.alert('Missing Information', 'Please select a room type.');
      return false;
    }

    return true;
  };

  const handleBooking = () => {
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      const selectedRoom = roomTypes.find(room => room.id === bookingData.roomType);
      
      // Calculate stay duration
      const checkInDate = new Date(bookingData.checkIn);
      const checkOutDate = new Date(bookingData.checkOut);
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      const stayDuration = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      Alert.alert(
        'Booking Confirmed! 🎉',
        `Dear ${bookingData.firstName},\n\nYour ${selectedRoom.name} has been booked successfully!\n\n📅 Check-in: ${bookingData.checkIn}\n📅 Check-out: ${bookingData.checkOut}\n⏱️ Duration: ${stayDuration} nights\n👥 Guests: ${bookingData.guests}\n💰 Total: $${selectedRoom.price * stayDuration}\n\nBooking ID: RS${Date.now()}`,
        [
          {
            text: 'View Services',
            onPress: () => setCurrentScreen('services')
          },
          {
            text: 'Done',
            style: 'default'
          }
        ]
      );
    }, 2000);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Animated.View style={[styles.screen, { opacity: fadeAnim }]}>
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

          {/* Personal Information */}
          // Personal Information
// Personal Information
<View style={styles.formSection}>
  <Text style={styles.sectionTitle}>Personal Information</Text>
  
  <View style={styles.nameRow}>
    <View style={styles.halfInput}>
      <Text style={styles.formLabel}>First Name *</Text>
      <TextInput
        style={styles.textInput}
        placeholder="John"
        value={bookingData.firstName}
        onChangeText={(text) => handleInputChange('firstName', text)}
        returnKeyType="next"
        maxLength={50}
        blurOnSubmit={false}
        onSubmitEditing={() => {}}
        onEndEditing={() => {}}
      />
    </View>
    <View style={styles.halfInput}>
      <Text style={styles.formLabel}>Last Name *</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Doe"
        value={bookingData.lastName}
        onChangeText={(text) => handleInputChange('lastName', text)}
        returnKeyType="next"
        maxLength={50}
        blurOnSubmit={false}
        onSubmitEditing={() => {}}
        onEndEditing={() => {}}
      />
    </View>
  </View>

  <Text style={styles.formLabel}>Email Address *</Text>
  <TextInput
    style={styles.textInput}
    placeholder="john.doe@example.com"
    value={bookingData.email}
    onChangeText={(text) => handleInputChange('email', text)}
    keyboardType="email-address"
    autoCapitalize="none"
    autoComplete="email"
    returnKeyType="next"
    maxLength={100}
    blurOnSubmit={false}
    onSubmitEditing={() => {}}
    onEndEditing={() => {}}
  />

  <Text style={styles.formLabel}>Phone Number *</Text>
  <TextInput
    style={styles.textInput}
    placeholder="+1 (555) 123-4567"
    value={bookingData.phone}
    onChangeText={(text) => handleInputChange('phone', text)}
    keyboardType="phone-pad"
    returnKeyType="next"
    maxLength={20}
    blurOnSubmit={false}
    onSubmitEditing={() => {}}
    onEndEditing={() => {}}
  />
</View>

// Booking Details
<View style={styles.formSection}>
  <Text style={styles.sectionTitle}>Booking Details</Text>

  <View style={styles.dateRow}>
    <View style={styles.halfInput}>
      <Text style={styles.formLabel}>Check-in Date *</Text>
      <TextInput
        style={styles.textInput}
        placeholder="YYYY-MM-DD"
        value={bookingData.checkIn}
        onChangeText={(text) => handleInputChange('checkIn', text)}
        keyboardType="numbers-and-punctuation"
        returnKeyType="next"
        maxLength={10}
        blurOnSubmit={false}
        onSubmitEditing={() => {}}
        onEndEditing={() => {}}
      />
    </View>
    <View style={styles.halfInput}>
      <Text style={styles.formLabel}>Check-out Date *</Text>
      <TextInput
        style={styles.textInput}
        placeholder="YYYY-MM-DD"
        value={bookingData.checkOut}
        onChangeText={(text) => handleInputChange('checkOut', text)}
        keyboardType="numbers-and-punctuation"
        returnKeyType="next"
        maxLength={10}
        blurOnSubmit={false}
        onSubmitEditing={() => {}}
        onEndEditing={() => {}}
      />
    </View>
  </View>

  {/* ... rest of the booking details ... */}

  <Text style={styles.formLabel}>Special Requests</Text>
  <TextInput
    style={[styles.textInput, styles.textArea]}
    placeholder="Any special requirements, preferences, or accessibility needs..."
    value={bookingData.specialRequests}
    onChangeText={(text) => handleInputChange('specialRequests', text)}
    multiline
    numberOfLines={4}
    textAlignVertical="top"
    returnKeyType="default"
    maxLength={500}
    blurOnSubmit={false}
    onSubmitEditing={() => {}}
    onEndEditing={() => {}}
  />
</View>
          {/* Booking Summary */}
          {bookingData.roomType && (
            <View style={styles.summarySection}>
              <Text style={styles.sectionTitle}>Booking Summary</Text>
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Room Type:</Text>
                  <Text style={styles.summaryValue}>
                    {roomTypes.find(r => r.id === bookingData.roomType)?.name}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Duration:</Text>
                  <Text style={styles.summaryValue}>
                    {bookingData.checkIn} to {bookingData.checkOut}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Guests:</Text>
                  <Text style={styles.summaryValue}>{bookingData.guests}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryTotal}>Total Estimate:</Text>
                  <Text style={styles.summaryTotal}>
                    ${roomTypes.find(r => r.id === bookingData.roomType)?.price * 3}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Book Button */}
          <TouchableOpacity 
            style={[
              styles.primaryButton,
              styles.bookButtonLarge,
              (!bookingData.checkIn || !bookingData.checkOut || !bookingData.roomType || 
               !bookingData.firstName || !bookingData.email || !bookingData.phone) && 
              styles.buttonDisabled
            ]}
            onPress={handleBooking}
            disabled={!bookingData.checkIn || !bookingData.checkOut || !bookingData.roomType || 
                     !bookingData.firstName || !bookingData.email || !bookingData.phone}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? 'Processing...' : 'Confirm Booking'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

  // Services Screen with enhanced features
  const ServicesScreen = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
      { id: 'all', name: 'All Services' },
      { id: 'wellness', name: 'Wellness' },
      { id: 'dining', name: 'Dining' },
      { id: 'recreation', name: 'Recreation' },
      { id: 'service', name: 'Services' }
    ];

    const filteredServices = activeCategory === 'all' 
      ? hotelData.services 
      : hotelData.services.filter(service => service.category === activeCategory);

    const toggleService = (service) => {
      setSelectedServices(prev => {
        const exists = prev.find(s => s.id === service.id);
        if (exists) {
          return prev.filter(s => s.id !== service.id);
        } else {
          return [...prev, service];
        }
      });
    };

    const addToOrder = (item) => {
      setFoodOrder(prev => {
        const existingItem = prev.find(i => i.id === item.id);
        if (existingItem) {
          return prev.map(i => 
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          return [...prev, { ...item, quantity: 1 }];
        }
      });
      
      // Show toast-like message
      Alert.alert('Added to Order', `${item.name} has been added to your order.`);
    };

    const removeFromOrder = (itemId) => {
      setFoodOrder(prev => prev.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, newQuantity) => {
      if (newQuantity === 0) {
        removeFromOrder(itemId);
      } else {
        setFoodOrder(prev => prev.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        ));
      }
    };

    const calculateTotal = (items) => {
      return items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    };

    const handleServiceBooking = () => {
      if (selectedServices.length === 0) {
        Alert.alert('No Services Selected', 'Please select at least one service to book.');
        return;
      }

      const total = calculateTotal(selectedServices);
      Alert.alert(
        'Services Booked! 🎉',
        `You've successfully booked ${selectedServices.length} service(s).\nTotal: $${total}\n\nOur team will contact you to schedule your services.`,
        [{ text: 'Great!' }]
      );
      setSelectedServices([]);
    };

    const handleFoodOrder = () => {
      if (foodOrder.length === 0) {
        Alert.alert('Empty Order', 'Please add items to your food order.');
        return;
      }

      const total = calculateTotal(foodOrder);
      setLoading(true);
      
      setTimeout(() => {
        setLoading(false);
        Alert.alert(
          'Order Placed! 🍽️',
          `Your food order has been placed!\nTotal: $${total}\nEstimated delivery: 25-35 minutes`,
          [{ text: 'OK' }]
        );
        setFoodOrder([]);
      }, 1500);
    };

    return (
      <Animated.View style={[styles.screen, { opacity: fadeAnim }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.screenHeader}>
            <View style={styles.screenTitleContainer}>
              <Text style={styles.screenTitle}>Hotel Services</Text>
              <Text style={styles.screenSubtitle}>Enhance your stay with our premium services</Text>
            </View>
          </View>

          {/* Service Categories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  activeCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setActiveCategory(category.id)}
              >
                <Text style={[
                  styles.categoryText,
                  activeCategory === category.id && styles.categoryTextActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Hotel Services */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Premium Services</Text>
            {filteredServices.map(service => (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.serviceCard,
                  selectedServices.find(s => s.id === service.id) && styles.serviceCardSelected
                ]}
                onPress={() => toggleService(service)}
              >
                <ImageBackground
                  source={{ uri: service.image }}
                  style={styles.serviceImage}
                  imageStyle={styles.serviceImageStyle}
                >
                  <View style={styles.serviceOverlay}>
                    <Text style={styles.serviceIcon}>{service.icon}</Text>
                    <Text style={styles.serviceNameOverlay}>{service.name}</Text>
                  </View>
                </ImageBackground>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                  <View style={styles.serviceDetails}>
                    <Text style={styles.serviceDuration}>{service.duration}</Text>
                    <Text style={styles.servicePrice}>
                      {service.price > 0 ? `$${service.price}` : 'Complimentary'}
                    </Text>
                  </View>
                  <Text style={styles.serviceSelection}>
                    {selectedServices.find(s => s.id === service.id) ? '✓ Selected' : 'Tap to select'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Food Ordering */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Room Service Menu</Text>
              {foodOrder.length > 0 && (
                <TouchableOpacity onPress={() => setFoodOrder([])}>
                  <Text style={styles.clearText}>Clear All</Text>
                </TouchableOpacity>
              )}
            </View>
            
            {hotelData.menuItems.map(item => (
              <View key={item.id} style={styles.menuItem}>
                <ImageBackground
                  source={{ uri: item.image }}
                  style={styles.menuImage}
                  imageStyle={styles.menuImageStyle}
                >
                  {item.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>Popular</Text>
                    </View>
                  )}
                </ImageBackground>
                <View style={styles.menuInfo}>
                  <Text style={styles.menuName}>{item.name}</Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                  <Text style={styles.menuPrice}>${item.price}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => addToOrder(item)}
                >
                  <Text style={styles.addButtonText}>+ Add</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Current Order Summary */}
          {foodOrder.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Order</Text>
              <View style={styles.orderSummary}>
                {foodOrder.map(item => (
                  <View key={item.id} style={styles.orderItem}>
                    <View style={styles.orderItemInfo}>
                      <Text style={styles.orderItemName}>{item.name}</Text>
                      <Text style={styles.orderItemPrice}>${item.price} x {item.quantity}</Text>
                    </View>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Text style={styles.quantityText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityDisplay}>{item.quantity}</Text>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Text style={styles.quantityText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
                <View style={styles.orderTotal}>
                  <Text style={styles.orderTotalText}>Order Total: ${calculateTotal(foodOrder)}</Text>
                </View>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            {selectedServices.length > 0 && (
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={handleServiceBooking}
              >
                <Text style={styles.primaryButtonText}>
                  Book Services (${calculateTotal(selectedServices)})
                </Text>
              </TouchableOpacity>
            )}
            
            {foodOrder.length > 0 && (
              <TouchableOpacity 
                style={[
                  styles.primaryButton,
                  styles.secondaryButton,
                  loading && styles.buttonDisabled
                ]}
                onPress={handleFoodOrder}
                disabled={loading}
              >
                <Text style={styles.primaryButtonText}>
                  {loading ? 'Placing Order...' : `Order Food ($${calculateTotal(foodOrder)})`}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </Animated.View>
    );
  };

  // Billing Screen with enhanced payment options
  const BillingScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [cardDetails, setCardDetails] = useState({
      number: '',
      expiry: '',
      cvv: '',
      name: ''
    });
    
    const billingItems = [
      { description: 'Luxury Ocean Suite (3 nights)', amount: 1197 },
      { description: 'Luxury Spa Service', amount: 120 },
      { description: 'Fine Dining Experience', amount: 85 },
      { description: 'Premium Concierge Service', amount: 50 },
      { description: 'Taxes and Fees', amount: 140 }
    ];

    const subtotal = billingItems.reduce((sum, item) => sum + item.amount, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const paymentMethods = [
      { id: 'credit', name: 'Credit Card', icon: '💳' },
      { id: 'debit', name: 'Debit Card', icon: '💳' },
      { id: 'paypal', name: 'PayPal', icon: '📱' },
      { id: 'jazzcash', name: 'JazzCash', icon: '💰' }
    ];

    const handlePayment = () => {
      if (paymentMethod === 'credit' || paymentMethod === 'debit') {
        if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
          Alert.alert('Missing Information', 'Please fill in all card details.');
          return;
        }
      }

      setLoading(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setLoading(false);
        Alert.alert(
          'Payment Successful! 💳',
          `Thank you for your payment of $${total.toFixed(2)}.\n\nTransaction ID: TX${Date.now()}\nYour receipt has been emailed to you.`,
          [
            {
              text: 'View Booking',
              onPress: () => setCurrentScreen('home')
            },
            {
              text: 'Done',
              style: 'default'
            }
          ]
        );
      }, 3000);
    };

    if (loading) return <LoadingSpinner />;

    return (
      <Animated.View style={[styles.screen, { opacity: fadeAnim }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.screenHeader}>
            <View style={styles.screenTitleContainer}>
              <Text style={styles.screenTitle}>Billing & Payment</Text>
              <Text style={styles.screenSubtitle}>Review and complete your payment</Text>
            </View>
          </View>

          {/* Invoice Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Invoice Summary</Text>
            <View style={styles.invoiceCard}>
              {billingItems.map((item, index) => (
                <View key={index} style={styles.invoiceRow}>
                  <Text style={styles.invoiceDescription}>{item.description}</Text>
                  <Text style={styles.invoiceAmount}>${item.amount}</Text>
                </View>
              ))}
              <View style={styles.divider} />
              <View style={styles.invoiceRow}>
                <Text style={styles.invoiceSubtotal}>Subtotal</Text>
                <Text style={styles.invoiceSubtotal}>${subtotal}</Text>
              </View>
              <View style={styles.invoiceRow}>
                <Text style={styles.invoiceTax}>Tax (10%)</Text>
                <Text style={styles.invoiceTax}>${tax.toFixed(2)}</Text>
              </View>
              <View style={styles.invoiceTotalRow}>
                <Text style={styles.invoiceTotal}>Total Amount</Text>
                <Text style={styles.invoiceTotal}>${total.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          {/* Payment Method */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <View style={styles.paymentMethods}>
              {paymentMethods.map(method => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentMethod,
                    paymentMethod === method.id && styles.paymentMethodSelected
                  ]}
                  onPress={() => setPaymentMethod(method.id)}
                >
                  <Text style={styles.paymentIcon}>{method.icon}</Text>
                  <Text style={styles.paymentMethodText}>{method.name}</Text>
                  {paymentMethod === method.id && (
                    <Text style={styles.selectedCheck}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Payment Form */}
          {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Card Details</Text>
              
              <Text style={styles.formLabel}>Card Number</Text>
              <View style={styles.cardInputContainer}>
                <TextInput
                  style={styles.cardInput}
                  placeholder="1234 5678 9012 3456"
                  keyboardType="numeric"
                  value={cardDetails.number}
                  onChangeText={(text) => setCardDetails(prev => ({ ...prev, number: text }))}
                  maxLength={19}
                  returnKeyType="next"
                />
                <Text style={styles.cardIcon}>💳</Text>
              </View>

              <View style={styles.row}>
                <View style={styles.halfInput}>
                  <Text style={styles.formLabel}>Expiry Date</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChangeText={(text) => setCardDetails(prev => ({ ...prev, expiry: text }))}
                    returnKeyType="next"
                  />
                </View>
                <View style={styles.halfInput}>
                  <Text style={styles.formLabel}>CVV</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="123"
                    keyboardType="numeric"
                    value={cardDetails.cvv}
                    onChangeText={(text) => setCardDetails(prev => ({ ...prev, cvv: text }))}
                    maxLength={3}
                    returnKeyType="next"
                  />
                </View>
              </View>

              <Text style={styles.formLabel}>Cardholder Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="John Doe"
                value={cardDetails.name}
                onChangeText={(text) => setCardDetails(prev => ({ ...prev, name: text }))}
                returnKeyType="done"
              />
            </View>
          )}

          {/* Security Notice */}
          <View style={styles.securitySection}>
            <Text style={styles.securityIcon}>🔒</Text>
            <Text style={styles.securityText}>
              Your payment information is secure and encrypted. We do not store your card details.
            </Text>
          </View>

          {/* Payment Button */}
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handlePayment}
          >
            <Text style={styles.primaryButtonText}>
              Pay ${total.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    );
  };

  // Admin Dashboard with enhanced analytics
  const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    
    const stats = {
      occupancy: '78%',
      revenue: '$24,580',
      bookings: '42',
      rating: '4.8',
      guests: '156',
      services: '89'
    };

    const recentBookings = [
      { 
        id: 'BK001', 
        room: 'Luxury Ocean Suite', 
        guest: 'John Smith', 
        status: 'Checked In',
        checkIn: '2024-03-15',
        checkOut: '2024-03-18',
        amount: '$1,197'
      },
      { 
        id: 'BK002', 
        room: 'Executive Business Room', 
        guest: 'Sarah Johnson', 
        status: 'Confirmed',
        checkIn: '2024-03-16',
        checkOut: '2024-03-19',
        amount: '$747'
      },
      { 
        id: 'BK003', 
        room: 'Family Deluxe Room', 
        guest: 'Michael Brown', 
        status: 'Pending',
        checkIn: '2024-03-20',
        checkOut: '2024-03-22',
        amount: '$378'
      }
    ];

    const revenueData = [
      { month: 'Jan', revenue: 18000 },
      { month: 'Feb', revenue: 22000 },
      { month: 'Mar', revenue: 24580 },
      { month: 'Apr', revenue: 21000 },
    ];

    return (
      <Animated.View style={[styles.screen, { opacity: fadeAnim }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.screenHeader}>
            <View>
              <Text style={styles.screenTitle}>Admin Dashboard</Text>
              <Text style={styles.screenSubtitle}>Hotel Management Overview</Text>
            </View>
            <Text style={styles.adminBadge}>Administrator</Text>
          </View>

          {/* Stats Overview */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statCardIcon}>🏨</Text>
              <Text style={styles.statCardNumber}>{stats.occupancy}</Text>
              <Text style={styles.statCardLabel}>Occupancy Rate</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statCardIcon}>💰</Text>
              <Text style={styles.statCardNumber}>{stats.revenue}</Text>
              <Text style={styles.statCardLabel}>Revenue</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statCardIcon}>📅</Text>
              <Text style={styles.statCardNumber}>{stats.bookings}</Text>
              <Text style={styles.statCardLabel}>Active Bookings</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statCardIcon}>⭐</Text>
              <Text style={styles.statCardNumber}>{stats.rating}</Text>
              <Text style={styles.statCardLabel}>Guest Rating</Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            {['overview', 'bookings', 'revenue', 'guests', 'services'].map(tab => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  activeTab === tab && styles.tabActive
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive
                ]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recent Bookings */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Bookings</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            {recentBookings.map(booking => (
              <View key={booking.id} style={styles.bookingRow}>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingId}>{booking.id}</Text>
                  <Text style={styles.bookingDetails}>{booking.room}</Text>
                  <Text style={styles.bookingGuest}>{booking.guest}</Text>
                  <Text style={styles.bookingDates}>{booking.checkIn} → {booking.checkOut}</Text>
                </View>
                <View style={styles.bookingRight}>
                  <Text style={styles.bookingAmount}>{booking.amount}</Text>
                  <View style={[
                    styles.statusBadge,
                    booking.status === 'Checked In' && styles.statusSuccess,
                    booking.status === 'Confirmed' && styles.statusInfo,
                    booking.status === 'Pending' && styles.statusWarning
                  ]}>
                    <Text style={styles.statusText}>{booking.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Revenue Chart (Simplified) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Revenue Overview</Text>
            <View style={styles.revenueCard}>
              <View style={styles.revenueBars}>
                {revenueData.map((item, index) => (
                  <View key={index} style={styles.revenueBarContainer}>
                    <View style={styles.revenueBarWrapper}>
                      <View 
                        style={[
                          styles.revenueBar,
                          { height: (item.revenue / 25000) * 100 }
                        ]}
                      />
                    </View>
                    <Text style={styles.revenueMonth}>{item.month}</Text>
                    <Text style={styles.revenueAmount}>${(item.revenue / 1000).toFixed(0)}k</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>📊</Text>
                <Text style={styles.actionText}>Reports</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>👥</Text>
                <Text style={styles.actionText}>Guests</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>🛎️</Text>
                <Text style={styles.actionText}>Services</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>⚙️</Text>
                <Text style={styles.actionText}>Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    );
  };

  // Main Render
  const renderScreen = () => {
    if (loading) return <LoadingSpinner />;

    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'booking':
        return <BookingScreen />;
      case 'services':
        return <ServicesScreen />;
      case 'billing':
        return <BillingScreen />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a365d" />
      <Header />
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <ProfileModal />
    </SafeAreaView>
  );
};

// Enhanced Styles with Professional Design System - RESPONSIVE SIZING
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },

  // Enhanced Header Styles
  header: {
    backgroundColor: '#1a365d',
    paddingVertical: responsiveSize(8),
    paddingHorizontal: responsiveSize(12),
    borderBottomLeftRadius: responsiveSize(15),
    borderBottomRightRadius: responsiveSize(15),
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveSize(8),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrapper: {
    backgroundColor: '#2b6cb0',
    padding: responsiveSize(6),
    borderRadius: responsiveSize(10),
    marginRight: responsiveSize(8),
  },
  logoIcon: {
    fontSize: responsiveSize(18),
  },
  logo: {
    fontSize: responsiveSize(20),
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: responsiveSize(10),
    color: '#cbd5e0',
    fontStyle: 'italic',
  },
  profileButton: {
    padding: responsiveSize(6),
  },
  profileAvatar: {
    fontSize: responsiveSize(20),
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: responsiveSize(6),
    paddingHorizontal: responsiveSize(8),
    borderRadius: responsiveSize(10),
    minWidth: responsiveSize(50),
  },
  navItemActive: {
    backgroundColor: '#2d3748',
  },
  navIcon: {
    fontSize: responsiveSize(16),
    marginBottom: responsiveSize(2),
  },
  navText: {
    fontSize: responsiveSize(10),
    color: '#e2e8f0',
    fontWeight: '500',
  },
  navTextActive: {
    color: '#63b3ed',
    fontWeight: 'bold',
  },

  // Screen Headers
  screenHeader: {
    padding: responsiveSize(15),
    backgroundColor: '#ffffff',
    marginBottom: responsiveSize(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  screenTitleContainer: {
    flex: 1,
  },
  screenTitle: {
    fontSize: responsiveSize(22),
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: responsiveSize(4),
  },
  screenSubtitle: {
    fontSize: responsiveSize(14),
    color: '#718096',
    lineHeight: responsiveSize(18),
  },
  adminBadge: {
    backgroundColor: '#ed8936',
    color: '#ffffff',
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(4),
    borderRadius: responsiveSize(10),
    fontSize: responsiveSize(10),
    fontWeight: 'bold',
  },

  // Hero Section
  heroSection: {
    height: responsiveSize(250),
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    borderBottomLeftRadius: responsiveSize(20),
    borderBottomRightRadius: responsiveSize(20),
  },
  heroOverlay: {
    backgroundColor: 'rgba(26, 54, 93, 0.85)',
    padding: responsiveSize(18),
    borderRadius: responsiveSize(15),
    alignItems: 'center',
    width: '90%',
  },
  welcomeText: {
    fontSize: responsiveSize(14),
    color: '#e2e8f0',
    marginBottom: responsiveSize(6),
  },
  heroTitle: {
    fontSize: responsiveSize(26),
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: responsiveSize(6),
  },
  heroSubtitle: {
    fontSize: responsiveSize(14),
    color: '#e2e8f0',
    textAlign: 'center',
    marginBottom: responsiveSize(15),
  },
  ctaButton: {
    backgroundColor: '#ed8936',
    paddingHorizontal: responsiveSize(25),
    paddingVertical: responsiveSize(10),
    borderRadius: responsiveSize(20),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  ctaText: {
    color: '#ffffff',
    fontSize: responsiveSize(14),
    fontWeight: 'bold',
  },

  // Stats Section
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: responsiveSize(15),
    backgroundColor: '#ffffff',
    margin: responsiveSize(12),
    borderRadius: responsiveSize(12),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: responsiveSize(20),
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginBottom: responsiveSize(2),
  },
  statLabel: {
    fontSize: responsiveSize(10),
    color: '#718096',
    fontWeight: '500',
  },

  // Search Bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: responsiveSize(12),
    marginVertical: responsiveSize(6),
    paddingHorizontal: responsiveSize(12),
    borderRadius: responsiveSize(10),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    paddingVertical: responsiveSize(12),
    fontSize: responsiveSize(14),
    color: '#2d3748',
  },
  searchIcon: {
    fontSize: responsiveSize(16),
    color: '#94a3b8',
  },

  // Section Styles
  section: {
    marginVertical: responsiveSize(6),
    paddingHorizontal: responsiveSize(12),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveSize(12),
  },
  sectionTitle: {
    fontSize: responsiveSize(18),
    fontWeight: 'bold',
    color: '#2d3748',
  },
  seeAllText: {
    color: '#2b6cb0',
    fontSize: responsiveSize(12),
    fontWeight: '600',
  },
  clearText: {
    color: '#e53e3e',
    fontSize: responsiveSize(12),
    fontWeight: '600',
  },

  // Enhanced Card Styles
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: responsiveSize(12),
    marginVertical: responsiveSize(6),
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  cardImage: {
    height: responsiveSize(160),
    width: '100%',
  },
  cardImageStyle: {
    borderTopLeftRadius: responsiveSize(12),
    borderTopRightRadius: responsiveSize(12),
  },
  overlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: responsiveSize(10),
  },
  priceTag: {
    backgroundColor: 'rgba(26, 54, 93, 0.9)',
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(4),
    borderRadius: responsiveSize(15),
    alignItems: 'center',
  },
  price: {
    color: '#ffffff',
    fontSize: responsiveSize(16),
    fontWeight: 'bold',
  },
  night: {
    color: '#cbd5e0',
    fontSize: responsiveSize(8),
  },
  unavailableBadge: {
    backgroundColor: 'rgba(229, 62, 62, 0.9)',
    paddingHorizontal: responsiveSize(6),
    paddingVertical: responsiveSize(3),
    borderRadius: responsiveSize(8),
  },
  unavailableText: {
    color: '#ffffff',
    fontSize: responsiveSize(8),
    fontWeight: 'bold',
  },
  ratingBadge: {
    backgroundColor: 'rgba(237, 137, 54, 0.9)',
    paddingHorizontal: responsiveSize(6),
    paddingVertical: responsiveSize(3),
    borderRadius: responsiveSize(8),
  },
  ratingText: {
    color: '#ffffff',
    fontSize: responsiveSize(10),
    fontWeight: 'bold',
  },
  cardContent: {
    padding: responsiveSize(12),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: responsiveSize(6),
  },
  roomType: {
    fontSize: responsiveSize(16),
    fontWeight: 'bold',
    color: '#2d3748',
    flex: 1,
    marginRight: responsiveSize(8),
  },
  sizeBadge: {
    backgroundColor: '#f7fafc',
    paddingHorizontal: responsiveSize(6),
    paddingVertical: responsiveSize(3),
    borderRadius: responsiveSize(6),
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sizeText: {
    fontSize: responsiveSize(10),
    color: '#4a5568',
    fontWeight: '500',
  },
  roomDescription: {
    fontSize: responsiveSize(12),
    color: '#718096',
    marginBottom: responsiveSize(8),
    lineHeight: responsiveSize(16),
  },
  roomDetails: {
    flexDirection: 'row',
    marginBottom: responsiveSize(8),
  },
  detail: {
    fontSize: responsiveSize(10),
    color: '#4a5568',
    marginRight: responsiveSize(12),
    fontWeight: '500',
  },
  features: {
    marginBottom: responsiveSize(12),
  },
  feature: {
    fontSize: responsiveSize(11),
    color: '#4a5568',
    marginBottom: responsiveSize(2),
  },
  bookButton: {
    backgroundColor: '#2b6cb0',
    padding: responsiveSize(12),
    borderRadius: responsiveSize(10),
    alignItems: 'center',
    elevation: 2,
  },
  bookButtonDisabled: {
    backgroundColor: '#a0aec0',
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: responsiveSize(12),
    fontWeight: 'bold',
  },

  // Offers Carousel - FIXED SIZES
  offersCarousel: {
    marginVertical: responsiveSize(6),
  },
  offerCard: {
    backgroundColor: '#ffffff',
    padding: responsiveSize(15),
    borderRadius: responsiveSize(12),
    marginRight: responsiveSize(12),
    width: width < 768 ? width * 0.75 : width * 0.6,
    minHeight: width < 768 ? responsiveSize(120) : responsiveSize(100), // Reduced height on mobile
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: 'relative',
  },
  offerBadge: {
    position: 'absolute',
    top: width < 768 ? responsiveSize(5) : responsiveSize(5),
    right: responsiveSize(15),
    backgroundColor: '#e53e3e',
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(3),
    borderRadius: responsiveSize(8),
  },
  offerBadgePremium: {
    backgroundColor: '#ed8936',
  },
  offerBadgeText: {
    color: '#ffffff',
    fontSize: responsiveSize(10),
    fontWeight: 'bold',
  },
  offerTitle: {
    fontSize: responsiveSize(16),
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: responsiveSize(6),
  },
  offerDesc: {
    fontSize: responsiveSize(12),
    color: '#718096',
    marginBottom: responsiveSize(8),
    lineHeight: responsiveSize(16),
  },
  offerCode: {
    fontSize: responsiveSize(10),
    color: '#2b6cb0',
    fontWeight: '600',
  },

  // Features Grid
  featuresSection: {
    padding: responsiveSize(12),
    marginBottom: responsiveSize(15),
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: responsiveSize(12),
    borderRadius: responsiveSize(10),
    marginBottom: responsiveSize(8),
    elevation: 2,
  },
  featureIcon: {
    fontSize: responsiveSize(20),
    marginBottom: responsiveSize(6),
  },
  featureTitle: {
    fontSize: responsiveSize(10),
    fontWeight: 'bold',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: responsiveSize(2),
  },
  featureDesc: {
    fontSize: responsiveSize(8),
    color: '#718096',
    textAlign: 'center',
  },

  // FAB
  fab: {
    position: 'absolute',
    right: responsiveSize(15),
    bottom: responsiveSize(15),
    backgroundColor: '#2b6cb0',
    width: responsiveSize(50),
    height: responsiveSize(50),
    borderRadius: responsiveSize(25),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabIcon: {
    fontSize: responsiveSize(20),
    color: '#ffffff',
  },

  // Form Styles
  formSection: {
    backgroundColor: '#ffffff',
    margin: responsiveSize(12),
    padding: responsiveSize(15),
    borderRadius: responsiveSize(12),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  formLabel: {
    fontSize: responsiveSize(14),
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: responsiveSize(6),
    marginTop: responsiveSize(12),
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: responsiveSize(10),
    padding: responsiveSize(12),
    fontSize: responsiveSize(14),
    backgroundColor: '#f7fafc',
    color: '#2d3748',
  },
  textArea: {
    minHeight: responsiveSize(80),
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // Date Row
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // Guest Selector
  guestsSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: responsiveSize(6),
  },
  guestOption: {
    flex: 1,
    alignItems: 'center',
    padding: responsiveSize(12),
    marginHorizontal: responsiveSize(3),
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: responsiveSize(10),
    backgroundColor: '#f7fafc',
  },
  guestOptionSelected: {
    backgroundColor: '#2b6cb0',
    borderColor: '#2b6cb0',
  },
  guestText: {
    fontSize: responsiveSize(14),
    color: '#4a5568',
    fontWeight: '600',
  },
  guestTextSelected: {
    color: '#ffffff',
  },

  // Room Options
  roomOptions: {
    marginVertical: responsiveSize(6),
  },
  roomOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: responsiveSize(12),
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: responsiveSize(10),
    marginBottom: responsiveSize(6),
    backgroundColor: '#f7fafc',
  },
  roomOptionSelected: {
    borderColor: '#2b6cb0',
    backgroundColor: '#ebf8ff',
  },
  roomOptionInfo: {
    flex: 1,
  },
  roomOptionText: {
    fontSize: responsiveSize(14),
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: responsiveSize(2),
  },
  roomOptionPrice: {
    fontSize: responsiveSize(12),
    color: '#718096',
    fontWeight: '500',
  },
  selectedIcon: {
    fontSize: responsiveSize(16),
    color: '#2b6cb0',
    fontWeight: 'bold',
  },

  // Summary Section
  summarySection: {
    marginHorizontal: responsiveSize(12),
    marginVertical: responsiveSize(6),
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    padding: responsiveSize(15),
    borderRadius: responsiveSize(10),
    elevation: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveSize(8),
  },
  summaryLabel: {
    fontSize: responsiveSize(12),
    color: '#718096',
  },
  summaryValue: {
    fontSize: responsiveSize(12),
    color: '#2d3748',
    fontWeight: '600',
  },
  summaryTotal: {
    fontSize: responsiveSize(16),
    fontWeight: 'bold',
    color: '#2d3748',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: responsiveSize(6),
  },

  // Button Styles
  primaryButton: {
    backgroundColor: '#2b6cb0',
    padding: responsiveSize(15),
    borderRadius: responsiveSize(10),
    alignItems: 'center',
    margin: responsiveSize(12),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  bookButtonLarge: {
    marginHorizontal: responsiveSize(12),
    marginVertical: responsiveSize(18),
  },
  secondaryButton: {
    backgroundColor: '#ed8936',
    marginTop: responsiveSize(6),
  },
  buttonDisabled: {
    backgroundColor: '#a0aec0',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: responsiveSize(14),
    fontWeight: 'bold',
  },

  // Service Cards
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: responsiveSize(12),
    marginVertical: responsiveSize(6),
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  serviceCardSelected: {
    borderColor: '#2b6cb0',
    backgroundColor: '#ebf8ff',
  },
  serviceImage: {
    height: responsiveSize(120),
    width: '100%',
  },
  serviceImageStyle: {
    borderTopLeftRadius: responsiveSize(10),
    borderTopRightRadius: responsiveSize(10),
  },
  serviceOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 54, 93, 0.4)',
  },
  serviceIcon: {
    fontSize: responsiveSize(28),
    marginBottom: responsiveSize(6),
  },
  serviceNameOverlay: {
    color: '#ffffff',
    fontSize: responsiveSize(14),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  serviceInfo: {
    padding: responsiveSize(12),
  },
  serviceName: {
    fontSize: responsiveSize(16),
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: responsiveSize(2),
  },
  serviceDescription: {
    fontSize: responsiveSize(12),
    color: '#718096',
    marginBottom: responsiveSize(6),
    lineHeight: responsiveSize(16),
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveSize(6),
  },
  serviceDuration: {
    fontSize: responsiveSize(10),
    color: '#4a5568',
    fontWeight: '500',
  },
  servicePrice: {
    fontSize: responsiveSize(14),
    fontWeight: 'bold',
    color: '#2b6cb0',
  },
  serviceSelection: {
    fontSize: responsiveSize(10),
    color: '#2b6cb0',
    fontWeight: '600',
    textAlign: 'center',
  },

  // Categories
  categoriesScroll: {
    paddingHorizontal: responsiveSize(12),
    marginVertical: responsiveSize(6),
  },
  categoryButton: {
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(6),
    backgroundColor: '#f7fafc',
    borderRadius: responsiveSize(15),
    marginRight: responsiveSize(6),
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryButtonActive: {
    backgroundColor: '#2b6cb0',
    borderColor: '#2b6cb0',
  },
  categoryText: {
    fontSize: responsiveSize(12),
    color: '#4a5568',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },

  // Menu Items
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: responsiveSize(10),
    padding: responsiveSize(10),
    marginVertical: responsiveSize(4),
    elevation: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  menuImage: {
    width: responsiveSize(60),
    height: responsiveSize(60),
    borderRadius: responsiveSize(6),
    marginRight: responsiveSize(10),
  },
  menuImageStyle: {
    borderRadius: responsiveSize(6),
  },
  popularBadge: {
    position: 'absolute',
    top: responsiveSize(3),
    left: responsiveSize(3),
    backgroundColor: '#ed8936',
    paddingHorizontal: responsiveSize(5),
    paddingVertical: responsiveSize(1),
    borderRadius: responsiveSize(4),
  },
  popularText: {
    color: '#ffffff',
    fontSize: responsiveSize(8),
    fontWeight: 'bold',
  },
  menuInfo: {
    flex: 1,
  },
  menuName: {
    fontSize: responsiveSize(14),
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: responsiveSize(2),
  },
  menuDescription: {
    fontSize: responsiveSize(10),
    color: '#718096',
    marginBottom: responsiveSize(2),
    lineHeight: responsiveSize(12),
  },
  menuPrice: {
    fontSize: responsiveSize(12),
    fontWeight: 'bold',
    color: '#2b6cb0',
  },
  addButton: {
    backgroundColor: '#38a169',
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(6),
    borderRadius: responsiveSize(6),
    elevation: 2,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: responsiveSize(10),
    fontWeight: 'bold',
  },

  // Order Summary
  orderSummary: {
    backgroundColor: '#ffffff',
    borderRadius: responsiveSize(10),
    padding: responsiveSize(12),
    elevation: 2,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveSize(6),
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    fontSize: responsiveSize(12),
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: responsiveSize(1),
  },
  orderItemPrice: {
    fontSize: responsiveSize(10),
    color: '#718096',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f7fafc',
    width: responsiveSize(24),
    height: responsiveSize(24),
    borderRadius: responsiveSize(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  quantityText: {
    fontSize: responsiveSize(14),
    fontWeight: 'bold',
    color: '#4a5568',
  },
  quantityDisplay: {
    marginHorizontal: responsiveSize(8),
    fontSize: responsiveSize(12),
    fontWeight: '600',
    color: '#2d3748',
    minWidth: responsiveSize(15),
    textAlign: 'center',
  },
  orderTotal: {
    marginTop: responsiveSize(8),
    paddingTop: responsiveSize(8),
    borderTopWidth: 2,
    borderTopColor: '#e2e8f0',
  },
  orderTotalText: {
    fontSize: responsiveSize(14),
    fontWeight: 'bold',
    color: '#2d3748',
    textAlign: 'center',
  },

  // Action Section
  actionSection: {
    padding: responsiveSize(12),
    marginBottom: responsiveSize(15),
  },

  // Invoice Styles
  invoiceCard: {
    backgroundColor: '#ffffff',
    padding: responsiveSize(15),
    borderRadius: responsiveSize(10),
    elevation: 4,
  },
  invoiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveSize(8),
  },
  invoiceDescription: {
    fontSize: responsiveSize(12),
    color: '#4a5568',
    flex: 1,
  },
  invoiceAmount: {
    fontSize: responsiveSize(12),
    color: '#2d3748',
    fontWeight: '600',
  },
  invoiceSubtotal: {
    fontSize: responsiveSize(14),
    color: '#2d3748',
    fontWeight: '600',
  },
  invoiceTax: {
    fontSize: responsiveSize(12),
    color: '#718096',
  },
  invoiceTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveSize(6),
    paddingTop: responsiveSize(8),
    borderTopWidth: 2,
    borderTopColor: '#e2e8f0',
  },
  invoiceTotal: {
    fontSize: responsiveSize(16),
    fontWeight: 'bold',
    color: '#2d3748',
  },

  // Payment Methods
  paymentMethods: {
    marginVertical: responsiveSize(6),
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsiveSize(12),
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: responsiveSize(10),
    marginBottom: responsiveSize(6),
    backgroundColor: '#f7fafc',
  },
  paymentMethodSelected: {
    borderColor: '#2b6cb0',
    backgroundColor: '#ebf8ff',
  },
  paymentIcon: {
    fontSize: responsiveSize(18),
    marginRight: responsiveSize(10),
  },
  paymentMethodText: {
    fontSize: responsiveSize(14),
    fontWeight: '600',
    color: '#2d3748',
    flex: 1,
  },
  selectedCheck: {
    fontSize: responsiveSize(16),
    color: '#2b6cb0',
    fontWeight: 'bold',
  },

  // Card Input
  cardInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: responsiveSize(10),
    backgroundColor: '#f7fafc',
    paddingHorizontal: responsiveSize(12),
  },
  cardInput: {
    flex: 1,
    paddingVertical: responsiveSize(12),
    fontSize: responsiveSize(14),
    color: '#2d3748',
  },
  cardIcon: {
    fontSize: responsiveSize(16),
    color: '#94a3b8',
  },

  // Security Section
  securitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fff4',
    padding: responsiveSize(12),
    margin: responsiveSize(12),
    borderRadius: responsiveSize(10),
    borderWidth: 1,
    borderColor: '#9ae6b4',
  },
  securityIcon: {
    fontSize: responsiveSize(18),
    marginRight: responsiveSize(10),
  },
  securityText: {
    flex: 1,
    fontSize: responsiveSize(10),
    color: '#22543d',
    lineHeight: responsiveSize(12),
  },

  // Admin Dashboard Styles
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: responsiveSize(12),
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: responsiveSize(15),
    borderRadius: responsiveSize(12),
    alignItems: 'center',
    marginBottom: responsiveSize(8),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statCardIcon: {
    fontSize: responsiveSize(20),
    marginBottom: responsiveSize(6),
  },
  statCardNumber: {
    fontSize: responsiveSize(20),
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginBottom: responsiveSize(2),
  },
  statCardLabel: {
    fontSize: responsiveSize(10),
    color: '#718096',
    fontWeight: '500',
    textAlign: 'center',
  },

  // Tabs
  tabContainer: {
    flexDirection: 'row',
    padding: responsiveSize(12),
    backgroundColor: '#ffffff',
    marginHorizontal: responsiveSize(12),
    borderRadius: responsiveSize(10),
    elevation: 2,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: responsiveSize(6),
    borderRadius: responsiveSize(6),
  },
  tabActive: {
    backgroundColor: '#2b6cb0',
  },
  tabText: {
    fontSize: responsiveSize(10),
    color: '#718096',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  // Booking Rows
  bookingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    padding: responsiveSize(12),
    borderRadius: responsiveSize(10),
    marginBottom: responsiveSize(6),
    elevation: 2,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingId: {
    fontSize: responsiveSize(12),
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: responsiveSize(2),
  },
  bookingDetails: {
    fontSize: responsiveSize(10),
    color: '#2d3748',
    fontWeight: '600',
    marginBottom: responsiveSize(1),
  },
  bookingGuest: {
    fontSize: responsiveSize(10),
    color: '#718096',
    marginBottom: responsiveSize(1),
  },
  bookingDates: {
    fontSize: responsiveSize(9),
    color: '#a0aec0',
  },
  bookingRight: {
    alignItems: 'flex-end',
  },
  bookingAmount: {
    fontSize: responsiveSize(12),
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: responsiveSize(6),
  },
  statusBadge: {
    paddingHorizontal: responsiveSize(6),
    paddingVertical: responsiveSize(3),
    borderRadius: responsiveSize(6),
    backgroundColor: '#e2e8f0',
  },
  statusSuccess: {
    backgroundColor: '#c6f6d5',
  },
  statusInfo: {
    backgroundColor: '#bee3f8',
  },
  statusWarning: {
    backgroundColor: '#fefcbf',
  },
  statusText: {
    fontSize: responsiveSize(8),
    fontWeight: 'bold',
    color: '#2d3748',
  },

  // Revenue Chart
  revenueCard: {
    backgroundColor: '#ffffff',
    padding: responsiveSize(15),
    borderRadius: responsiveSize(10),
    elevation: 2,
  },
  revenueBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: responsiveSize(100),
    marginBottom: responsiveSize(12),
  },
  revenueBarContainer: {
    alignItems: 'center',
    flex: 1,
  },
  revenueBarWrapper: {
    height: responsiveSize(70),
    justifyContent: 'flex-end',
    marginBottom: responsiveSize(6),
  },
  revenueBar: {
    backgroundColor: '#2b6cb0',
    width: responsiveSize(15),
    borderTopLeftRadius: responsiveSize(3),
    borderTopRightRadius: responsiveSize(3),
    minHeight: responsiveSize(3),
  },
  revenueMonth: {
    fontSize: responsiveSize(10),
    color: '#718096',
    fontWeight: '500',
  },
  revenueAmount: {
    fontSize: responsiveSize(8),
    color: '#4a5568',
    marginTop: responsiveSize(2),
  },

  // Action Buttons Grid
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: responsiveSize(15),
    borderRadius: responsiveSize(10),
    alignItems: 'center',
    marginBottom: responsiveSize(8),
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  actionIcon: {
    fontSize: responsiveSize(20),
    marginBottom: responsiveSize(6),
  },
  actionText: {
    fontSize: responsiveSize(10),
    fontWeight: '600',
    color: '#2d3748',
  },

  // Loading Component
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: responsiveSize(12),
    fontSize: responsiveSize(14),
    color: '#4a5568',
    fontWeight: '500',
  },

  // Profile Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  profileModal: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: responsiveSize(15),
    borderTopRightRadius: responsiveSize(15),
    padding: responsiveSize(15),
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveSize(15),
  },
  modalTitle: {
    fontSize: responsiveSize(20),
    fontWeight: 'bold',
    color: '#2d3748',
  },
  closeButton: {
    fontSize: responsiveSize(20),
    color: '#718096',
    padding: responsiveSize(3),
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: responsiveSize(18),
  },
  profileAvatarLarge: {
    fontSize: responsiveSize(50),
    marginBottom: responsiveSize(8),
  },
  userName: {
    fontSize: responsiveSize(20),
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: responsiveSize(2),
  },
  userMembership: {
    fontSize: responsiveSize(12),
    color: '#ed8936',
    fontWeight: '600',
    marginBottom: responsiveSize(2),
  },
  userEmail: {
    fontSize: responsiveSize(12),
    color: '#718096',
  },
  settingsSection: {
    marginBottom: responsiveSize(18),
  },
  settingsTitle: {
    fontSize: responsiveSize(16),
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: responsiveSize(12),
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveSize(10),
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingLabel: {
    fontSize: responsiveSize(14),
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: responsiveSize(2),
  },
  settingDescription: {
    fontSize: responsiveSize(10),
    color: '#718096',
  },
  logoutButton: {
    backgroundColor: '#fed7d7',
    padding: responsiveSize(12),
    borderRadius: responsiveSize(10),
    alignItems: 'center',
  },
  logoutText: {
    color: '#c53030',
    fontSize: responsiveSize(14),
    fontWeight: 'bold',
  },
});

export default LuxStayHotelApp;