import React from 'react';
import { ImageBackground, StyleSheet, View, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../../src/assets/welcome-bike.jpg')} style={styles.background}>
      <View style={styles.topContainer}>
        <Text style={styles.welcomeTitle}>RideBike</Text>
        <Text style={styles.welcomeMessage}>Bienvenue, préparez-vous à explorer !</Text>
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.centerMessage}>Chaque tour de roue est une nouvelle aventure. Savourez chaque instant sur la route et que chaque parcours vous apporte joie et satisfaction. Roulez avec passion !</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button title="Connexion" onPress={() => navigation.navigate('Login')} color="#0c6157" />
        </View>
        <View style={styles.button}>
          <Button title="Inscription" onPress={() => navigation.navigate('Register')} color="#0c6157" />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
  },
  topContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',  // Semi-transparent background
    padding: 20,
    borderRadius: 10,  // Rounded corners
    marginTop: 50,  // Top margin
  },
  welcomeTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',  // Changed to white for better visibility
    textAlign: 'center',  // Center the text
  },
  welcomeMessage: {
    fontSize: 18,
    color: '#fff',  // Changed to white for better visibility
    textAlign: 'center',  // Center the text
    marginTop: 10,  // Add some top margin
  },
  centerContainer: {
    flex: 1,  // Take up all available space
    justifyContent: 'center',  // Center vertically
    paddingHorizontal: 20,  // Horizontal padding
  },
  centerMessage: {
    fontSize: 24,
    color: '#fff',  // White text
    textAlign: 'center',  // Center the text
    backgroundColor: 'rgba(0,0,0,0.5)',  // Semi-transparent background
    padding: 20,
    borderRadius: 10,  // Rounded corners
  },
  buttonsContainer: {
    width: '100%',
    padding: 10,
    paddingBottom: 20,  // More padding at the bottom
  },
  button: {
    margin: 10,  // Adjust as needed
  },
});

export default WelcomeScreen;
