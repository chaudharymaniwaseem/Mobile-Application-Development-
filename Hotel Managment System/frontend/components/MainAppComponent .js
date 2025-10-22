import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import ProfileModal from './components/ProfileModal';
import { styles } from './styles';

const App = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState({
    name: 'Manahil',
    email: 'manahil@example.com',
    avatar: '👑',
    membership: 'Gold Member'
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a365d" />
      <AppNavigator />
      <ProfileModal 
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        user={user}
      />
    </SafeAreaView>
  );
};

export default App;