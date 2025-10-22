import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { hotelData } from '../data/hotelData';
import { styles } from '../styles';

const ServicesScreen = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedServices, setSelectedServices] = useState([]);
  const [foodOrder, setFoodOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useState({
    avatar: '👑'
  });

  // ... (all ServicesScreen logic remains the same)

  return (
    <View style={styles.screen}>
      <CustomHeader user={user} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.screenHeader}>
          <View style={styles.screenTitleContainer}>
            <Text style={styles.screenTitle}>Hotel Services</Text>
            <Text style={styles.screenSubtitle}>Enhance your stay with our premium services</Text>
          </View>
        </View>

        {/* Services content remains the same */}
        {/* ... */}

      </ScrollView>
    </View>
  );
};

export default ServicesScreen;