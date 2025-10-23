import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../constants/Colors';
import { Messages } from '../utils/messages';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';

const ProfileScreen = () => {
  return (
    <View style={GlobalStyles.screenContainer}>
      <Header title="My Profile" />
      <ScrollView>
        {/* Profile screen content */}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;