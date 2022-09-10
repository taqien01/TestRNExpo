import { StyleSheet, Text, View, } from 'react-native';
import React, { useLayoutEffect } from 'react';
const HomeScreen = ({navigation, route}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerShown: false,
    });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome {route.params.name}</Text>
    </View>
  );
};

export default HomeScreen;