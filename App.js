import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, TextInput, Button, Pressable, Alert } from 'react-native';
import React, { useEffect, useMemo, useRef, useState, useLayoutEffect } from 'react';
import { apiUrl } from './app.json';
import axios from 'axios';
import base64 from 'react-native-base64';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
import LoginScreen from './Login';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerBackVisible:false,}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;