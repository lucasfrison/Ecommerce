import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:5000/orders';

export const createOrder = async (customerId: string, total: number, orderItems: any[], status: string = 'PENDING') => {
  try {
    const order = {
      customerId,
      total,
      orderDate: new Date().toISOString(),
      status,
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

    return await response.json(); // Retorna a resposta do servidor com o pedido criado
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar status do pedido');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error);
    throw error;
  }
};
