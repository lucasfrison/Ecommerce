import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:5000/orders';

export const createOrder = async (total: number, orderItems: any[]) => {
  try {
    const order = {
      total,
      orderItems
    };

    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });

    if (!response.ok) {
      throw new Error('Erro ao criar pedido');
    }

    // Limpar carrinho local após enviar pedido
    await AsyncStorage.removeItem('cart');

    return await response.json(); // Retorna a resposta do servidor se necessário
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    throw error;
  }
};
