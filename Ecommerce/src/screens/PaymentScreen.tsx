import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const PaymentScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes de Pagamento</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Número do Cartão" keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Nome do Titular do Cartão" />
        <TextInput style={styles.input} placeholder="Data de Validade" keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="CVV" keyboardType="numeric" secureTextEntry />
      </View>
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pagar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  payButton: {
    backgroundColor: '#4E4187',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#F3DE2C',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
