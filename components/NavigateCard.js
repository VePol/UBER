import {
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
  } from "react-native";
  import React from "react";
  import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
  import { useDispatch } from "react-redux";
  import { setDestination } from "../slices/navSlice";
  import { useNavigation } from "@react-navigation/native";
  import NavFavorites from "./NavFavorites";
  import { Icon } from "react-native-elements";
  
  const key = process.env.GOOGLE_MAPS_APIKEY;
  
  const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
  
    return (
      <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
        <Text style={{ textAlign: "center", paddingVertical: 20, fontSize: 20 }}>Jesus!</Text>
        <View style={{ borderTopWidth: 1, borderColor: "gray", flexShrink: 1 }}>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            styles={toInputBoxStyles}
            fetchDetails={true}
            enablePoweredByContainer={false}
            returnKeyType={"search"}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(setDestination({ location: details.geometry.location, description: data.description }));
              navigation.navigate("RideOptionsCard");
            }}
            query={{ key, language: "en" }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          />
          <NavFavorites />
        </View>
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("RideOptionsCard")}
            style={styles.rideButton}
          >
            <Icon name="car" type="font-awesome" color="white" size={16} />
            <Text style={styles.buttonText}>Rides</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.eatsButton}>
            <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
            <Text style={styles.buttonText}>Eats</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  export default NavigateCard;
  
  const toInputBoxStyles = StyleSheet.create({
    container: { backgroundColor: "white", paddingTop: 20, flex: 0 },
    textInput: { backgroundColor: "#DDDDDF", fontSize: 18 },
    textInputContainer: { paddingHorizontal: 20, paddingBottom: 0 },
  });
  
  const styles = StyleSheet.create({
    buttonContainer: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 15, borderTopWidth: 1, borderColor: "gray" },
    rideButton: { flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "black", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 50 },
    eatsButton: { flexDirection: "row", justifyContent: "center", alignItems: "center", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 50 },
    buttonText: { color: "white", fontSize: 16, marginLeft: 10 },
  });  