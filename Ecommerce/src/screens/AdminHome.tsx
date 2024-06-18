import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Orders } from '../types/Orders';
import { getAllOrders } from '../services/OrderService';
import { Surface } from "@react-native-material/core";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Payment: undefined;
  'Products Registration': undefined;
  'UserList': undefined;
};

type AdminHomeNavigationProp = StackNavigationProp<RootStackParamList, 'Products Registration'>;

const AdminHome: React.FC = () => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const navigation = useNavigation<AdminHomeNavigationProp>();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersData = await getAllOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    }
  };

  const calculateTotal = (orders: Orders[]) => {
    return orders.reduce((total, order) => total + order.total, 0).toFixed(2);
  };

  const renderItem = ({ item }: { item: Orders }) => (
    <View style={styles.orderItem}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemClientName}>Cliente ID: {item.customerId}</Text>
        <Text style={styles.itemTotal}>R$ <Text style={styles.bold}>{item.total.toFixed(2)}</Text></Text>
        <Text style={styles.itemDate}>Data: {new Date(item.orderDate).toLocaleDateString()}</Text>
        <Text style={styles.itemStatus}>Status: {item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Surface elevation={6} category="medium" style={styles.orderInner}>
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.orderItemList}
        />
        <View style={styles.orderTotal}>
          <Text style={styles.totalText}>Total em pedidos:</Text>
          <Text style={styles.totalAmount}>R$ {calculateTotal(orders)}</Text>
        </View>
      </Surface>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Products Registration')}>
          <AntDesign name="plus" size={28} color="white" />
          <Text style={styles.buttonText}>Product Registration</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserList')}>
          <AntDesign name="plus" size={28} color="white" />
          <Text style={styles.buttonText}>List of Users</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BDD4E7',
    alignItems: 'center',
    justifyContent: 'space-between', // Para alinhar o conteúdo na vertical
  },
  orderInner: {
    height: '70%',
    marginTop: 20,
    width: '90%',
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
  itemDetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemClientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemTotal: {
    fontSize: 16,
  },
  itemDate: {
    fontSize: 14,
    color: '#555',
  },
  itemStatus: {
    fontSize: 14,
    color: '#555',
  },
  bold: {
    fontWeight: 'bold',
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
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#6200EE',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
  },
});

export default AdminHome;
