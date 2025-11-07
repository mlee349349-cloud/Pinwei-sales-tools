// Ultra-simple test version - just to verify React works
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>✅ App is Working!</Text>
      <Text style={styles.subtext}>If you see this, React Native Web is working correctly.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F6F2',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2A2A2A',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: '#8C857A',
  },
});


