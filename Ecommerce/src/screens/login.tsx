import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button } from "@react-native-material/core";
import { login } from '../services/AuthService';
import { NewAuth } from '../types/Auth';
import { useNavigation } from '@react-navigation/native'; // Importe o hook useNavigation


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation(); // Obtenha o objeto de navegação usando o hook useNavigation

    const handleLogin = async () => {
        const user: NewAuth = {
            email,
            password,
            profileType: 'USER' // Defina conforme necessário, pode ser fixo se todos são usuários comuns
        };

        try {
            const userData = await login(user);
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
