// screens/HomeScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { nanoid } from 'nanoid';

const HomeScreen = ({ appUniqueID }) => {
  const [location, setLocation] = useState(null);

  const handlePlaceSelect = (data, details) => {
    const uniquePlaceID = nanoid();
    console.log('Selected Place:', data);
    console.log('Generated Unique Place ID:', uniquePlaceID);
    setLocation({ ...data, uniquePlaceID }); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Screen</Text>
      <Text>App Unique ID: {appUniqueID}</Text>

      <GooglePlacesAutocomplete
        placeholder="Search for a place"
        onPress={handlePlaceSelect}
        query={{
          key: 'YOUR_GOOGLE_API_KEY'
        }}
        debounce={200}  // Optional: Delay before starting the search
        fetchDetails={true}  // Ensure you get detailed information like coordinates
      />
      {location && (
        <View style={styles.locationContainer}>
          <Text>Place: {location.description}</Text>
          <Text>Unique Place ID: {location.uniquePlaceID}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  locationContainer: {
    marginTop: 16,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});

export default HomeScreen;

