import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Alert, ImageBackground, Button,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();
  
const handleForgotPassword = async () => {
  try {
    const response = await fetch('http://192.168.1.1:3000/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (response.ok) {
      Alert.alert('Success', 'Password reset email sent');
    } else {
      const data = await response.text(); // Utilisez response.text() à la place de response.json()
      const parsedData = JSON.parse(data); // Parsez les données JSON manuellement
      Alert.alert('Error', parsedData.message);
    }
  } catch (err) {
    Alert.alert('Error', err.message);
  }
};

  
    return (
        <ImageBackground source={require('../../assets/welcome-bike.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
        <TextInput 
          style={styles.input}
          placeholder="Email" 
          placeholderTextColor="#000"
          value={email} 
          onChangeText={setEmail} 
        />
        <View style={styles.button}>
          <Button title="Reset Password" onPress={handleForgotPassword} color="#0c6157" />
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
      color:"#000"
    },
    button: {
      margin: 10,  
    },
  });