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
      console.error('Error loading user:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser(userId, { phone, postalCode, state, city, address, profilePicture });
      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit User</Text>
      <TextInput
        style={styles.input}
        placeholder="Telephone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Postal Code"
        value={postalCode}
        onChangeText={setPostalCode}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Profile picture"
        value={profilePicture}
        onChangeText={setProfilePicture}
      />
      <Button title="Update" onPress={handleUpdateUser} />
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
