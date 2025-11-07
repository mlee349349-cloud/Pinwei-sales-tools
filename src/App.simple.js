// Simplified version for testing - remove React Navigation complexity
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.appContainer}>
        <HomeScreen />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#F8F6F2',
  },
});

