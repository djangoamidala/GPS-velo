import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Alert, ImageBackground, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

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

  return (
    <ImageBackground source={require('../../assets/welcome-bike.jpg')} style={styles.background}>
      <View style={styles.container}>
        <TextInput 
          style={styles.input}
          placeholder="Email" 
          placeholderTextColor="#000"
          value={email} 
          onChangeText={setEmail} 
        />
        <TextInput 
          style={styles.input}
          placeholder="Password" 
          placeholderTextColor="#000"
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
        />
        <View style={styles.button}>
          <Button title="Login" onPress={handleLogin} color="#0c6157" />
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
