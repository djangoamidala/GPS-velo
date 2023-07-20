// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen'; // This is the new screen where you can choose between Register and Login
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import SearchModal from './components/searchModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          setLoggedIn(true);
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;  // App is still launching
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={loggedIn ? "Home" : "Welcome"} screenOptions={{ headerShown: false, animationEnabled: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SearchModal" component={SearchModal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  
};
