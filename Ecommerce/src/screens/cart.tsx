import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Surface } from "@react-native-material/core";
import { Product } from '../types/Product';
import { AntDesign } from '@expo/vector-icons'; // Importe o ícone desejado
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Importe o tipo StackNavigationProp

type RootStackParamList = {
  Payment: undefined; // Defina as rotas disponíveis
};

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Payment'>;

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const navigation = useNavigation<CartScreenNavigationProp>(); // Use o tipo explícito

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const existingCart = await AsyncStorage.getItem('cart');
        if (existingCart) {
          const cart = JSON.parse(existingCart);
          setCartItems(cart);
        }
      } catch (error) {
        console.error('Erro ao recuperar itens do carrinho: ', error);
      }
    };

    getCartItems();
  }, []);

  const calculateTotal = (items: Product[]) => {
    return items.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const removeItem = async (index: number) => {
    try {
      const updatedCart = [...cartItems];
      updatedCart.splice(index, 1);
      setCartItems(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Erro ao remover item do carrinho: ', error);
    }
  };

  const navigateToPayment = () => {
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.cart}>
      <Surface elevation={6} category="medium" style={styles.cartInner}>
        <FlatList
          data={cartItems}
          renderItem={({ item, index }) => (
            <View style={styles.cartItem}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>R$ <Text style={styles.bold}>{item.price.toFixed(2)}</Text></Text>
              </View>
              <TouchableOpacity onPress={() => removeItem(index)} style={styles.removeButton}>
                <AntDesign name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.cartItemList}
        />
        <View style={styles.cartTotal}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalAmount}>R$ {calculateTotal(cartItems)}</Text>
        </View>
      </Surface>
      <TouchableOpacity style={styles.paymentButton} onPress={navigateToPayment}>
        <Text style={styles.paymentButtonText}>Prosseguir para Pagamento</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cart: {
    flex: 1,
    backgroundColor: '#4E4187',
    alignItems: 'center',
  },
  cartInner: {
    height: Dimensions.get('window').height / 2 + 75,
    marginTop: 60,
    width: Dimensions.get('window').width - 50,
    backgroundColor: '#F3DE2C',
    justifyContent: 'space-between',
  },
  cartItemList: {
    paddingHorizontal: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  removeButton: {
    padding: 10,
  },
  cartTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  totalText: {
    color: '#4E4187',
    fontSize: 20,
  },
  totalAmount: {
    color: '#4E4187',
    fontSize: 24,
    fontWeight: 'bold',
  },
  paymentButton: {
    backgroundColor: '#4E4187',
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: Dimensions.get('window').width - 50,
  },
  paymentButtonText: {
    color: '#F3DE2C',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;
