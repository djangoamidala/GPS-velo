import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Alert, ImageBackground, Button, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.1:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };
  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };



  GoogleSignin.configure({
    webClientId: '650670541065-cakapoktapbg3bmrevuteldimqfq663b.apps.googleusercontent.com',
  });


  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the login process");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign in is in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Google Play Services are not available");
      } else {
        console.log(error);
      }
    }
  };


  const _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(null); // update state user informations 
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <ImageBackground source={require('../../assets/welcome-bike.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Connexion</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#000"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#000"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <Button title="Se connecter" onPress={handleLogin} color="#0c6157" />
        </View>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: "#0c6157"
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    color: "#000"
  },
  button: {
    margin: 10,
  },
  forgotPassword: {
    color: "#0c6157",
    textAlign: 'center',
    bottom: 7
  }
});
