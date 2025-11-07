import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../styles/theme';

const Header = ({ title, rightButton, onRightPress, style }) => {
  return (
    <SafeAreaView edges={['top']} style={[styles.header, style]}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>{title}</Text>
        {rightButton && (
          <TouchableOpacity onPress={onRightPress}>
            <Text style={styles.rightButton}>{rightButton}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.primaryText,
  },
  rightButton: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.accent,
  },
});

export default Header;

