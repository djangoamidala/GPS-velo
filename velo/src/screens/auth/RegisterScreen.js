import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Alert, ImageBackground, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import GoogleSignInButton from '../../components/GoogleButton';


export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null); // Ajouter pour garder une trace de l'utilisateur

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.1.1:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  GoogleSignin.configure({
    webClientId: '650670541065-bdssgunuecg9oc5etgp26if3hvjj3je8.apps.googleusercontent.com',
  });

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      setUserInfo(userInfo);
    } catch (error) {
      console.log('Error --> ', error);
    }
  };
  
  return (
    <ImageBackground source={require('../../assets/welcome-bike.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Inscription</Text>
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
        <View style={styles.googleButtonContainer}>
   
          <GoogleSignInButton onPress={_signIn}/>
        </View>

        <View style={styles.button}>
          <Button title="S'inscrire" onPress={handleRegister} color="#0c6157" />
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
  googleButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,

  },
  googleButton: {
    width: 240,
    height: 48,
  },
});
