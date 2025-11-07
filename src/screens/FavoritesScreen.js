import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FabricCard from '../components/FabricCard';
import { savedProposals } from '../data/sampleData';
import { colors, spacing, typography } from '../styles/theme';

const FavoritesScreen = () => {
  const navigation = useNavigation();

  const handleFabricPress = (item) => {
    navigation.navigate('ProductDetail', { fabric: item });
  };

  if (savedProposals.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No saved proposals yet</Text>
          <Text style={styles.emptySubtext}>Start adding fabrics to your client proposals</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={savedProposals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleFabricPress(item)}
            style={styles.cardWrapper}
          >
            <FabricCard
              name={item.name}
              image={item.image}
              tags={item.tags}
              price={item.price}
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
    padding: spacing.lg,
  },
  cardWrapper: {
    marginBottom: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.primaryText,
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    fontSize: typography.sizes.md,
    color: colors.accentSecondary,
    textAlign: 'center',
  },
});

export default FavoritesScreen;

