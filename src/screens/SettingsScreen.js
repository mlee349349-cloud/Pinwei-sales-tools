import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListItem from '../components/ListItem';
import { colors } from '../styles/theme';

const SettingsScreen = () => {
  const [offlineMode, setOfflineMode] = useState(false);

  const syncCatalog = () => {
    Alert.alert(
      'Sync Catalog',
      'Catalog synchronization started. This may take a few moments.',
      [{ text: 'OK' }]
    );
  };

  const updatePrices = () => {
    Alert.alert(
      'Update Prices',
      'Price update initiated. Changes will be reflected shortly.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <ListItem
          title="Sync Catalog"
          onPress={syncCatalog}
        />
        <ListItem
          title="Update Prices"
          onPress={updatePrices}
        />
        <ListItem
          title="Offline Mode"
          switchValue={offlineMode}
          onSwitchChange={setOfflineMode}
        />
      </View>
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
  content: {
    marginTop: 16,
  },
});

export default SettingsScreen;

