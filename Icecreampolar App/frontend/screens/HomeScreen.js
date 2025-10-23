import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, RefreshControl } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Messages } from '../utils/messages';
import SearchBar from '../components/SearchBar';
import CategoryButton from '../components/CategoryButton';
import IceCreamCard from '../components/IceCreamCard';
import MessageToast from '../components/MessageToast';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Sample data
  const iceCreamData = [
    { 
      id: '1', 
      name: 'Polar Vanilla Dream', 
      description: 'Creamy vanilla with polar magic swirls', 
      price: 4.99, 
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', 
      category: 'classic', 
      isFavorite: false, 
    },
    { 
      id: '2', 
      name: 'Arctic Chocolate', 
      description: 'Rich chocolate with polar twist', 
      price: 5.49, 
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', 
      category: 'chocolate', 
      isFavorite: true, 
    },
    { 
      id: '3', 
      name: 'Berry Polar', 
      description: 'Mixed berries with icy freshness', 
      price: 5.99, 
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', 
      category: 'fruity', 
      isFavorite: false, 
    },
    { 
      id: '4', 
      name: 'Mint Polar', 
      description: 'Cool mint with chocolate chips', 
      price: 5.29, 
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', 
      category: 'special', 
      isFavorite: true, 
    },
  ];

  const categories = [
    { id: 'all', name: 'All Flavors' },
    { id: 'classic', name: 'Classic' },
    { id: 'chocolate', name: 'Chocolate' },
    { id: 'fruity', name: 'Fruity' },
    { id: 'special', name: 'Polar Special' },
  ];

  const filteredData = iceCreamData.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      setMessage(`Searching for "${query}"...`);
      setShowMessage(true);
    }
  };

  const handleAddToCart = (item) => {
    setMessage(Messages.success.itemAdded);
    setShowMessage(true);
  };

  const handleFavorite = (itemId) => {
    setMessage(Messages.success.favoriteAdded);
    setShowMessage(true);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setMessage('Menu refreshed!');
      setShowMessage(true);
    }, 1000);
  };

  return (
    <View style={GlobalStyles.screenContainer}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={{ marginBottom: 24 }}>
          <Text style={GlobalStyles.heading1}>Ice Cream Polar 🍦</Text>
          <Text style={[GlobalStyles.bodyText, GlobalStyles.textCenter]}>
            Discover the coolest flavors in town! ❄️
          </Text>
        </View>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
          {categories.map((category) => (
            <CategoryButton 
              key={category.id} 
              title={category.name} 
              isSelected={selectedCategory === category.id}
              onPress={() => setSelectedCategory(category.id)}
            />
          ))}
        </ScrollView>

        {/* Results Count */}
        <View style={{ marginBottom: 16 }}>
          <Text style={GlobalStyles.bodyText}>
            {filteredData.length} {filteredData.length === 1 ? 'flavor' : 'flavors'} found
          </Text>
        </View>

        {/* Ice Cream Grid */}
        {filteredData.length > 0 ? (
          <View style={[GlobalStyles.row, { justifyContent: 'flex-start' }]}>
            {filteredData.map((item) => (
              <IceCreamCard 
                key={item.id} 
                item={item} 
                onPress={handleAddToCart}
                onFavorite={handleFavorite}
              />
            ))}
          </View>
        ) : (
          <View style={[GlobalStyles.card, GlobalStyles.centerContent, { padding: 40 }]}>
            <Text style={[GlobalStyles.heading3, { marginBottom: 8 }]}>
              No flavors found
            </Text>
            <Text style={[GlobalStyles.bodyText, GlobalStyles.textCenter]}>
              {Messages.info.noResults}
            </Text>
          </View>
        )}

        {/* Guide Message */}
        <View style={[GlobalStyles.card, GlobalStyles.centerContent, { marginTop: 16 }]}>
          <Text style={[GlobalStyles.bodyText, GlobalStyles.textCenter]}>
            {Messages.guide.swipe}
          </Text>
          <Text style={[GlobalStyles.caption, GlobalStyles.textCenter, { marginTop: 8 }]}>
            {Messages.guide.tapFavorite}
          </Text>
        </View>
      </ScrollView>

      {/* Message Toast */}
      <MessageToast 
        message={message} 
        visible={showMessage} 
        onHide={() => setShowMessage(false)} 
        type="success" 
      />
    </View>
  );
};

export default HomeScreen;