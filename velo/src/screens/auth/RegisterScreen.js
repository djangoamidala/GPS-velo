import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Alert, ImageBackground, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (err) {
      Alert.alert('Error', err.message);
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
    color:"#0c6157"
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,  
  },
});
