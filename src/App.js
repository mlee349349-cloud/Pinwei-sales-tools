import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import MatchesScreen from './screens/MatchesScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import InquiryScreen from './screens/InquiryScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

function MatchesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Matches" component={MatchesScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

function InquiryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inquiry" component={InquiryScreen} />
      <Stack.Screen name="Matches" component={MatchesScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

function FavoritesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.appContainer}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: '#2A2A2A',
              tabBarInactiveTintColor: '#8C857A',
              tabBarStyle: {
                backgroundColor: '#F8F6F2',
                borderTopColor: '#E8E6E0',
                borderTopWidth: 1,
                paddingTop: 8,
                paddingBottom: 8,
                height: 60,
              },
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '500',
              },
            }}
          >
            <Tab.Screen 
              name="HomeStack" 
              component={HomeStack}
              options={{ tabBarLabel: 'Home' }}
            />
            <Tab.Screen 
              name="MatchesStack" 
              component={MatchesStack}
              options={{ tabBarLabel: 'Matches' }}
            />
            <Tab.Screen 
              name="InquiryStack" 
              component={InquiryStack}
              options={{ tabBarLabel: 'Inquiry' }}
            />
            <Tab.Screen 
              name="FavoritesStack" 
              component={FavoritesStack}
              options={{ tabBarLabel: 'Favorites' }}
            />
            <Tab.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{ tabBarLabel: 'Settings' }}
            />
          </Tab.Navigator>
        </NavigationContainer>
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

