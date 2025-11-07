import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';

const FabricCard = ({ name, price, image, tags, style, imageStyle }) => {
  return (
    <View style={[styles.card, style]}>
      {image && (
        <Image
          source={{ uri: image }}
          style={[styles.image, imageStyle]}
          resizeMode="cover"
        />
      )}
      <View style={styles.content}>
        {name && <Text style={styles.name} numberOfLines={2}>{name}</Text>}
        {tags && tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {tags.slice(0, 3).map((tag, index) => (
              <Text key={index} style={styles.tag}>{tag}</Text>
            ))}
          </View>
        )}
        {price && <Text style={styles.price}>{price}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    ...shadows.soft,
    marginBottom: spacing.md,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: colors.border,
  },
  content: {
    padding: spacing.md,
  },
  name: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.primaryText,
    marginBottom: spacing.xs,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
  },
  tag: {
    fontSize: typography.sizes.xs,
    color: colors.accentSecondary,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  price: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.primaryText,
  },
});

export default FabricCard;

