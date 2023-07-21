import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Alert, Button, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { token } = route.params;

  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

      const response = await fetch('http://192.168.1.1:3000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, password })
      });

      if (response.ok) {
        Alert.alert('Success', 'Password reset successfully');
        navigation.navigate('Login');
      } else {
        const data = await response.json();
        Alert.alert('Error', data.message);
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.instructions}>Please enter your new password.</Text>
      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#000"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#000"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <View style={styles.button}>
        <Button title="Reset Password" onPress={handleResetPassword} color="#0c6157" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    margin: 10,
  },
});