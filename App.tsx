import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Root from './src/screens/Root';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer >
      <Root />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
