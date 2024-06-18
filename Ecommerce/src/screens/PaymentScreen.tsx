import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { updateOrderStatus } from '../services/OrderService'; // Supondo que haja uma função para atualizar o status do pedido

type RootStackParamList = {
  Payment: { orderId: string };
};

type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;

const PaymentScreen: React.FC = () => {
  const route = useRoute<PaymentScreenRouteProp>();
  const { orderId } = route.params;

  const handlePayment = async () => {
    try {
      await updateOrderStatus(orderId, 'APPROVED');
      // Navegar para a tela de confirmação de pagamento ou exibir uma mensagem de sucesso
      alert('Pagamento realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('Erro ao processar pagamento. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes de Pagamento</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Número do Cartão" keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Nome do Titular do Cartão" />
        <TextInput style={styles.input} placeholder="Data de Validade" keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="CVV" keyboardType="numeric" secureTextEntry />
      </View>
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
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
