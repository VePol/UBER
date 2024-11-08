// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { nanoid } from 'nanoid'; // Import nanoid to generate unique IDs
import HomeScreen from './screens/HomeScreen'; // Import HomeScreen (adjust based on your file structure)

const Stack = createStackNavigator();

const App = () => {
  const uniqueAppID = nanoid(); // Generate a unique ID for the app instance

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} appUniqueID={uniqueAppID} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default App;