import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button } from "@react-native-material/core";
import axios from 'axios';

const LoginScreen: React.FC = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const loginDto = {
            email,
            password,
        };

        try {
            const response = await axios.post('http://seu-backend-url.com/login', loginDto);
            Alert.alert('Login realizado com sucesso', `Bem-vindo, ${response.data.name}`);
            // Redirecionar para outra tela após login bem-sucedido
        } catch (error) {
            Alert.alert('Erro no login');
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

export default LoginScreen;
