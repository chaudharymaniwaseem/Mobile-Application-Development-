import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RoomCard from '../components/RoomCard';
import SearchBar from '../components/SearchBar';
import CustomHeader from '../components/CustomHeader';
import { hotelData } from '../data/hotelData';
import { styles } from '../styles';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredRooms, setFeaturedRooms] = useState(hotelData.rooms);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user] = useState({
    name: 'Manahil',
    avatar: '👑'
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

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
          onPress: () => navigation.navigate('Book')
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
    <View style={styles.screen}>
      <CustomHeader user={user} />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2b6cb0']}
          />
        }
      >
        {/* Hero Section */}
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
              onPress={() => navigation.navigate('Book')}
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
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
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

        {/* Special Offers */}
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
        onPress={() => navigation.navigate('Book')}
      >
        <Text style={styles.fabIcon}>🏨</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;