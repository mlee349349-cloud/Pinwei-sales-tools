import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import FabricCard from '../components/FabricCard';
import { matchedFabrics } from '../data/sampleData';
import { colors, spacing } from '../styles/theme';

const MatchesScreen = () => {
  const navigation = useNavigation();
  const [sortOption, setSortOption] = useState('default');

  const handleSort = () => {
    Alert.alert(
      'Sort Options',
      'Choose how to sort fabrics',
      [
        { text: 'Price: Low to High', onPress: () => setSortOption('priceAsc') },
        { text: 'Price: High to Low', onPress: () => setSortOption('priceDesc') },
        { text: 'Name: A to Z', onPress: () => setSortOption('nameAsc') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleFabricPress = (item) => {
    navigation.navigate('ProductDetail', { fabric: item });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Matches" rightButton="Sort" onRightPress={handleSort} />
      <FlatList
        data={matchedFabrics}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => handleFabricPress(item)}
          >
            <FabricCard
              image={item.image}
              name={item.name}
              tags={item.tags}
              price={item.price}
              imageStyle={styles.cardImage}
            />
          </TouchableOpacity>
        )}
      />
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
  listContent: {
    padding: spacing.md,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%',
  },
  cardImage: {
    height: 160,
  },
});

export default MatchesScreen;

