import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../styles/theme';

const ListItem = ({ title, onPress, switchValue, onSwitchChange, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.listItem, style]}
      disabled={switchValue !== undefined}
    >
      <Text style={styles.listItemTitle}>{title}</Text>
      {switchValue !== undefined ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: colors.border, true: colors.accent }}
          thumbColor={colors.white}
        />
      ) : (
        <Text style={styles.chevron}>›</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listItemTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.primaryText,
  },
  chevron: {
    fontSize: typography.sizes.xl,
    color: colors.accentSecondary,
  },
});

export default ListItem;

