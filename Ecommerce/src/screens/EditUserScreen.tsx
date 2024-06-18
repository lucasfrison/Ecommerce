import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getUserById, updateUser } from '../services/UserService';
import { User } from '../types/User';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/NavigationTypes';

type EditUserScreenRouteProp = RouteProp<RootStackParamList, 'EditUser'>;

const EditUserScreen: React.FC = () => {
  const route = useRoute<EditUserScreenRouteProp>();
  const { userId } = route.params;

  const [user, setUser] = useState<User | null>(null);
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const userData = await getUserById(userId);
      setUser(userData);
      setPhone(userData.phone);
      setPostalCode(userData.postalCode);
      setState(userData.state);
      setCity(userData.city);
      setAddress(userData.address);
      setProfilePicture(userData.profilePicture);
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser(userId, { phone, postalCode, state, city, address, profilePicture });
      alert('Usuário atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  if (!user) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Código Postal"
        value={postalCode}
        onChangeText={setPostalCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Foto de Perfil"
        value={profilePicture}
        onChangeText={setProfilePicture}
      />
      <Button title="Atualizar" onPress={handleUpdateUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default EditUserScreen;
