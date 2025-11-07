import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Chip from '../components/Chip';
import Button from '../components/Button';
import { colors, spacing, typography, borderRadius } from '../styles/theme';

const InquiryScreen = () => {
  const navigation = useNavigation();
  const [garmentType, setGarmentType] = useState('');
  const [desiredFeel, setDesiredFeel] = useState([]);
  const [inspiration, setInspiration] = useState('');

  const garmentOptions = ['Coat', 'Dress', 'Shirt', 'Pants', 'Jacket'];
  const feelOptions = ['Soft', 'Structured', 'Breathable', 'Warm', 'Lightweight', 'Luxurious'];

  const toggleFeel = (feel) => {
    if (desiredFeel.includes(feel)) {
      setDesiredFeel(desiredFeel.filter(f => f !== feel));
    } else {
      setDesiredFeel([...desiredFeel, feel]);
    }
  };

  const getFabricMatches = () => {
    // Navigate to matches screen with filters
    navigation.navigate('Matches');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.question}>What type of garment?</Text>
          <View style={styles.optionRow}>
            {garmentOptions.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={garmentType === option}
                onPress={() => setGarmentType(option)}
              />
            ))}
          </View>

          <Text style={styles.question}>What's the desired feel?</Text>
          <View style={styles.optionRow}>
            {feelOptions.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={desiredFeel.includes(option)}
                onPress={() => toggleFeel(option)}
              />
            ))}
          </View>

          <Text style={styles.question}>Any known inspirations?</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Designer brand..."
            placeholderTextColor={colors.accentSecondary}
            value={inspiration}
            onChangeText={setInspiration}
          />

          <Button
            label="Get Matches"
            onPress={getFabricMatches}
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
  content: {
    padding: spacing.lg,
  },
  question: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.primaryText,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
  },
  textInput: {
    fontSize: typography.sizes.md,
    color: colors.primaryText,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.xl,
  },
  button: {
    marginTop: spacing.md,
  },
});

export default InquiryScreen;

