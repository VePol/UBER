import React, { useEffect, useRef } from "react";
import { Keyboard, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, selectOrigin, setTravelTimeInformation } from "../slices/navSlice";

const Map = () => {
  const mapRef = useRef(null);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();

  const key = process.env.GOOGLE_MAPS_APIKEY;

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    const getTravelTime = async () => {
      if (!origin || !destination) return;
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${key}`
        );
        const data = await response.json();
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
      } catch (error) {
        console.error("Error fetching travel time:", error);
      }
    };

    getTravelTime();
  }, [origin, destination, key]);

  return (
    <MapView
      ref={mapRef}
      onPress={Keyboard.dismiss}
      onPanDrag={Keyboard.dismiss}
      initialRegion={{
        latitude: origin?.location?.lat || 37.7749, // Fallback lat/lng if origin not available
        longitude: origin?.location?.lng || -122.4194,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      style={StyleSheet.absoluteFillObject}
      mapType="mutedStandard"
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={key}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});