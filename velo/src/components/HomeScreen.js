import React, { useEffect, useState } from 'react';
import { StyleSheet, View, PermissionsAndroid, TouchableHighlight, Text, Button } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapboxGL from '@rnmapbox/maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken("pk.eyJ1IjoiZGphbmdvYW1pZGFsYSIsImEiOiJjbGsxcjdka3kwNTNnM3NveTRscW9xd3pvIn0.1FZ2901YCkfMHzhqnutzdQ");

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState([0, 0]);
  const [destination, setDestination] = useState(null);
const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Location App required Location permission",
          message: "We required Location permission in order to get device location " + 
                    "Please grant us."
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const watchId = Geolocation.watchPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setLocation([longitude, latitude]);
          },
          error => console.log(error.message),
          {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 5000,
            distanceFilter: 10,
          }
        );

        return () => Geolocation.clearWatch(watchId);
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleOpenModal = () => {
    navigation.navigate('SearchModal', { onPlaceSelect: handlePlaceSelect });
  };

  const handlePlaceSelect = (place) => {
    setDestination([place.center[0], place.center[1]]);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');  // Remove the user's token from AsyncStorage
    navigation.replace('Welcome');  // Navigate to the Welcome screen
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView 
          style={styles.map}
          logoEnabled={false}
          attributionEnabled={false}
          cameraState={{
            centerCoordinate: location,
            zoomLevel: 14,
          }}
        >
          <MapboxGL.PointAnnotation
            id="current_location"
            coordinate={location}
          >
            <MapboxGL.Callout title="You are here" />
          </MapboxGL.PointAnnotation>

          {destination && (
            <MapboxGL.PointAnnotation
              id="destination"
              coordinate={destination}
            >
              <MapboxGL.Callout title="Destination" />
            </MapboxGL.PointAnnotation>
          )}
        </MapboxGL.MapView>
        <TouchableHighlight style={styles.searchBar} onPress={handleOpenModal}>
          <Text style={styles.searchText}>Où allons nous ?</Text>
        </TouchableHighlight>
        <Button title="Déconnexion" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '100%',
    width: "100%",
  },
  map: {
    flex: 1
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 10,
    width: '90%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    borderRadius: 20,
  },
  searchText: {
    fontSize: 18,
  },
});

export default HomeScreen;
