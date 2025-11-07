import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import Button from '../components/Button';
import { colors, spacing, typography, borderRadius } from '../styles/theme';

const ProductDetailScreen = () => {
  const route = useRoute();
  const fabric = route.params?.fabric || {
    id: '1',
    name: 'Premium Wool Blend',
    price: '$45 / m',
    image: 'https://images.unsplash.com/photo-1586287004271-2b2d0c6a3b3c?w=400',
    description: 'A luxurious wool blend perfect for winter garments with excellent insulation properties.',
    pros: ['Excellent warmth retention', 'Durable and long-lasting', 'Natural breathability'],
    cons: ['Requires dry cleaning', 'Can be itchy for sensitive skin'],
  };

  const addToProposal = () => {
    Alert.alert(
      'Added to Proposal',
      `${fabric.name} has been added to your client proposal.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: fabric.image }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        
        <View style={styles.content}>
          <Text style={styles.fabricName}>{fabric.name}</Text>
          <Text style={styles.fabricDesc}>{fabric.description}</Text>

          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Pros</Text>
            {fabric.pros && fabric.pros.map((pro, index) => (
              <Text key={index} style={styles.bullet}>• {pro}</Text>
            ))}
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Cons</Text>
            {fabric.cons && fabric.cons.map((con, index) => (
              <Text key={index} style={styles.bullet}>• {con}</Text>
            ))}
          </View>

          <Text style={styles.price}>{fabric.price}</Text>

          <Button
            label="Add to Client Proposal"
            onPress={addToProposal}
            style={styles.button}
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
  heroImage: {
    width: '100%',
    height: 400,
    backgroundColor: colors.border,
  },
  content: {
    padding: spacing.lg,
  },
  fabricName: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.primaryText,
    marginBottom: spacing.sm,
  },
  fabricDesc: {
    fontSize: typography.sizes.md,
    color: colors.accentSecondary,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  detailSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.primaryText,
    marginBottom: spacing.sm,
  },
  bullet: {
    fontSize: typography.sizes.md,
    color: colors.primaryText,
    lineHeight: 24,
    marginBottom: spacing.xs,
    paddingLeft: spacing.sm,
  },
  price: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.primaryText,
    marginBottom: spacing.lg,
    marginTop: spacing.md,
  },
  button: {
    marginTop: spacing.md,
  },
});

export default ProductDetailScreen;

