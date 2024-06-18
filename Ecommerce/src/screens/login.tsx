import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button } from '@react-native-material/core';
import { login } from '../services/AuthService';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../components/AuthContext';
import { NewAuth } from '../types/Auth'; 

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { login: loginUser } = useAuth();

  const handleLogin = async () => {
    const user: NewAuth = {
      email,
      password,
      profileType: ''
    };

    try {
      const userData = await login(user);
      loginUser(userData);
      Alert.alert('Login realizado com sucesso', `Bem-vindo, ${userData.email}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao fazer login', 'Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
      <Button
        title="Não tem uma conta? Cadastre-se"
        onPress={() => navigation.navigate('Register')}
        style={styles.registerButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  registerButton: {
    marginTop: 20,
  },
});

export default Login;
