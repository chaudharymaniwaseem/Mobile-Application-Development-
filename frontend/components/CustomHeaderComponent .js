import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../styles';

const CustomHeader = ({ user, setShowProfile }) => {
  return (
    <View style={styles.header}>
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
    </View>
  );
};

export default CustomHeader;