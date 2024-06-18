import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Surface } from "@react-native-material/core";
import { Orders } from '../types/orders';
import { AntDesign } from '@expo/vector-icons'; // Importe o ícone desejado
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Importe o tipo StackNavigationProp

type RootStackParamList = {
  Payment: undefined; // Defina as rotas disponíveis
};

type orderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Payment'>;

const AdminHome: React.FC = () => {
  const [clientOrders, setclientOrders] = useState<Orders[]>([]);
  const navigation = useNavigation<orderScreenNavigationProp>(); // Use o tipo explícito

  useEffect(() => {
    const getclientOrders = async () => {
      try {
        const existingorder = await AsyncStorage.getItem('order');
        if (existingorder) {
          const order = JSON.parse(existingorder);
          setclientOrders(order);
        }
      } catch (error) {
        console.error('Erro ao recuperar itens do carrinho: ', error);
      }
    };

    getclientOrders();
  }, []);

  const calculateTotal = (items: Orders[]) => {
    return items.reduce((total, item) => total + item.total, 0).toFixed(2);
  };

  const confirmOrder = async (index: number) => {
    try {
      const updatedorder = [...clientOrders];
      updatedorder.splice(index, 1);
      setclientOrders(updatedorder);
      await AsyncStorage.setItem('order', JSON.stringify(updatedorder));
    } catch (error) {
      console.error('Erro ao remover item: ', error);
    }
  };

  const navigateToPayment = () => {
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.order}>
      <Surface elevation={6} category="medium" style={styles.orderInner}>
        <FlatList
          data={clientOrders}
          renderItem={({ item, index }) => (
            <View style={styles.orderItem}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemClientName}>{item.ClientName}</Text>
                <Text style={styles.itemtotal}>R$ <Text style={styles.bold}>{item.total.toFixed(2)}</Text></Text>
              </View>
              <TouchableOpacity onPress={() => confirmOrder(index)} style={styles.removeButton}>
                <AntDesign ClientName="check" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.orderItemList}
        />
        <View style={styles.orderTotal}>
          <Text style={styles.totalText}>Total em pedidos:</Text>
          <Text style={styles.totalAmount}>R$ {calculateTotal(clientOrders)}</Text>
        </View>
      </Surface>
      <TouchableOpacity style={styles.paymentButton} onPress={navigateToPayment}>
        <Text style={styles.paymentButtonText}>Prosseguir para Pagamento</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  order: {
    flex: 1,
    backgroundColor: '#BDD4E7',
    alignItems: 'center',
  },
  orderInner: {
    height: Dimensions.get('window').height / 2 + 75,
    marginTop: 60,
    width: Dimensions.get('window').width - 50,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  orderItemList: {
    paddingHorizontal: 10,
  },
  orderItem: {
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
  itemClientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemtotal: {
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  removeButton: {
    padding: 10,
  },
  orderTotal: {
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
    color: '#4E4187',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminHome;
