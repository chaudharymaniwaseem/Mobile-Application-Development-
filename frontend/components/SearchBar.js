import React, { useState } from 'react';
import { GlobalStyles, Colors, Typography, Spacing, BorderRadius, Shadows } from '../../frontend/styles';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ placeholder, onSearch, style }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch && onSearch(query);
    Keyboard.dismiss();
  };

  const clearSearch = () => {
    setQuery('');
    onSearch && onSearch('');
  };

  const handleChangeText = (text) => {
    setQuery(text);
    onSearch && onSearch(text);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder || "Search..."}
          value={query}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          inputMode="search"
          keyboardType="default"
          placeholderTextColor="#999"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f8f5f0'
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    height: 50
  },
  searchIcon: {
    marginRight: 8
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
    paddingVertical: 0
  },
  clearButton: {
    padding: 4,
    marginLeft: 8
  }
});

export default SearchBar;