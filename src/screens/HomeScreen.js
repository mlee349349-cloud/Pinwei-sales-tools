import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FabricCard from '../components/FabricCard';
import Chip from '../components/Chip';
import { recentFabrics } from '../data/sampleData';
import { colors, spacing, typography, borderRadius } from '../styles/theme';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filterOptions = ['Warm', 'Wool', 'Lightweight', 'Silky'];
  const categoryFilters = ['Season', 'Texture'];

  const toggleFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleFabricPress = (item) => {
    navigation.navigate('ProductDetail', { fabric: item });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <TextInput
            style={styles.searchInput}
            placeholder="What is your client looking for?"
            placeholderTextColor={colors.accentSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <View style={styles.filterChips}>
            {filterOptions.map((filter) => (
              <Chip
                key={filter}
                label={filter}
                selected={selectedFilters.includes(filter)}
                onPress={() => toggleFilter(filter)}
              />
            ))}
          </View>

          <View style={styles.categoryFilters}>
            {categoryFilters.map((category) => (
              <TouchableOpacity key={category} style={styles.categoryButton}>
                <Text style={styles.categoryButtonText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionHeader}>Recent Recommendations</Text>

          <FlatList
            horizontal
            data={recentFabrics}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.fabricCardWrapper}
                onPress={() => handleFabricPress(item)}
              >
                <FabricCard
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  tags={item.tags}
                  style={styles.fabricCard}
                  imageStyle={styles.fabricCardImage}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  content: {
    padding: spacing.lg,
  },
  searchInput: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.sizes.md,
    color: colors.primaryText,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
  },
  categoryFilters: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  categoryButton: {
    marginRight: spacing.lg,
    paddingVertical: spacing.sm,
  },
  categoryButtonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.accent,
    textDecorationLine: 'underline',
  },
  sectionHeader: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.primaryText,
    marginBottom: spacing.md,
  },
  horizontalList: {
    paddingRight: spacing.lg,
  },
  fabricCardWrapper: {
    width: 280,
    marginRight: spacing.md,
  },
  fabricCard: {
    marginBottom: 0,
  },
  fabricCardImage: {
    height: 180,
  },
});

export default HomeScreen;

