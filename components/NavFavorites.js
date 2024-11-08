import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

export default function NavFavorites() {
  const data = [
    { id: "123", icon: "home", location: "Home", destination: "Code Street, London, UK" },
    { id: "456", icon: "briefcase", location: "Work", destination: "London Eye, London, UK" },
  ];

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item: { location, destination, icon } }) => (
        <TouchableOpacity style={styles.touchable}>
          <Icon name={icon} type="ionicon" color="white" size={18} containerStyle={styles.icon} />
          <View>
            <Text style={styles.location}>{location}</Text>
            <Text style={styles.destination}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  separator: { backgroundColor: "gray", height: 0.5 },
  touchable: { flexDirection: "row", alignItems: "center", padding: 15 },
  icon: { marginRight: 15, borderRadius: 50, padding: 10, backgroundColor: "gray" },
  location: { fontSize: 16, fontWeight: "bold" },
  destination: { color: "gray" },
});
